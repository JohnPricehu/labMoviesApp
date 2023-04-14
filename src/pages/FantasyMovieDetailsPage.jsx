import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getFantasyMovieDetails } from "../supabaseClient";
import FantasyTemplateMoviePage from "../components/templateFantasyMoviePage";
import FantasyMovieDetails from "../components/FantasyMovieDetails";

const FantasyMovieDetailsPage = () => {
  const { id: stringId } = useParams();
  const id = parseInt(stringId);

  // If the parsed ID is not a valid number, display an error message.
  if (isNaN(id)) {
    return <h1>Invalid movie ID</h1>;
  }


  const { data, error, isLoading, isError } = useQuery(
    ["fantasyMovieDetails", id],
    () => getFantasyMovieDetails(["fantasyMovieDetails", id])
  );
  
  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const { movie, actorIds } = data;

  return (
    <>
      {movie ? (
        <>
          <FantasyTemplateMoviePage movie={movie}>
            <FantasyMovieDetails movie={movie} actorIds={actorIds} />
          </FantasyTemplateMoviePage>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default FantasyMovieDetailsPage;
