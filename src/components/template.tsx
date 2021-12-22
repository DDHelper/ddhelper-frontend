import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import PageHeader from './parts/header';
import PageSider from './parts/sider';

const theme = createTheme();
const drawerWidth = 240;

const TemplatePageView: React.FC<{}> = () => {
  // this is a common comment.

  return (
    // it can be added here...
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PageHeader />
        <PageSider drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // and even here like this!
          }}
          /*
            comment inside angle brackets < >: this is content.
            note that double slashes // cannot be used, only here.
          */
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
            elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
            hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
            Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
            viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
            Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
            at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
            ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            But cannot be added between jsx elements for the compiler assumes this text as the
            content to display on the page.
            {
              // try this! wrap your comment with a pair of curly brackets { } to add it between jsx elements.
              // remember you should do this only if you have no other way out.
            }
          </Typography>
          {
            // and this!
          }
        </Box>
      </Box>
    </ThemeProvider>
    // ...and here, naturally.
  );
};

/*
  and can appear like this.
*/
export default TemplatePageView;
