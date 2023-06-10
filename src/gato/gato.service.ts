import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Adopcion, Gato } from './interfaces/gato/gato.interface';
import { GatoDto } from './dto/gato-dto/gato-dto';
import { AdopcionDto } from './dto/gato-dto/adopcion-dto';

@Injectable()
export class GatoService {
  constructor(@InjectModel('Gato') private readonly gatoModel: Model<Gato>) {}

  gatos: Gato[] = [];

  /**Servicio para listar gatos */
  async listar(): Promise<Gato[]> {
    return await this.gatoModel
      .find()
      .populate('Adopciones.usuario', 'nombre')
      .exec();
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

  /**Servicio para extraer adopciones solicitadas por un usuario */
  async getAdopcionesPorUsuario(idUser: string): Promise<Gato[]> {
    try {
      const gatos = await this.gatoModel
        .find({ Adopciones: { $elemMatch: { usuario: idUser } } })
        .populate('Adopciones.usuario', 'nombre')
        .exec();
      return gatos;
    } catch (error) {
      throw new Error('Ha habido un error buscando adopciones por usuario');
    }
  }

  /**Servicio para incrementar contador de likes */
  async incrementarLikes(id: string): Promise<Gato> {
    try {
      return await this.gatoModel.findByIdAndUpdate(id, {
        $inc: {
          numLikes: 1,
        },
      });
    } catch (error) {
      console.log(error, 'Error incrementando likes');
    }
  }

  /**Servicio para añadir usuarios que han marcado el gato como favorito */
  async anyadirLikedBy(id: string, usuarioId: string): Promise<Gato> {
    return await this.gatoModel
      .findByIdAndUpdate(id, { $addToSet: { likedBy: usuarioId } })
      .exec();
  }

  /**Servicio para listar gatos juntos con las encuestas de los usuarios */
  async listarGatosConDatosUsuario(): Promise<Gato[]> {
    return await this.gatoModel
      .find()
      .populate(
        'Adopciones.usuario',
        'nombre nombreCompleto direccion telefono infoMudanza infoPorque infoFamilia infoCostes infoAbandonar infoMovimiento infoProteccion infoExperiencia infoProblemas infoMascotasActuales infoMascotasAnteriores infoVeterinario',
      )
      .exec();
  }

  /**Servicio para cambiar el status de una adopción */
  async updateAdoptionStatus(adopcionId: string, status: string): Promise<any> {
    return await this.gatoModel
      .findOneAndUpdate(
        { 'Adopciones._id': adopcionId },
        { $set: { 'Adopciones.$.status': status } },
        { new: true },
      )
      .exec();
  }

  /**Servicio que marca un gato como reservado */
  async marcarReservado(id: string): Promise<Gato> {
    return await this.gatoModel.findByIdAndUpdate(
      id,
      { reservado: true },
      { new: true },
    );
  }

  /**Servicio que quita la marca de reservado */
  async unmarkGatoAsReserved(gatoId: string): Promise<Gato> {
    return await this.gatoModel.findByIdAndUpdate(
      gatoId,
      { reservado: false },
      { new: true },
    );
  }
}
