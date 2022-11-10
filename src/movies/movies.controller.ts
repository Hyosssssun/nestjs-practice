import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UsePipes,
  PipeTransform,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

class MoviePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value.title !== 'string') {
      throw new BadRequestException();
    }
    if (typeof value.year !== 'number') {
      throw new BadRequestException();
    }
    if (!Array.isArray(value.genres)) {
      throw new BadRequestException();
    }
    if (value.genres.some((genre) => typeof genre !== 'string')) {
      throw new BadRequestException();
    }
    return value;
  }
}

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
  getOne(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.getOne(movieId);
  }

  @Post()
  @UsePipes(new MoviePipe())
  createOne(@Body() movieData: CreateMovieDto) {
    return this.movieService.createOne(movieData);
  }

  @Patch('/:id')
  updateOne(
    @Param('id', ParseIntPipe) movieId: number,
    @Body() updatedData: UpdateMovieDto,
  ) {
    return this.movieService.updateOne(movieId, updatedData);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) movieId: number) {
    return this.movieService.deleteOne(movieId);
  }
}
