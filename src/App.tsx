import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import AuthView from './components/auth';
import RegisterView from './components/signup';
import TemplatePageView from './components/template';
import MainrolllistPageView from './components/mainrolllist';
import MainTimelinePageView from './components/maintimeline';
import UserPageView from './components/user';
import GroupingPageView from './components/grouping';
import SearchPageView from './components/search';
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
          <Route path="/" exact>
            <MainrolllistPageView />
          </Route>
          <Route path="/main" exact>
            <MainrolllistPageView />
          </Route>
          <Route path="/timeline" exact>
            <MainTimelinePageView />
          </Route>
          <Route path="/user" exact>
            <UserPageView />
          </Route>
          <Route path="/usergrouping" exact>
            <GroupingPageView />
          </Route>
          <Route path="/search" exact>
            <SearchPageView />
          </Route>
          <Route path="/auth/search" exact>
            <SearchView/>
          </Route>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
