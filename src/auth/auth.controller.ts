import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   Post /auth/login
  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true })) usuarioDto: LoginDto,
  ) {
    return await this.authService.login(usuarioDto);
  }
}
