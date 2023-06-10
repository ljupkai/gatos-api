import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { GatoDto } from './dto/gato-dto/gato-dto';
import { GatoService } from './gato.service';
import { Gato } from './interfaces/gato/gato.interface';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/security/roles.decorator';
import { Role } from 'src/security/roles.enum';
import { RolesGuard } from 'src/security/roles.guard';
import { UsuarioService } from 'src/usuario/usuario.service';
// import { ImageService } from 'src/commons/image/image.service';

@Controller('gato')
export class GatoController {
  constructor(
    private readonly gatoService: GatoService,
    private readonly usuarioService: UsuarioService, // private readonly imageService: ImageService,
  ) {}

  //Get /gato
  @Get()
  async listarGatos() {
    return await this.gatoService.listar();
  }

  //Get /gato
  @Get('/userdata')
  async listarGatosConUserdata() {
    const resultado = await this.gatoService.listarGatosConDatosUsuario();
    return { resultado: resultado };
  }

  //GET /gato/:id
  @Get(':id')
  async buscarGatoPorId(@Param('id') id: string) {
    try {
      const resultado = await this.gatoService.buscarPorId(id);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      console.log(Error);
      return { error: 'Error buscando al gato' };
    }
  }

  //PUT /gato/:id
  @Post(':id')
  async actualizarGato(
    @Param('id') id: string,
    @Body() actualizarGatoDto: GatoDto,
  ) {
    return await this.gatoService.actualizar(id, actualizarGatoDto);
  }

  //DELETE /gato/borrar/:id
  @Post('borrar/:id')
  async borrarGato(@Param('id') id: string) {
    return await this.gatoService.borrar(id);
  }

  // Cambiar el status de la adopción, si es reservado, cambiar el status del gato en reservado
  @Post(':idGato/adopciones/:adopcionId/:status')
  async cambiarStatus(
    @Param('adopcionId') id: string,
    @Param('status') status: string,
    @Param('idGato') idGato: string,
  ) {
    let resultado = await this.gatoService.updateAdoptionStatus(id, status);
    if (status === 'reservado') {
      resultado = await this.gatoService.marcarReservado(idGato);
    } else {
      resultado = await this.gatoService.unmarkGatoAsReserved(idGato);
    }
    return { resultado: resultado };
  }

  //Solicitar adopción
  @Post('adopcion/:idGato')
  async nuevaAdopcion(@Body() body, @Param('idGato') idGato: string) {
    try {
      const resultado = await this.gatoService.solicitarAdopcion(idGato, body);
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error iniciando la adopción' };
    }
  }

  //Get adopciones por usuario
  @Get(':idUser/adopcion')
  async getAdopcionesPorUsuario(@Param('idUser') idUser: string) {
    try {
      const resultado = await this.gatoService.getAdopcionesPorUsuario(idUser);
      if (resultado) {
        return { resultado: resultado };
      }
    } catch (error) {
      console.log(error, 'Error en get adopciones por usuario');
    }
  }

  //POST gato/idGato/idUser/like
  @Post(':idGato/:idUser/like')
  async marcarLike(
    @Param('idUser') idUser: string,
    @Param('idGato') idGato: string,
  ) {
    try {
      const usuario = await this.usuarioService.buscarPorId(idUser);
      if (!usuario) {
        throw new Error('Usuario no existe');
      }
      if (usuario.favoritos && usuario.favoritos.includes(idGato)) {
        throw new Error('El gato ya existe en los favoritos');
      }
      const resultado = await this.usuarioService.likeGato(idUser, idGato);
      await this.gatoService.incrementarLikes(idGato);
      await this.gatoService.anyadirLikedBy(idGato, idUser);
      return { resultado: resultado };
    } catch (error) {
      console.log(error, 'Error marcando like');
    }
  }

  //POST /gato
  @Post()
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Admin)
  @UseInterceptors(
    FilesInterceptor('imagen[]', 10, {
      storage: diskStorage({
        destination: 'public/uploads/',
        filename: function (_req, file, callback) {
          callback(null, Date.now().toString() + file.originalname);
        },
      }),
    }),
  )
  async crearGato(
    @Body() body,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files) {
      const fileNames = files.map(
        (file) => '/' + file.destination + file.filename,
      );
      body.imagen = fileNames;
    }
    return await this.gatoService.insertar(body);
  }
}
