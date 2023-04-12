import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../contexts/UserContext";
import { removeMovieFromMustWatches } from "../../supabaseClient";

const RemoveFromMustWatchesIcon = ({ movie }) => {
  const { user, mustWatchMovies, setMustWatchMovies } = useContext(UserContext);

  const onUserRequest = async (e) => {
    e.preventDefault();

    const { data, error } = await removeMovieFromMustWatches(user.email, movie.id);
    if (error) {
      console.error("Error removing movie from must watches:", error);
    } else {
      setMustWatchMovies(mustWatchMovies.filter((m) => m.id !== movie.id));
      window.location.reload();
    }
  };

  return (
    <IconButton aria-label="remove from must watches" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchesIcon;
