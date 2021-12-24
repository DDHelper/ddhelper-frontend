import { serialize } from 'object-to-formdata';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Md5 } from 'ts-md5/dist/md5';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Logo from '../assets/logo.png';

import Wrapup0 from '../assets/wrapup0.png';
import Wrapup1 from '../assets/wrapup1.png';
import Wrapup2 from '../assets/wrapup2.png';
import Wrapup3 from '../assets/wrapup3.png';
import { useApi } from '../utils/apiClient';
import { LoginValues } from '../utils/apiModels';

const Wrapups = [Wrapup0, Wrapup1, Wrapup2, Wrapup3];
const theme = createTheme();

const LoginFormWithHook: React.FC<{}> = () => {
  const { handleSubmit, register, control } = useForm();
  const { postLogin } = useApi();
  const history = useHistory();

  const onSubmit = async (data: LoginValues) => {
    let value = Object.assign(data, {});
    value.password = Md5.hashStr('DdHe1p0er' + value.password);
    const formData = serialize(value);
    const response = await postLogin(formData);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else {
      alert('登录成功');
      history.push({
        pathname: '/main',
        state: {},
      });
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="用户名"
        autoComplete="username"
        autoFocus
        {...register('username', { required: true })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="密码"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password', { required: true })}
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
          {
            // <Link href="#" variant="body2" /* DESERTED: route to iforgot */>
            //   忘记密码
            // </Link>
          }
        </Grid>
        <Grid item>
          <Link href="/auth/register" variant="body2">
            注册
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
            backgroundImage: `url(${Wrapups[Math.floor(Math.random() * 4)]})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
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
            <img src={Logo} alt="" style={{ height: 80 }} />
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
