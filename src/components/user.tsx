import { serialize } from 'object-to-formdata';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Md5 } from 'ts-md5/dist/md5';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import { UserApiReturn } from '../utils/apiModels';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const theme = createTheme();
const drawerWidth = 240;

const UserContent: React.FC<UserApiReturn> = (props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          用户信息
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="subtitle2" component="div">
              用户名
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1" component="div">
              {props.data.username}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle2" component="div">
              uid
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1" color="text.secondary">
              {props.data.uid}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle2" component="div">
              邮箱
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1" component="div">
              {props.data.email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const ChangePasswordFormWithHook: React.FC<{ email: string }> = (props) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { postChangePassword, postSendPin } = useApi();
  const history = useHistory();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    let value = Object.assign(data, {});
    value.new_password = Md5.hashStr('DdHe1p0er' + value.new_password);
    value.old_password = Md5.hashStr('DdHe1p0er' + value.old_password);
    const formData = serialize(value);
    const response = await postChangePassword(formData);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else {
      alert('修改成功');
      history.push({
        pathname: '/auth/login',
        state: {},
      });
    }
  };

  const onSendEmail = async () => {
    const values = serialize({ type: 'change_password' });
    setButtonLoading(true);
    const response = await postSendPin(values);
    if (response.code !== 200) alert(`操作失败: ${response.msg}`);
    else alert('已发送验证码');
    setButtonLoading(false);
  };

  return (
    <Box>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="原密码"
          type="password"
          id="old_password"
          {...register('old_password', { required: true })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="newPassword"
          type="password"
          label="新密码"
          {...register('new_password', { required: true })}
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
          修改密码
        </Button>
      </Box>
      <LoadingButton fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={onSendEmail} loading={buttonLoading}>
        发送验证码
      </LoadingButton>
    </Box>
  );
};

const UserPageView: React.FC<{}> = () => {
  const { getUserInfo } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<UserApiReturn>();
  useEffect(() => {
    async function fetch() {
      const response = await getUserInfo();
      setUserdata(response);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getUserInfo]);

  // TODO: change grid view
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PageHeader />
        <PageSider drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          /* this is content */
        >
          <Toolbar />
          {loaded && (
              <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6} md={7}>
                  <UserContent code={userdata!.code} data={userdata!.data} />
                  <Divider variant="middle" />
                  <Card sx={{ minWidth: 275, my: 2}}>
                    <CardContent>
                      <Typography variant="h5" color="text.secondary" gutterBottom>
                        修改密码
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={7}>
                          <ChangePasswordFormWithHook email={userdata!.data.email} />
                        </Grid>
                        <Grid item xs></Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item xs={3}></Grid>
                </Grid>
              </Grid>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserPageView;
