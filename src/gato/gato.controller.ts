import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GatoDto } from './dto/gato-dto/gato-dto';
import { GatoService } from './gato.service';
import { Gato } from './interfaces/gato/gato.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('gato')
export class GatoController {
  constructor(private readonly gatoService: GatoService) {}

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
      if (resultado) return { resultado: resultado };
      throw new Error();
    } catch (Error) {
      return { error: 'Error buscando al gato' };
    }
  }

  //POST /gato
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: 'public/uploads/',
        filename: function (req, file, callback) {
          callback(null, Date.now().toString() + file.originalname);
        },
      }),
    }),
  )
  async crearGato(@Body() body, @UploadedFile() file: Express.Multer.File) {
    if (file) body.imagen = '/' + file.destination + file.filename;
    return await this.gatoService.insertar(body);
  }

  //PUT /gato/:id
  @Post(':id')
  async actualizarGato(
    @Param('id') id: string,
    @Body() actualizarGatoDto: GatoDto,
  ) {
    return await this.gatoService.actualizar(id, actualizarGatoDto);
  }

  //DELETE /gato/:id
  @Post('borrar/:id')
  async borrarGato(@Param('id') id: string) {
    return await this.gatoService.borrar(id);
  }
}
