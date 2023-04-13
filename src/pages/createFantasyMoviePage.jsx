import React from "react";
import CreateFantasyMovieForm from "../components/createFantasyMovieForm";

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

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Create Your Fantasy Movie</h1>
      <CreateFantasyMovieForm />
    </div>
  );
};

export default CreateFantasyMoviePage;
