import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //Get /usuario
  @Get()
  @UseGuards(JwtAuthGuard)
  async listarUsuarios() {
    return await this.usuarioService.listar();
  }

  //Get /usuario/buscar/:id
  @Get('buscar/:id')
  async buscarUsuarioPorId(@Param('id') id: string) {
    try {
      const resultado = await this.usuarioService.buscarPorId(id);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al usuario' };
    }
  }

  //Get /usuario/email/:correo
  @Get('email/:correo')
  async buscarUsuarioPorCorreo(@Param('correo') correo: string) {
    try {
      const resultado = await this.usuarioService.buscarPorCorreo(correo);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al usuario' };
    }
  }

  //Get /usuario/nombre/:nombre
  @Get('nombre/:nombre')
  async buscarUsuarioPorNombre(@Param('nombre') nombre: string) {
    try {
      const resultado = await this.usuarioService.buscarPorNombre(nombre);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al usuario' };
    }
  }

  //Post /usuario
  @Post()
  async crearUsuario(@Body() body) {
    return await this.usuarioService.insertar(body);
  }
}
