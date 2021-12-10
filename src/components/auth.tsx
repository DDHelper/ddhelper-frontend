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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { serialize } from 'object-to-formdata';
import { Md5 } from 'ts-md5/dist/md5';

const theme = createTheme();

const LoginFormWithHook: React.FC<{}> = () => {
  const { handleSubmit, reset, control } = useForm();
  const { postLogin } = useApi();

  const onSubmit = async (data: any) => {
    let value = Object.assign(data, {});
    value.password = Md5.hashStr(value.password);
    const formData = serialize(value);
    const response = await postLogin(formData);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else alert('登录成功');
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        登录
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2" /* TODO: route to iforgot */>
            忘记密码
          </Link>
        </Grid>
        <Grid item>
          <Link href="/auth/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

const AuthView: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              登录
            </Typography>
            <LoginFormWithHook />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default AuthView;
