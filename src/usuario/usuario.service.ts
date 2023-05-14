import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './interfaces/usuario.interface';
import { UsuarioDto } from './dto/usuario-dto';
import { Model } from 'mongoose';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('Usuario') private readonly usuarioModel: Model<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return await this.usuarioModel.find().exec();
  }

  async buscarPorId(id: string): Promise<Usuario> {
    return await this.usuarioModel.findById(id).exec();
  }

  async buscarPorCorreo(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ correo: email }).exec();
  }

  async buscarPorNombre(name: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ nombre: name }).exec();
  }

  async insertar(crearUsuarioDto: UsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new this.usuarioModel(crearUsuarioDto);
    return await nuevoUsuario.save();
  }

  async borrar(id: string): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndRemove(id).exec();
  }

  //TODO actualizarUsuario
}
