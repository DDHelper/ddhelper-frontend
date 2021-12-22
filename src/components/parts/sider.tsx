import React from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SearchOutlineIcon from '@mui/icons-material/SearchOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

interface props {
  drawerWidth: number;
}
const PageSider: React.FC<props> = (props) => {
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
            </ListItem>
          </Link>
          <Link href="/timeline" underline="none">
            <ListItem button key="timeline">
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary="时间轴" />
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
            </ListItem>
          </Link>
          <Link href="/search" underline="none">
            <ListItem button key="usergrouping">
              <ListItemIcon>
                <SearchOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="搜索订阅" />
            </ListItem>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};

export default PageSider;
