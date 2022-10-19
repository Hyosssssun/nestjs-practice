import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with Id ${movieId} not found.`);
    }
    return movie;
  }

  createOne(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return this.movies[this.movies.length - 1];
  }

  updateOne(movieId: number, updatedData: UpdateMovieDto) {
    const movie = this.getOne(movieId);
    this.deleteOne(movieId);
    this.movies.push({ ...movie, ...updatedData });
    return this.movies.filter((movie) => movie.id === movieId);
  }

  deleteOne(movieId: number) {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with Id ${movieId} not found.`);
    }
    const position = this.movies.findIndex((movie) => movie.id === movieId);
    return this.movies.splice(position, 1);
  }
}
