import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login-dto';
import { RegistroDto } from './dto/registro-dto';
// import { Usuario } from 'src/usuario/schema/usuario.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async registro(user: RegistroDto): Promise<any> {
    const usuarios = await this.usuarioService.buscarPorCorreo(user.correo);
    if (usuarios) {
      throw new BadRequestException('Existe un usuario con este correo');
    }
    const hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;

    const usuario = await this.usuarioService.insertar(user);
    return usuario;
  }

  async login(user: LoginDto): Promise<any> {
    const usuario = await this.usuarioService.buscarPorCorreo(user.email);
    if (usuario) {
      const passIsValid = await bcrypt.compare(user.password, usuario.password);
      if (passIsValid) {
        const payload = { sub: usuario };
        const roles = usuario.roles;
        return {
          access_token: this.jwtService.sign(payload),
          roles: roles,
        };
      }
    } else throw new UnauthorizedException();
  }
}
