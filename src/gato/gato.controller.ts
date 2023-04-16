import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { GatoDto } from './dto/gato-dto/gato-dto';
import { GatoService } from './gato.service';
import { Gato } from './interfaces/gato/gato.interface';

@Controller('gato')
export class GatoController {
  constructor(private readonly gatoService: GatoService) {}

  //Get /gato
  @Get()
  async listar() {
    return await this.gatoService.listar();
  }

  //GET /gato/buscar/:id
  @Get()
  async buscarPorId(@Param('id') id: string) {
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
  async crear(@Body() crearGatoDto: GatoDto) {
    return await this.gatoService.insertar(crearGatoDto);
  }

  //PUT /gato/:id
  @Post(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarGatoDto: GatoDto,
  ) {
    return await this.gatoService.actualizar(id, actualizarGatoDto);
  }

  //DELETE /gato/:id
  @Post('borrar/:id')
  async borrar(@Param('id') id: string) {
    return await this.gatoService.borrar(id);
  }
}
