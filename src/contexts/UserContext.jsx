import { createContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteActors, setFavouriteActors] = useState([]);
  const [mustWatchMovies, setMustWatchMovies] = useState([]);

  useEffect(() => {
    const handleSession = async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Fetch favourite movies and actors for the logged-in user
        const { data: moviesData } = await supabase
          .from('favourite_movies')
          .select('*')
          .eq('user_email', currentUser.email);

          const { data:   mmoviesData } = await supabase
          .from('mustwatch_movies')
          .select('*')
          .eq('user_email', currentUser.email);

        const { data: actorsData } = await supabase
          .from('favourite_actors')
          .select('*')
          .eq('user_email', currentUser.email);

        setFavouriteMovies(moviesData ?? []);
        setMustWatchMovies(mmoviesData ?? []);
        setFavouriteActors(actorsData ?? []);
      } else {
        setFavouriteMovies([]);
        setMustWatchMovies([]);
        setFavouriteActors([]);
      }
    };

    // Listening for authentication status changes
    const { data: authListener } = supabase.auth.onAuthStateChange(handleSession);

    // Initialising user sessions
    handleSession(null, () => supabase.auth.session());

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, favouriteMovies, setFavouriteMovies, mustWatchMovies, setMustWatchMovies, favouriteActors, setFavouriteActors }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
