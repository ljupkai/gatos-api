import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/security/roles.guard';
import { Role } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { EncuestaDto, UsuarioDto } from './dto/usuario-dto';
import { AuthUser } from 'src/auth/decorators/usuario.decorator';
import { Usuario } from './interfaces/usuario.interface';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  //Get /usuario
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get()
  async listarUsuarios() {
    return await this.usuarioService.listar();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUsuario(@AuthUser() usuario: any) {
    usuario.usuario.me = true;
    return usuario.usuario;
  }

  //Get /usuario/buscar/:id
  @UseGuards(JwtAuthGuard)
  @Get('buscar/:id')
  async buscarUsuarioPorId(@AuthUser() usuario: any, @Param('id') id: string) {
    try {
      const resultado = await this.usuarioService.buscarPorId(id);
      resultado.me = id === usuario.usuario._id;
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

  //PUT /usuario/me/encuesta
  @UseGuards(JwtAuthGuard)
  @Post('me/encuesta')
  async actualizarUsuarioEncuesta(
    @AuthUser() user: any,
    @Body() actualizarEncuestaDto: EncuestaDto,
  ) {
    const id = user.usuario._id;
    return await this.usuarioService.actualizarEncuesta(
      id,
      actualizarEncuestaDto,
    );
  }

  //PUT /usuario/:id
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async actualizarUsuario(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: UsuarioDto,
  ) {
    return await this.usuarioService.actualizar(id, actualizarUsuarioDto);
  }

  //DELETE /usuario/borrar/:id
  @Post('borrar/:id')
  async borrarUsuario(@Param('id') id: string) {
    return await this.usuarioService.borrar(id);
  }
}
