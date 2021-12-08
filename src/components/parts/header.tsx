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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PageHeader: React.FC<{}> = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <a href="/main"  title="首页">
              <img alt="DD助手" src="header.png" width="100" height="60"/>      
            </a>
          
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
