import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from "./components/ProtectedRoute"; 
import ActorPage from "./pages/actorDetailsPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
      refetchInterval: 1, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <UserProvider>
        <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>        
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/actors/:id" element={<ActorPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/mustWatches" element={<MustWatchMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />

                <Route path="/reviews/:id" element={<MovieReviewPage/>} />
              </Route>
            </Routes>       
          </MoviesContextProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
