// components/FantasyMovieListPage.js

import React, { useContext } from "react";
import MovieList from "../components/movieList";
import { FantasyMoviesContext } from "../contexts/FantasyMoviesContext";
import Grid from "@mui/material/Grid";

const FantasyMovieListPage = () => {
  const { movies } = useContext(FantasyMoviesContext);

  return (
    <div>
      <h1>Fantasy Movies</h1>
      <Grid container spacing={4}>
        <MovieList
          movies={movies}
          action={() => {}}
          displayRuntime
          fantasyMovie
        />
      </Grid>
    </div>
  );
};

export default FantasyMovieListPage;
