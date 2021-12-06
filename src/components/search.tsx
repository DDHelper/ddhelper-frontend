import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Paper,
  Grid,
  Link,
  Avatar,
  Checkbox,
  FormControlLabel,
  Container,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from './parts/header';
import PageSider from './parts/sider';

const theme = createTheme();
const drawerWidth = 240;

  const SearchView: React.FC<{}> = () => {
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
            <Typography paragraph>
              Search
              <List>
            {['Account 1', 'Account 2', 'Account 3'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <ListItemIcon /> : <ListItemIcon />}</ListItemIcon>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <AssignmentIndOutlinedIcon /> */}
                <Avatar alt="q" src="/imgs/1.jpg" />
                
               </Avatar>
                <ListItemText primary={text} secondary="blablabla"/>
              </ListItem>
            ))}
          </List>
            </Typography>
            
            <Divider />
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
              sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
              In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
              et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
              sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
              viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
              ultrices sagittis orci a.
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  };
  

export default SearchView;
