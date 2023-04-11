import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { getMovieCast, getSimilarMovies } from "../../api/tmdb-api";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews';
import { Link } from "react-router-dom";
import MovieCastList from "../movieCast";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: { 
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const MovieDetails = ( {movie}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    getMovieCast(movie.id)
      .then((data) => {
        setCast(data.cast);
      })
      .catch((error) => {
        console.error("Error fetching movie cast:", error);
      });

    getSimilarMovies(movie.id)
      .then((data) => {
        setSimilarMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching similar movies:", error);
      });
  }, [movie.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper>
        <Typography variant="h6" component="h6" padding={2}>
          Cast
        </Typography>
        <MovieCastList movie={movie} />
      </Paper>
      <div>
        <Typography variant="h5" component="h3">
          Similar Movies
        </Typography>
        <div>
          {similarMovies.map((similarMovie) => (
            <Link key={similarMovie.id} to={`/movie/${similarMovie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w185${similarMovie.poster_path}`}
                alt={similarMovie.title}
              />
              <Typography>{similarMovie.title}</Typography>
            </Link>
          ))}
        </div>
      </div>
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default  MovieDetails ;
