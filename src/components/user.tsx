import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import { useApi } from '../utils/apiClient';
import { useEffect, useState } from 'react';
import { UserApiReturn } from '../utils/apiModels';

const theme = createTheme();
const drawerWidth = 240;

const UserContent: React.FC<UserApiReturn> = (props) => {
  return <div>mememememe</div>;
};

const UserPageView: React.FC<{}> = () => {
  const { getUserInfo } = useApi();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    async function fetch() {
      const response = await getUserInfo();
      setLoaded(true);
      console.log(response);
    }
    fetch();
  }, []);

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
            <UserContent code={400} data={{ username: 'string', uid: 400, email: 'string' }} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserPageView;
