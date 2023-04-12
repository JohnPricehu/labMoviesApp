import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from "../../contexts/UserContext";
import { checkMovieInMustWatches } from "../../supabaseClient";



const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function UpcomingMovieCard({ movie, action }) {
  const { toWatches, addToWatches } = useContext(MoviesContext);
  const { user } = useContext(UserContext);
  const [isInMustWatches, setIsInMustWatches] = useState(false);

  useEffect(() => {
    const checkMustWatches = async () => {
      if (user) {
        const isInList = await checkMovieInMustWatches(user.email, movie.id);
        setIsInMustWatches(isInList);
      }
    };

    checkMustWatches();
  }, [user, movie.id]);



  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          isInMustWatches ? (
            <Avatar sx={styles.avatar}>
              <PlaylistAddCheckIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />


      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
      {action(movie)}


        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
