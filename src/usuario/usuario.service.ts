import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario-dto';
import { Model } from 'mongoose';
import { Gato } from 'src/gato/interfaces/gato/gato.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
  ) {}

  /**Servicio para listar todos los usuarios */
  async listar(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  /**Servicio para buscar un usuario por id */
  async buscarPorId(id: string): Promise<Usuario> {
    return await this.usuarioModel.findById(id).exec();
  }

  /**Servicio para bucsar un usuario por correo */
  async buscarPorCorreo(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ correo: email }).exec();
  }

  /**Servicio para buscar un usuario por nombre */
  async buscarPorNombre(name: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ nombre: name }).exec();
  }

  /**Servicio para insertar un nuevo usuario */
  async insertar(crearUsuarioDto: UsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new this.usuarioModel(crearUsuarioDto);
    return await nuevoUsuario.save();
  }

  /**Servicio para borrar un usuario */
  async borrar(id: string): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndRemove(id).exec();
  }

  /**Servicio para atualizar el rol de un usuario */
  async actualizar(
    id: string,
    actualizarRolUsuarioDto: UsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            roles: actualizarRolUsuarioDto.roles,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  /**Servicio para anyadir un gato en favoritos */
  async likeGato(id: string, gatoId: string): Promise<Usuario> {
    return await this.usuarioModel
      .findByIdAndUpdate(id, { $addToSet: { favoritos: gatoId } })
      .exec();
  }

  /**Servicio para recuperar los favoritos */
  async listarUsuarioFavs(id: string): Promise<string[]> {
    const usuario = await this.usuarioModel
      .findById(id)
      .populate('favoritos')
      .exec();
    return usuario.favoritos;
  }
}
