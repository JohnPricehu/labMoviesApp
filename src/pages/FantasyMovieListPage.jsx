import React, { useContext } from "react";
import MovieList from "../components/movieList";
import { FantasyMoviesContext } from "../contexts/FantasyMoviesContext";
import Grid from "@mui/material/Grid";
import { deleteMovie } from "../supabaseClient";
import Fab from "@mui/material/Fab";
import AddBox from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const FantasyMovieListPage = () => {
  const { movies, setMovies } = useContext(FantasyMoviesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = async (movieId, posterUrl) => {
    const { success, error } = await deleteMovie(movieId, user.email, posterUrl);
  
    if (success) {
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } else if (error) {
      console.error("Error deleting movie:", error);
    }
  };
  

  const handleCreateButtonClick = () => {
    navigate("/fantasy/create");
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#333",
  };

  const titleContainerStyle = {
    display: "flex",
    justifyContent: "center",
    background: "#f7f7f7",
  };

  const fabStyle = {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
  };

  return (
    <div>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Fantasy Movies</h1>
      </div>
      <Grid container spacing={4}>
        <MovieList
          movies={movies}
          action={() => {}}
          displayRuntime
          fantasyMovie
          onDelete={(movieId, posterUrl) => handleDelete(movieId, posterUrl)}
        />
      </Grid>
      <Fab
        color="primary"
        onClick={handleCreateButtonClick}
        aria-label="create fantasy movie"
        style={fabStyle}
      >
        <AddBox />
      </Fab>
    </div>
  );
};

export default FantasyMovieListPage;
