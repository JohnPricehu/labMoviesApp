import React from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getSimilarMovies } from "../../api/tmdb-api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";

const styles = {
    container: {
        overflowX: "scroll",
        display: "flex",
        flexDirection: "row",
      },
      card: {
        marginLeft: "20px",
        minWidth: "170px",
      },
      media: {
        height: "300px",
        weight: "200px",
      },
};

const SimilarMovies = ({ movie }) => {
  const { isLoading, isError, error, data } = useQuery(
    ["similar movies", movie],
    () => getSimilarMovies(movie.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={styles.container}>
        {data.length ? (
            data.map((s) => (
            <div key={s.id} style={styles.card}>
                <Card>
                <Link to={`/movies/${s.id}`}>
                    <CardMedia
                        sx={styles.media}
                        image={
                            s.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${s.poster_path}`
                            : img
                        }
                    />
                </Link>
                <CardContent>
                    <Grid container>
                        <Grid item>
                            <Typography variant="subtitle2" component="p">
                            {s.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                </Card>
            </div>
            ))
        ) : (
            <Typography variant="subtitle2" padding={2}>
              Sorry, no similar movies for now !
            </Typography>
          )}
        </div>    
  );
};

export default SimilarMovies;