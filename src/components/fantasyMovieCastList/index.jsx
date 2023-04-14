import React from "react";
import { useQuery } from "react-query";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Spinner from "../spinner";
import img from "../../images/film-poster-placeholder.png";
import { getActor } from "../../api/tmdb-api";
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
    height: "150px",
  },
};


const fetchActorDetails = async (actorIds) => {
  const actorDetails = await Promise.all(
  actorIds.map(async (actorId) => {
  const data = await getActor({queryKey: ["movie cast", {id: actorId}]});
  return data;
  })
  );
  return actorDetails;
  };


const FantasyMovieCastList = ({ actorIds }) => {
  const { isLoading, isError, error, data } = useQuery(
    ["movie cast", actorIds],
    () => fetchActorDetails(actorIds)
  );
  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div style={styles.container}>
      {data.map((cast) => (
        <div key={cast.id} style={styles.card}>
          <Card>
            <Link to={`/actors/${cast.id}`}>
              <CardMedia
                sx={styles.media}
                image={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : img
                }
              />
            </Link>
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography variant="subtitle2" component="p">
                    {cast.name}
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

export default FantasyMovieCastList;
