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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import PageHeader from './parts/header';
import PageSider from './parts/sider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { blue } from '@mui/material/colors';

const theme = createTheme();
const drawerWidth = 240;
const group = ['group setting'];
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}


function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  
  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <List sx={{ pt: 0 }}>
        {group.map((group) => (
          <ListItem button onClick={() => handleListItemClick(group)} key={group}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
             
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={group} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <RemoveIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Unfollow" />
        </ListItem>
      </List>
    </Dialog>
  );
}

  const SearchView: React.FC<{}> = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(group[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value: string) => {
      setOpen(false);
      setSelectedValue(value);
    };


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
              <List sx={{ width: '100%', maxWidth: 1080,  boxShadow: 2,bgcolor: 'background.paper' }}>

              <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="1" src="/imgs/1.jpg" />
          </Avatar>
        </ListItemAvatar>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{
           p: 2,
          position: 'absolute',
          left: '80%',
          zIndex: 'tooltip',
        }}
>
        Follow
      </Button>
        {/* <ListItemText primary="Account 1" secondary="blablablablablablablablablablablablablablabla" /> */}
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="2" src="/imgs/2.jpg" />
          </Avatar>
        </ListItemAvatar>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{
           p: 2,
          position: 'absolute',
          left: '80%',
          zIndex: 'tooltip',
        }}
>
        Follow
      </Button>
        <ListItemText primary="Account 2" secondary="blablabla" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="3" src="/imgs/3.jpg" />
          </Avatar>
        </ListItemAvatar>
        <Button variant="contained" startIcon={<ArrowDropDownCircleIcon />} sx={{
           p: 2,
          position: 'absolute',
          left: '80%',
          zIndex: 'tooltip',
        }} onClick={handleClickOpen}
>
        Followed
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
        <ListItemText primary="Account 3" secondary="blablabla" />
      </ListItem>

            {/* {['Account 1', 'Account 2', 'Account 3'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <ListItemIcon /> : <ListItemIcon />}</ListItemIcon>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <AssignmentIndOutlinedIcon /> */}
                {/* <Avatar alt="1" src="/imgs/1.jpg" /> */}
                {/* </Avatar>
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                 <Avatar alt="2" src="/imgs/2.jpg" />
               </Avatar>
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Avatar alt="3" src="/imgs/3.jpg" />
                </Avatar>
                <ListItemText primary={text} secondary="blablabla"/>
              </ListItem>
            ))} */} 
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
