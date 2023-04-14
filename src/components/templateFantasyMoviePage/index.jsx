import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: "100vh",
  },
};

const FantasyTemplateMoviePage = ({ movie, children }) => {
  if (!movie) {
    return <Spinner />;
  }

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={styles.gridListRoot}>
            <img
              src={movie.poster_url}
              alt={movie.title}
              style={{ width: "100%" }}
            />
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default FantasyTemplateMoviePage;
