import React from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getFantasyMovie, getFantasyMovieActorIds } from "../supabaseClient";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const FantasyMovieDetailsPage = () => {
const { id } = useParams();
const movieId = parseInt(id, 10);

  const { data: actorIds, isSuccess: actorIdsSuccess } = useQuery(
    ["actorIds", { movieId }],
    getFantasyMovieActorIds
  );


  const { data: movie, error, isLoading, isError } = useQuery(
    ["fantasyMovie", { id: id }],
    getFantasyMovie
  );


  const actorDetailsQueries = actorIdsSuccess
    ? actorIds.map((actorIdObj) =>
        useQuery(["actor", { id: actorIdObj.tmdb_actor_id }], getActor)
      )
    : [];

  const actorDetails = actorDetailsQueries.map((query) => query.data);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <FantasyMovieDetails movie={movie} actors={actorDetails} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default FantasyMovieDetailsPage;
