import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../supabaseClient';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      navigate('/');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            sx={{ mt: 1 }}
            onClick={handleSignupRedirect}
          >
            Don't have an account? Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
