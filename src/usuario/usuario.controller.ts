import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/security/roles.guard';
import { Role } from 'src/security/roles.enum';
import { Roles } from 'src/security/roles.decorator';
import { UsuarioDto } from './dto/usuario-dto';

@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  //Get /usuario
  @Get()
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

  //PUT /usuario/:id
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
