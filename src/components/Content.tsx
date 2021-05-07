import { useEffect, useState } from 'react';

import { MovieCard } from '../components/MovieCard';
import { Header } from '../components/Header';

import { api } from '../services/api';
import {AxiosResponse} from 'axios';

import '../styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreId: number;
}

interface TMovieList {
   data: MovieProps[]
}

export function Content({selectedGenreId}: ContentProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response: AxiosResponse<MovieProps[]>) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then((response: AxiosResponse<GenreResponseProps>) => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return(
      <div className="container">
        <Header title={selectedGenre.title} />

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}