import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouriteActorsIcon = ({ actor }) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavouriteActors(actor);
  };
  
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouriteActorsIcon;