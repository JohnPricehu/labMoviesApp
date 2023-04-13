import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { UserContext } from "../../contexts/UserContext";
import { checkMovieInFavourites } from "../../supabaseClient";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({
  movie,
  action,
  displayRuntime = false,
  fantasyMovie = false,
}) {
  const { addToFavourites } = useContext(MoviesContext);
  const { user } = useContext(UserContext);
  const [isFavourite, setIsFavourite] = useState(false);

  const movieDetailsUrl = fantasyMovie
  ? `/fantasy/${movie.id}`
  : `/movies/${movie.id}`;

  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      if (user) {
        const isFav = await checkMovieInFavourites(user.email, movie.id);
        setIsFavourite(isFav);
      }
    };

    fetchFavouriteStatus();
  }, [user, movie.id]);

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <Link to={movieDetailsUrl}>
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_url
            ? movie.poster_url
            : movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {displayRuntime ? (
              <Typography variant="h6" component="p">
                <AccessTimeIcon fontSize="small" />
                {"  "} {movie.runtime}{" "}
              </Typography>
            ) : (
              <Typography variant="h6" component="p">
                <StarRateIcon fontSize="small" />
                {"  "} {movie.vote_average}{" "}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}

        <Link to={movieDetailsUrl}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
