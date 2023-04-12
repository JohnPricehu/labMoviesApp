import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../contexts/UserContext";
import { removeMovieFromFavourites } from "../../supabaseClient";

const RemoveFromFavouritesIcon = ({ movie }) => {
  const { user, favouriteMovies, setFavouriteMovies } = useContext(UserContext);

  const onUserRequest = async (e) => {
    e.preventDefault();

    const { data, error } = await removeMovieFromFavourites(user.email, movie.id);
    if (error) {
      console.error("Error removing movie from favourites:", error);
    } else {
      setFavouriteMovies(favouriteMovies.filter((m) => m.id !== movie.id));
      window.location.reload();
    }
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIcon;
