import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login-dto';
import { RegistroDto } from './dto/registro-dto';
// import { Usuario } from 'src/usuario/schema/usuario.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDto): Promise<any> {
    const usuario = await this.usuarioService.buscarPorCorreo(user.email);
    if (usuario && usuario.password === user.password) {
      const payload = { sub: usuario };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else throw new UnauthorizedException();
  }
}
