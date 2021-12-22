import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useApi } from '../utils/apiClient';
import {
  DoSubscribeValues,
  GroupListApiReturn,
  SearchSubscribeApiReturn,
} from '../utils/apiModels';
import PageHeader from './parts/header';
import PageSider from './parts/sider';

const theme = createTheme();
const drawerWidth = 240;

export interface SimpleDialogProps {
  open: boolean;
  selectedMid: number;
  groupList: GroupListApiReturn;
  onClose: (value?: any) => void;
  onConfirm: (value: DoSubscribeValues) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, onConfirm, selectedMid, groupList, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: any) => {
    console.log(value);
    onConfirm(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>加入分组</DialogTitle>
      <List sx={{ pt: 0 }}>
        {groupList.data.map((item, idx) => (
          <ListItem
            button
            onClick={() => handleListItemClick({ mid: selectedMid, gid: [item.gid] })}
            key={idx}
          >
            <ListItemAvatar>
              <Avatar>
                <PeopleOutlineIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.group_name} />
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

const SearchPageView: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchSubscribeApiReturn>();
  const [groupListData, setGroupListData] = useState<GroupListApiReturn>();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const { handleSubmit, register } = useForm();
  const { getSearchSubscribe, getGroupList, postDoSubscribe } = useApi();

  const handleClickOpen = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const onSubmit = async (data: { search_name: string }) => {
    const response = await getSearchSubscribe(data);
    console.log(response);
    setSearchData(response);
    const ListResponse = await getGroupList();
    setGroupListData(ListResponse);
    setLoaded(true);
    // if (response.code !== 200) alert(`操作失败: ${response.msg}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDoSubscribe = async (value: DoSubscribeValues) => {
    let formData = new FormData();
    Object.keys(value).forEach((key) => {
      if (key === 'gid') {
        const groups = value[key];
        for (let i = 0; i < groups.length; i++) {
          formData.append(key, groups[i].toString());
        }
      } else {
        formData.append(key, value[key as keyof DoSubscribeValues].toString());
      }
    });
    const response = await postDoSubscribe(formData);
    // console.log(response);
    setOpen(false);
  };

  function CustomizedInputBase() {
    return (
      <Box
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
      >
        <IconButton sx={{ p: '10px' }} disabled>
          <MenuIcon />
        </IconButton>
        <TextField
          sx={{ ml: 1, mr: 1, flex: 1 }}
          autoFocus
          variant="standard"
          {...register('search_name', { required: true })}
        />
        <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
        <IconButton sx={{ p: '20px' }} aria-label="search" onClick={handleSubmit(onSubmit)}>
          <SearchIcon />
        </IconButton>
      </Box>
    );
  }

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
          <Typography variant="h5" sx={{ my: 1 }}>
            搜索要订阅的创作者
            <Divider sx={{ my: 1 }} />
            <Box sx={{ my: 3, mx: 3 }}>
              <Box sx={{ my: 2 }}>
                <CustomizedInputBase />
              </Box>

              {loaded ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 0,
                  }}
                >
                  <SimpleDialog
                    selectedMid={selectedIndex}
                    groupList={groupListData!}
                    open={open}
                    onClose={handleClose}
                    onConfirm={handleDoSubscribe}
                  />
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 2000,
                      boxShadow: 2,
                      bgcolor: 'background.paper',
                    }}
                  >
                    {searchData!.data.map((item, idx) => {
                      return (
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Avatar
                                variant="rounded"
                                src={`http://ddd.edrows.top/txcos/pic/?url=${item.upic}@60w_60h.webp`}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemButton
                            sx={{ mx: 1, my: 1, p: 2, position: 'absolute', left: '90%' }}
                            onClick={(event) => handleClickOpen(event, item.mid)}
                          >
                            <AddIcon />
                          </ListItemButton>
                          <ListItemText
                            primary={
                              <Link
                                variant="subtitle2"
                                underline="hover"
                                color="inherit"
                                href={`https://space.bilibili.com/${item.mid}`}
                              >
                                {item.uname}
                              </Link>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                ></Typography>
                              </React.Fragment>
                            }
                          />
                          <ListItemText
                            primary={`粉丝数 ${item.fans}`}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  uid {item.mid}
                                </Typography>
                              </React.Fragment>
                            }
                            sx={{
                              position: 'absolute',
                              left: '50%',
                            }}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              ) : (
                <Typography variant="h6" sx={{ mx: 8 }}>
                  no data
                </Typography>
              )}
            </Box>
          </Typography>

          <Divider />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SearchPageView;
