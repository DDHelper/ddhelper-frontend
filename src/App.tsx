import React, {
  Suspense,
} from 'react';
import './App.css';
import {
  Link,
  // LinkProps,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { FormWithHookForm } from './components/auth'
import {
  Grid,
  Paper,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

function App() {
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
  return (
    <Switch>
      <Suspense
        fallback={
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Skeleton variant="rectangular" width="30%" height={30} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" width="90%" height={200} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" width="90%" height={200} />
            </Grid>
          </Grid>
        }
      >
        <Route path="/auth/login" exact>
          <AuthView />
        </Route>
      </Suspense>
    </Switch>
  );
}

export default App;
