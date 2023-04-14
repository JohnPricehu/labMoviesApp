import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import FantasyMovieCastList from "../fantasyMovieCastList";

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
};

const FantasyMovieDetails = ({ movie, actorIds }) => {

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>


      <Paper component="ul" sx={styles.chipSet}>
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip label={`Runtime: ${movie.runtime} min.`} />
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip label={`Production Companies: ${movie.production_companies}`} />
      </Paper>
      <Paper>
        <Typography variant="h6" component="h6" padding={2}>
          Cast
        </Typography>
        <FantasyMovieCastList actorIds={actorIds} />
      </Paper>
    </>
  );
};

export default FantasyMovieDetails;
