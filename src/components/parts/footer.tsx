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

const PageFooter: React.FC<{}> = () => {
  //页面下方的格式
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Footer Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PageFooter;
