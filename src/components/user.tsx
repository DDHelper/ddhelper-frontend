import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

const UserPageView: React.FC<{}> = () => {
  const { getUserInfo } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userdata, setUserdata] = useState<UserApiReturn>();
  useEffect(() => {
    async function fetch() {
      const response = await getUserInfo();
      setUserdata(response);
      console.log(response);
      // DO SOMETHING
      setLoaded(true);
    }
    fetch();
  }, [getUserInfo]);

  // TODO: add change password and logout
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
          {loaded && <UserContent code={userdata!.code} data={userdata!.data} />}
          <Divider variant="middle" />
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                操作
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Button variant="text" href="/">
                    修改密码
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="text" href="/">
                    退出登录
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserPageView;
