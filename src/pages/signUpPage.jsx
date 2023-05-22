import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const SignUpPage = props => {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      context.register(email, password, firstName, lastName);
      setRegistered(true);
    }
  }

  if (registered === true) {
   return <Navigate to="/l" />;
  }

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up Page
        </Typography>
        <Typography variant="body1">
          You must register a username and password to log in
        </Typography>
        <form>
          <TextField 
            fullWidth 
            label="Email"
            value={email}
            margin="normal"
            onChange={e => setEmail(e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="First Name"
            value={firstName}
            margin="normal"
            onChange={e => setFirstName(e.target.value)} 
          />
          <TextField 
            fullWidth 
            label="Last Name"
            value={lastName}
            margin="normal"
            onChange={e => setLastName(e.target.value)} 
          />
          <TextField 
            fullWidth 
            type="password" 
            label="Password"
            value={password}
            margin="normal"
            onChange={e => setPassword(e.target.value)} 
          />
          <TextField 
            fullWidth 
            type="password" 
            label="Confirm Password"
            value={passwordAgain}
            margin="normal"
            onChange={e => setPasswordAgain(e.target.value)} 
            error={password !== passwordAgain}
            helperText={password !== passwordAgain && "Passwords do not match."}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={register}>
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
