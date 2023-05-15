import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegistroDto } from './dto/registro-dto';
import { Usuario } from 'src/usuario/interfaces/usuario.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Post /auth/registro
  @Post('registro')
  async regstro(@Body() usuarioDto: RegistroDto): Promise<Usuario> {
    return this.authService.registro(usuarioDto);
  }

  //   Post /auth/login
  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true })) usuarioDto: LoginDto,
  ) {
    return await this.authService.login(usuarioDto);
  }
}
