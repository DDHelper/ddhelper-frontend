
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
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
const theme = createTheme();
const drawerWidth = 240;
const group = ['group a','group b','group c'];
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
function FollowDialog(props: SimpleDialogProps) {
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
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Follow" />
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
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));

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

              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
              <List sx={{ width: '100%', maxWidth: 2000,  boxShadow: 2,bgcolor: 'background.paper' }}>

              <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Avatar alt="1" src="/imgs/1.jpg" />
          </Avatar>
        </ListItemAvatar>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{
           p: 2,
          position: 'absolute',
          left: '90%',
          zIndex: 'tooltip',
        }}
>
        Follow
      </Button>
        {/* <ListItemText primary="Account 1" secondary="blablablablablablablablablablablablablablabla" /> */}
        <ListItemText
          primary="Summer"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                20k
              </Typography>
              {"  -Wish I could come, but I'm out of town…"}
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
          left: '90%',
          zIndex: 'tooltip',
        }} onClick={handleClickOpen}
>
        Follow
      </Button>
      <FollowDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
        <ListItemText primary="Summer"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                17
              </Typography>
              {"  -这个人什么都没有留下"}
            </React.Fragment>
          } />
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
          left: '90%',
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
        <ListItemText primary="Summer" secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                356
              </Typography>
              {"  -blablablablabla"}
            </React.Fragment>
          } />
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
