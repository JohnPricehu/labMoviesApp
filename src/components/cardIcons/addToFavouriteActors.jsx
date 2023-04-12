import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addActorToFavourites } from "../../supabaseClient";

const AddToFavouriteActorsIcon = ({ actor }) => {
  const { user, favouriteActors, setFavouriteActors } = useContext(UserContext);

  const onUserSelect = async (e) => {
    e.preventDefault();
    setFavouriteActors([...favouriteActors, actor]);

    // Save the updated favorite actors list to Supabase
    try {
      const { data, error } = await addActorToFavourites(user.email, actor.id);
      if (error) {
        throw error;
      }
      console.log("Actor added to favourites:", data);
    } catch (error) {
      console.error("Error saving favorite actor to Supabase:", error);
    }
  };

  return (
    <IconButton aria-label="add to favorite actors" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouriteActorsIcon;
