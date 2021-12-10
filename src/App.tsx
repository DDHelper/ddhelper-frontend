import React, {
  Suspense,
} from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import {
  Grid,
  Paper,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import AuthView from "./components/auth";
import RegisterView from './components/signup';
import TemplatePageView from './components/template';
import MainrolllistPageView from './components/mainrolllist';
import MaintimelinePageView from './components/maintimeline';
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
    <BrowserRouter>
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
          <Route path="/auth/register" exact>
            <RegisterView />
          </Route>
          <Route path="/main" exact>
            <TemplatePageView />
          </Route>
          <Route path="/mainrolllist" exact>
            <MainrolllistPageView />
          </Route>
          <Route path="/maintimeline" exact>
            <MaintimelinePageView />
          </Route>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
