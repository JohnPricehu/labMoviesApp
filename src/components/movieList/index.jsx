import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action, displayRuntime, fantasyMovie , onDelete}) => {
  if (!movies) {
    return <h1>No movies found.</h1>;
  }

  const movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie
        key={m.id}
        movie={m}
        action={action}
        displayRuntime={displayRuntime}
        fantasyMovie={fantasyMovie}
        onDelete={onDelete}
      />
    </Grid>
  ));

  return <>{movieCards}</>;
};

export default MovieList;
