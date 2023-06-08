import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegistroDto } from './dto/registro-dto';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';
import { UsuarioDto } from 'src/usuario/dto/usuario-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Post /auth/registro
  @Post('registro')
  async regstro(@Body() usuarioDto: RegistroDto): Promise<Usuario> {
    usuarioDto.roles = ['user'];
    return this.authService.registro(usuarioDto);
  }

  //   Post /auth/login
  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true })) usuarioDto: LoginDto,
  ) {
    return await this.authService.login(usuarioDto);
  }

  @Get('validate')
  @HttpCode(204)
  validate(): void {
    // Valida el token
  }
}
