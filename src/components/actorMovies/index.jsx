import React from "react";
import { useQuery } from "react-query";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";
import { getActorMovies } from "../../api/tmdb-api";
import { Link } from "react-router-dom";

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

const ActorMoviesList = ({ actor }) => {
  const { isLoading, isError, error, data } = useQuery(
    ["movie credit", actor],
    () => getActorMovies(actor.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={styles.container}>
      {data.map((m) => (
        <div key={m.id} style={styles.card}>
          <Card>
            <Link to={`/movies/${m.id}`}>
              <CardMedia
                sx={styles.media}
                image={
                 m.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${m.poster_path}`
                    : img
                }
              />
            </Link>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle2" component="p">
                    {m.title}
                  </Typography>
                  <Typography
                    noWrap={true}
                    variant="caption"
                    component="p"
                    fontStyle="italic"
                  >
                    {m.character}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ActorMoviesList;