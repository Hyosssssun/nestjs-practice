import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `this will return one movie with the id: ${id}`;
  }

  @Post()
  createMovie() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: string) {
    return `this will delete a movie with the id: ${movieId}`;
  }

  @Put('/:id')
  patchMove(@Param('id') movieId: string) {
    return `this will update the movie with the ${movieId}`;
  }
}
