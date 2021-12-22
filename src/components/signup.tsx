import { serialize } from 'object-to-formdata';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Md5 } from 'ts-md5/dist/md5';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import { RegisterValues } from '../utils/apiModels';

const theme = createTheme();

const RegisterFormWithHook: React.FC<{}> = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { postRegister, postSendPin } = useApi();
  const [emailEmpty, setEmailEmpty] = useState<boolean>(true);

  const checkEmailEmpty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email !== undefined && email !== '') setEmailEmpty(false);
    else setEmailEmpty(true);
  };

  const onSubmit = async (data: RegisterValues) => {
    let value = Object.assign(data, {});
    value.password = Md5.hashStr(value.password);
    value.confirmPassword = Md5.hashStr(value.confirmPassword);
    const formData = serialize(value);
    const response = await postRegister(formData);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else alert('注册成功');
  };

  const onSendEmail = async () => {
    let value = { email: await getValues('email') };
    console.log(getValues('email'));
    const formData = serialize(value);
    const response = await postSendPin(formData);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else alert('已发送验证码');
  };

  return (
    <Box>
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          type="password"
          label="确认密码"
          {...register('confirmPassword', { required: true })}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          label="电子邮箱"
          id="email"
          autoComplete="email"
          {...register('email', {
            required: true,
            onChange: checkEmailEmpty,
          })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="验证码"
          id="pin"
          autoComplete="pin"
          {...register('pin', { required: true })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          注册
        </Button>
      </Box>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        disabled={emailEmpty}
        onClick={onSendEmail}
      >
        发送验证码
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
