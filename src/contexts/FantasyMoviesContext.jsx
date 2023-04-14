import React, { createContext, useEffect, useState,useContext } from "react";
import { getCreatedFantasyMovies } from "../supabaseClient";
import { UserContext } from ".././contexts/UserContext";

export const FantasyMoviesContext = createContext();

export const FantasyMoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      if (user) {
        const { data, error } = await getCreatedFantasyMovies(user.email); 
        if (data) {
          setMovies(data);
        }
      }
    };

    fetchAndSetMovies();
  }, [user]); 

  return (
    <FantasyMoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </FantasyMoviesContext.Provider>
  );
};