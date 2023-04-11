import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

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

const ActorDetails = ({ actor }) => {
  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Born" sx={styles.chipLabel} color="primary" />
        </li>
        <li>
          <Chip label={actor.birthday} />
        </li>
        <li>
          <Chip label={actor.place_of_birth} />
        </li>
      </Paper>
    </>
  );
};

export default ActorDetails;
