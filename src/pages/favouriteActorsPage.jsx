import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateActorListPage";
import { ActorsContext } from "../contexts/actorsContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, { nameFilter } from "../components/actorFilterUI";
import RemoveFromFavouriteActors from "../components/cardIcons/removeFromFavouriteActors";
import { UserContext } from "../contexts/UserContext";
import { getFavouriteActors } from "../supabaseClient";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const FavouriteActorsPage = () => {
  const { user, setFavouriteActors } = useContext(UserContext);
  const [actorIds, setActorIds] = useState([]);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
  );

  useEffect(() => {
    const fetchFavouriteActors = async () => {
      const { data, error } = await getFavouriteActors(user.email);
      if (error) {
        console.error("Error fetching favourite actors:", error);
      } else {
        setActorIds(data.map((entry) => entry.actor_id));
      }
    };

    if (user) {
      fetchFavouriteActors();
    }
  }, [user, setFavouriteActors]);

  // Create an array of queries and run them in parallel.
  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => {
      return {
        queryKey: ["actor", { id: actorId }],
        queryFn: getActor,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteActorQueries.find((a) => a.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteActorQueries.map((q) => q.data);
  const displayActors = allFavourites
    ? filterFunction(allFavourites)
    : [];

  // const toDo = () => true;

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Actors"
        actors={displayActors}
        action={(actor) => {
          return (
            <>
              <RemoveFromFavouriteActors actor={actor} />
            </>
          );
        }}
      />

      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
      />
    </>
  );
};

export default FavouriteActorsPage;
