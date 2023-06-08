import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { EncuestaDto, UsuarioDto } from './dto/usuario-dto';
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

  /**Servicio para actualizar los datos de registro de un usuario */
  async actualizar(
    id: string,
    actualizarUsuarioDto: UsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nombre: actualizarUsuarioDto.nombre,
            roles: actualizarUsuarioDto.roles,
            correo: actualizarUsuarioDto.correo,
            favoritos: actualizarUsuarioDto.favoritos,
            imagenes: actualizarUsuarioDto.imagenes,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  /**Servicio para actualizar la encuesta de un usuario */
  async actualizarEncuesta(
    id: string,
    actualizarUsuarioEncuesta: EncuestaDto,
  ): Promise<Usuario> {
    console.log(id);
    console.log(actualizarUsuarioEncuesta);
    return await this.usuarioModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            nombreCompleto: actualizarUsuarioEncuesta.nombreCompleto,
            direccion: actualizarUsuarioEncuesta.direccion,
            telefono: actualizarUsuarioEncuesta.telefono,
            infoMudanza: actualizarUsuarioEncuesta.infoMudanza,
            infoPorque: actualizarUsuarioEncuesta.infoPorque,
            infoFamilia: actualizarUsuarioEncuesta.infoFamilia,
            infoCostes: actualizarUsuarioEncuesta.infoCostes,
            infoAbandonar: actualizarUsuarioEncuesta.infoAbandonar,
            infoMovimiento: actualizarUsuarioEncuesta.infoMovimiento,
            infoProteccion: actualizarUsuarioEncuesta.infoProteccion,
            infoExperiencia: actualizarUsuarioEncuesta.infoExperiencia,
            infoProblemas: actualizarUsuarioEncuesta.infoProblemas,
            infoMascotasActuales:
              actualizarUsuarioEncuesta.infoMascotasActuales,
            infoMascotasAnteriores:
              actualizarUsuarioEncuesta.infoMascotasAnteriores,
            infoVeterinario: actualizarUsuarioEncuesta.infoVeterinario,
          },
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  /**Servicio para anyadir un gato a favoritos */
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
