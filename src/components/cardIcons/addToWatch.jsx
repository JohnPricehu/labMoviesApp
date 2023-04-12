import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { addMovieToMustWatches } from "../../supabaseClient";

const AddToPlaylistAddIcon = ({ movie }) => {
  const { user, mustWatchMovies, setMustWatchMovies } = useContext(UserContext);

  const onUserSelect = async (e) => {
    e.preventDefault();
    setMustWatchMovies([...mustWatchMovies, movie]);

    // Save the updated favorite movies list to Supabase
    try {
      const { data, error } = await addMovieToMustWatches(user.email, movie.id);
      if (error) {
        throw error;
      }
      console.log("Movie added to favourites:", data);
    } catch (error) {
      console.error("Error saving favorite movie to Supabase:", error);
    }
  };

  return (
    <IconButton aria-label="add to must watches" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistAddIcon;