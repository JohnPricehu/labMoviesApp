import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user, error };
};

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const addMovieToFavourites = async (userEmail, movieId) => {
    const { data, error } = await supabase
      .from('favourite_movies')
      .insert([{ user_email: userEmail, movie_id: movieId }]);
    return { data, error };
  };

export const addMovieToMustWatches = async (userEmail, movieId) => {
    const { data, error } = await supabase
      .from('mustwatch_movies')
      .insert([{ user_email: userEmail, movie_id: movieId }]);
    return { data, error };
  };
  
export const removeMovieFromFavourites = async (userEmail, movieId) => {
    const { data, error } = await supabase
      .from('favourite_movies')
      .delete()
      .eq('user_email', userEmail)
      .eq('movie_id', movieId);
    return { data, error };
  };

  export const removeMovieFromMustWatches = async (userEmail, movieId) => {
    const { data, error } = await supabase
      .from('mustwatch_movies')
      .delete()
      .eq('user_email', userEmail)
      .eq('movie_id', movieId);
    return { data, error };
  };
  
export const addActorToFavourites = async (userEmail, actorId) => {
    const { data, error } = await supabase
      .from('favourite_actors')
      .insert([{ user_email: userEmail, actor_id: actorId }]);
    return { data, error };
  };
  
export const removeActorFromFavourites = async (userEmail, actorId) => {
    const { data, error } = await supabase
      .from('favourite_actors')
      .delete()
      .eq('user_email', userEmail)
      .eq('actor_id', actorId);
    return { data, error };
  };
  
  export const getFavouriteMovies = async (userEmail) => {
    const { data, error, status } = await supabase
      .from('favourite_movies')
      .select('movie_id')
      .eq('user_email', userEmail);
  
    if (error) {
      console.error('getFavouriteMovies error:', error, 'Status:', status);
    }
  
    return { data, error };
  };

  export const getMustWatchMovies = async (userEmail) => {
    const { data, error, status } = await supabase
      .from('mustwatch_movies')
      .select('movie_id')
      .eq('user_email', userEmail);
  
    if (error) {
      console.error('getMustWatchMovies error:', error, 'Status:', status);
    }
  
    return { data, error };
  };
  
  export const getFavouriteActors = async (userEmail) => {
    const { data, error, status } = await supabase
      .from('favourite_actors')
      .select('actor_id')
      .eq('user_email', userEmail);
  
    if (error) {
      console.error('getFavouriteActors error:', error, 'Status:', status);
    }
  
    return { data, error };
  };

  export async function checkMovieInFavourites(email, movieId) {
    try {
      const { data, error } = await supabase
        .from("favourite_movies")
        .select("movie_id")
        .eq("user_email", email)
        .eq("movie_id", movieId);
  
      if (error) {
        throw error;
      }
  
      return data.length > 0;
    } catch (error) {
      console.error("Error checking movie in favourites:", error);
      return false;
    }
  }

  export async function checkMovieInMustWatches(email, movieId) {
    try {
      const { data, error } = await supabase
        .from("mustwatch_movies")
        .select("movie_id")
        .eq("user_email", email)
        .eq("movie_id", movieId);
  
      if (error) {
        throw error;
      }
  
      return data.length > 0;
    } catch (error) {
      console.error("Error checking movie in must watches:", error);
      return false;
    }
  }

  export async function checkActorInFavourites(email, actorId) {
    try {
      const { data, error } = await supabase
        .from("favourite_actors")
        .select("actor_id")
        .eq("user_email", email)
        .eq("actor_id", actorId);
  
      if (error) {
        throw error;
      }
  
      return data.length > 0;
    } catch (error) {
      console.error("Error checking actor in favourites:", error);
      return false;
    }
  }
  

  export const createFantasyMovie = async (movieData, userEmail) => {
    movieData.user_email = userEmail;
    const { data, error } = await supabase.from("movies").insert(movieData);
    return { data, error };
  };
  
  

  export const uploadPoster = async (file, userId, userEmail) => {
    const fileName = `fantasy/posters/${userEmail}/${file.name}`;
    const { data, error } = await supabase.storage
      .from('movie-posters')
      .upload(fileName, file);
  
    if (error) {
      console.error('Error uploading poster:', error);
      return { error };
    }
  
    const baseUrl = `${SUPABASE_URL}/storage/v1/object/public`;
    const posterUrl = `${baseUrl}/movie-posters/${fileName}`;
    return { posterUrl };
  };


  export const getCreatedFantasyMovies = async (userEmail) => {
    const { data, error, status } = await supabase
      .from('movies')
      .select('*')
      .eq('user_email', userEmail);
  
    if (error) {
      console.error('getCreatedFantasyMovies error:', error, 'Status:', status);
    }
  
    return { data, error };
  };
  
  

  export const deleteMovie = async (movieId, userEmail, posterUrl) => {
    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", movieId)
      .eq("user_email", userEmail);
  
    if (error) {
      console.error("Error deleting movie:", error);
      return { error };
    }
  
    if (posterUrl) { // posterUrl is null if the movie was created without a poster
      const fileName = posterUrl.split('/').pop();
  
      const { error: deleteError } = await supabase.storage
        .from("movie-posters")
        .remove([`fantasy/posters/${userEmail}/${fileName}`]);
  
      if (deleteError) {
        console.error("Error deleting movie poster:", deleteError);
        return { error: deleteError };
      }
    }
  
    return { success: true };
  };

  export const getFantasyMovie = async (id) => {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", id)
      .single();
  
    if (error) {
      throw error;
    }
  
    return data;
  };
  
  export const getFantasyMovieActorIds = async (movieId) => {
    const { data, error } = await supabase
      .from("movies")
      .select("actors")
      .eq("id", movieId);
  
    if (error) {
      throw error;
    }
  
    return data;
  };
  
  export const getFantasyMovieDetails = async (id) => {
    const movie = await getFantasyMovie(id);
    const actorIds = await getFantasyMovieActorIds(id);
    return { movie, actorIds };
  };
  
  
  
  
  
  export default supabase;