import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useApi } from '../utils/apiClient';
import {
  Button,
  Paper,
  Box,
  Grid,
  CssBaseline,
  Typography,
  Link,
  Avatar,
  Checkbox,
  FormControlLabel,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';

const theme = createTheme();

const RegisterFormWithHook: React.FC<{}> = () => {
  const { handleSubmit, reset, control } = useForm();
  const { postRegister } = useApi();
  const onSubmit = (data: any) => {
    console.log(data);
    let value = Object.assign(data, {});
    const response = postRegister(value);
    console.log(response);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        id="email"
        autoComplete="email"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        注册
      </Button>
    </Box>
  );
};

export default function RegisterView() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              DD Helper
          </Typography>
          <Typography component="h1" variant="h6">
            注册
          </Typography>
          <RegisterFormWithHook />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
