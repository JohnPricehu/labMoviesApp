import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { TextField, Button, Typography, Grid, Box, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';

const LoginPage = props => {
  const context = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(email, password);
  };

  if (context.isAuthenticated === true) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login Page
        </Typography>
        <Typography variant="body1">
          You must log in to view the protected pages
        </Typography>
        <form>
          <TextField 
            fullWidth 
            id="email" 
            label="Email" 
            margin="normal"
            onChange={e => setEmail(e.target.value)} 
          />
          <TextField 
            fullWidth
            id="password" 
            type="password" 
            label="Password" 
            margin="normal"
            onChange={e => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={login}>
              Log in
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgotpassword" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/s" variant="body2" underline="hover">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
