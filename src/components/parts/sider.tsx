import React, { useState } from 'react';
import { useApi } from '../../utils/apiClient';
import {
  Button,
  Paper,
  Box,
  Grid,
  CssBaseline,
  Typography,
  Link,
  Avatar,
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchOutlineIcon from '@mui/icons-material/SearchOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface props {
  drawerWidth: number;
}
const PageSider: React.FC<props> = (props) => {
  //页面左侧快捷访问栏
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: props.drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Link href="/" underline="none">
            <ListItem button key="home">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="主页" />
              {
                //单击主信息页面
              }
            </ListItem>
          </Link>
          <Link href="/timeline" underline="none">
            <ListItem button key="timeline">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="时间轴" />
              {
                //单击打开时间轴页面
              }
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/usergrouping" underline="none">
            <ListItem button key="usergrouping">
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="分组管理" />
              {
                //单击打开分组管理页面
              }
            </ListItem>
          </Link>
          <Link href="/search" underline="none">
            <ListItem button key="usergrouping">
              <ListItemIcon>
                <SearchOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="搜索订阅" />
              {
                //单击打开搜索订阅页面
              }
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};

export default PageSider;
