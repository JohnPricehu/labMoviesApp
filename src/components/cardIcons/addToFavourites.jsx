import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addMovieToFavourites } from "../../supabaseClient";

const AddToFavouritesIcon = ({ movie }) => {
  const { user, favouriteMovies, setFavouriteMovies } = useContext(UserContext);

  const onUserSelect = async (e) => {
    e.preventDefault();
    setFavouriteMovies([...favouriteMovies, movie]);

    // Save the updated favorite movies list to Supabase
    try {
      const { data, error } = await addMovieToFavourites(user.email, movie.id);
      if (error) {
        throw error;
      }
      console.log("Movie added to favourites:", data);
    } catch (error) {
      console.error("Error saving favorite movie to Supabase:", error);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
