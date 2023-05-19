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
// import { ImageService } from 'src/commons/image/image.service';

@Controller('gato')
export class GatoController {
  constructor(
    private readonly gatoService: GatoService, // private readonly imageService: ImageService,
  ) {}

  //Get /gato
  @Get()
  async listarGatos() {
    return await this.gatoService.listar();
  }

  //GET /gato/buscar/:id
  @Get(':id')
  async buscarGatoPorId(@Param('id') id: string) {
    try {
      const resultado = await this.gatoService.buscarPorId(id);
      console.log(resultado);
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

  //POST /gato
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FilesInterceptor('imagenes[]', 10, {
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

  //Añadir adopción
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
}
