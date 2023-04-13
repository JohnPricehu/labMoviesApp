import React, { createContext, useEffect, useState } from "react";
import { fetchMovies } from "../supabaseClient";

export const FantasyMoviesContext = createContext();

export const FantasyMoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      const { data, error } = await fetchMovies();
      if (data) {
        setMovies(data);
      }
    };

    fetchAndSetMovies();
  }, []);

  return (
    <FantasyMoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </FantasyMoviesContext.Provider>
  );
};