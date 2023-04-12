import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../contexts/UserContext";
import { removeActorFromFavourites } from "../../supabaseClient";

const RemoveFromFavouriteActorsIcon = ({ actor }) => {
  const { user, favouriteActors, setFavouriteActors } = useContext(UserContext);

  const onUserRequest = async (e) => {
    e.preventDefault();

    const { data, error } = await removeActorFromFavourites(user.email, actor.id);
    if (error) {
      console.error("Error removing actor from favourites:", error);
    } else {
      setFavouriteActors(favouriteActors.filter((a) => a.id !== actor.id));
      window.location.reload();
    }
  };

  return (
    <IconButton aria-label="remove from favorite actors" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouriteActorsIcon;
