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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
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
  getOne(@Param('id') movieId: number) {
    return this.movieService.getOne(movieId);
  }

  @Post()
  createOne(@Body() movieData: CreateMovieDto) {
    return this.movieService.createOne(movieData);
  }

  @Patch('/:id')
  updateOne(@Param('id') movieId: number, @Body() updatedData: UpdateMovieDto) {
    return this.movieService.updateOne(movieId, updatedData);
  }

  @Delete('/:id')
  deleteOne(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }
}
