import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('search')
  search(@Query('year') searchingYear: number) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return this.movieService.getOne(movieId);
  }

  @Post()
  createOne(@Body() movieData) {
    return this.movieService.createOne(movieData);
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: string) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string, @Body() updateData) {
    return this.movieService.updateOne(movieId, updateData);
  }
}
