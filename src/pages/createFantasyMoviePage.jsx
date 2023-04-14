import React, { useState, useEffect } from "react";
import CreateFantasyMovieForm from "../components/createFantasyMovieForm";
import supabase from "../supabaseClient";

const CreateFantasyMoviePage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f7f7f7",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    color: "#333",
  };

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = supabase.auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Create Your Fantasy Movie</h1>
      <CreateFantasyMovieForm userEmail={userEmail} />
    </div>
  );
};

export default CreateFantasyMoviePage;
