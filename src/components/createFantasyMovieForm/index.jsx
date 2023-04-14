import React, { useState, useEffect  } from "react";
import supabase, { createFantasyMovie, uploadPoster } from "../../supabaseClient";
import './CreateFantasyMovieForm.css';
import { useNavigate } from "react-router-dom";


const CreateFantasyMovieForm = = (props) => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [genres, setGenres] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("");
  const [productionCompanies, setProductionCompanies] = useState("");
  const [poster, setPoster] = useState(null);
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(props.userEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = supabase.auth.currentUser;
    const userEmail = user ? user.email : "";


    console.log("User email in handleSubmit:", userEmail);

    let posterUrl = '';
    if (poster) {
      const { posterUrl: uploadedPosterUrl, error } = await uploadPoster(poster);
      if (error) {
        console.log("Error uploading poster:", error.message);
        return;
      }
      posterUrl = uploadedPosterUrl;
    }
  
    const movieData = {
      title,
      overview,
      genres,
      release_date: releaseDate,
      runtime,
      production_companies: productionCompanies,
      poster_url: posterUrl,
      actors,
      user_email: userEmail, 
    };

    const { data, error } = await createFantasyMovie(movieData, userEmail);

    if (error) {
      console.log("Error adding movie:", error.message);
    } else {
      console.log("Movie added successfully:", data);
      console.log("User email:", userEmail);
      console.log("Movie data before sending:", movieData);
      navigate("/fantasy");
    }
  };

  useEffect(() => {
    if (props.userEmail) {
      setUserEmail(props.userEmail);
    }
  }, [props.userEmail]);

  const addActor = () => {
    setActors([...actors, { tmdb_id: "" }]);
  };

  const updateActor = (index, field, value) => {
    const newActors = actors.slice();
    newActors[index][field] = value;
    setActors(newActors);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
    <label>
      Title:
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    </label>
    <label>
      Overview:
      <textarea value={overview} onChange={(e) => setOverview(e.target.value)} required></textarea>
    </label>
    <label>
      Genres:
      <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required />
    </label>
    <label>
      Release Date:
      <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
    </label>
    <label>
      Runtime:
      <input type="number" value={runtime} onChange={(e) => setRuntime(e.target.value)} required />
    </label>
    <label>
      Production Company(s):
      <input type="text" value={productionCompanies} onChange={(e) => setProductionCompanies(e.target.value)} required />
    </label>
    <label>
      Upload Poster:
      <input type="file" onChange={(e) => setPoster(e.target.files[0])} />
    </label>
    <div className="actors-container">
        {actors.map((actor, index) => (
          <div key={index} className="actor">
            <label>
              Actor TMDB ID:
              <input
                type="text"
                value={actor.tmdb_id}
                onChange={(e) => updateActor(index, "tmdb_id", e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
      <button type="button" className="add-actor-btn" onClick={addActor}>
        Add Actor by TMDB ID
      </button>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default CreateFantasyMovieForm;