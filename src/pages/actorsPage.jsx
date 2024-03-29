import React from "react";
import PageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import ActorFilterUI, {
  nameFilter,
} from "../components/actorFilterUI";
import AddToFavouriteActorsIcon from "../components/cardIcons/addToFavouriteActors";
import Pagination from "../components/pagination";

const nameFiltering = {
  name: "name",
  value: "",
  condition: nameFilter,
};

const ActorsPage = (props) => {
  const [page, setPage] = React.useState(1)
  const { isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['actors', page],
    queryFn: () => getActors(page),
    keepPreviousData: true
  });
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [nameFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type, value) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = [changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Popular Actors"
        actors={displayedActors}
        action={(actor) => {
          return <AddToFavouriteActorsIcon actor={actor} />;
        }}
      />
      <ActorFilterUI
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
      />
      <Pagination data={data} page={page} setPage={setPage}/>
    </>
  );
};

export default ActorsPage;
