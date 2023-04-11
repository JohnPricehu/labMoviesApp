import React, { useState } from "react";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {

  const [favouriteActors, setFavouriteActors] = useState([]);


  const addToFavouriteActors = (actor) => {
    let updatedFavouriteActors = [...favouriteActors];
    if (!favouriteActors.includes(actor.id)) {
      updatedFavouriteActors.push(actor.id);
    }
    setFavouriteActors(updatedFavouriteActors);
  };

  const removeFromFavouriteActors = (actor) => {
    setFavouriteActors(favouriteActors.filter((aId) => aId !== actor.id));
  };



  return (
    <ActorsContext.Provider
      value={{
        favouriteActors,
        addToFavouriteActors,
        removeFromFavouriteActors,
      }}
    >
      {props.children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;
