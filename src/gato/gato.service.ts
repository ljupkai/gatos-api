import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gato } from './interfaces/gato/gato.interface';
import { GatoDto } from './dto/gato-dto/gato-dto';
import { AdopcionDto } from './dto/gato-dto/adopcion-dto';

@Injectable()
export class GatoService {
  constructor(@InjectModel('Gato') private readonly gatoModel: Model<Gato>) {}

  gatos: Gato[] = [];

  /**Servicio para listar gatos */
  async listar(): Promise<Gato[]> {
    return await this.gatoModel.find().exec();
  }

  /**Servicio para buscar un gato por id */
  async buscarPorId(id: string): Promise<Gato> {
    return await this.gatoModel.findById(id).exec();
  }

  /**Servicio para buscar un gato por id */
  async insertar(crearGatoDto: GatoDto): Promise<Gato> {
    const nuevoGato = new this.gatoModel(crearGatoDto);
    return await nuevoGato.save();
  }

  /**Servicio para borrar un gato */
  async borrar(id: string): Promise<Gato> {
    return await this.gatoModel.findByIdAndRemove(id).exec();
  }

  /**Servicio para actualizar un gato */
  async actualizar(id: string, actualizarGatoDto: GatoDto): Promise<Gato> {
    return await this.gatoModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nombre: actualizarGatoDto.nombre,
            edad: actualizarGatoDto.edad,
            castrado: actualizarGatoDto.castrado,
            color: actualizarGatoDto.color,
            descripcion: actualizarGatoDto.descripcion,
            reservado: actualizarGatoDto.reservado,
            personalidad: actualizarGatoDto.personalidad,
            adoptado: actualizarGatoDto.adoptado,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  /**Servicio para solicitar adopción de un gato por un usuario */
  async solicitarAdopcion(
    idGato: string,
    adopcionDto: AdopcionDto,
  ): Promise<Gato> {
    return await this.gatoModel
      .findByIdAndUpdate(
        idGato,
        {
          $push: {
            Adopciones: {
              usuario: adopcionDto.usuario,
              status: adopcionDto.status,
              date: adopcionDto.date,
            },
          },
        },
        { new: true, runValidators: true },
      )
      .populate('Adopciones')
      .exec();
  }

  /**Servicio para incrementar contador de likes */
  async incrementarLikes(id: string): Promise<Gato> {
    try{
    return await this.gatoModel.findByIdAndUpdate(id, {
      $inc: {
        numLikes: 1,
      },
    });
  }catch (error) {
    console.log(error, 'Error incrementando likes')
  }}
}
