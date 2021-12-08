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
        label="用户名"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="密码"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        type="password"
        label="确认密码"
        name="confirmPassword"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="电子邮箱"
        id="email"
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pin"
        label="验证码"
        name="pin"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        注册
      </Button>
    </Box>
  );
};

const RegisterView: React.FC<{}> = () => {
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
};

export default RegisterView;
