// components/FantasyMovieListPage.js

import React, { useContext } from "react";
import MovieList from "../components/movieList";
import { FantasyMoviesContext } from "../contexts/FantasyMoviesContext";
import Grid from "@mui/material/Grid";
import { deleteMovie } from "../supabaseClient"; 

const FantasyMovieListPage = () => {
    const { movies, setMovies } = useContext(FantasyMoviesContext);

  const handleDelete = async (movieId) => {
    const { success, error } = await deleteMovie(movieId);

    if (success) {
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } else if (error) {
      console.error("Error deleting movie:", error);
    }
  };
  return (
    <div>
      <h1>Fantasy Movies</h1>
      <Grid container spacing={4}>
        <MovieList
          movies={movies}
          action={() => {}}
          displayRuntime
          fantasyMovie
          onDelete={handleDelete}
        />
      </Grid>
    </div>
  );
};

export default FantasyMovieListPage;
