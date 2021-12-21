import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
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
            {
              //登陆页面
            }
            <AuthView />
          </Route>
          <Route path="/auth/register" exact>
            {
              //注册页面
            }
            <RegisterView />
          </Route>
          <Route path="/" exact>
            <MainrolllistPageView />
          </Route>
          <Route path="/main" exact>
            {
              //动态展示页面
            }
            <MainrolllistPageView />
          </Route>
          <Route path="/timeline" exact>
            {
              //日历时间轴页面
            }
            <MainTimelinePageView />
          </Route>
          <Route path="/user" exact>
            {
              //用户信息页面
            }
            <UserPageView />
          </Route>
          <Route path="/usergrouping" exact>
            {
              //分组管理页面
            }
            <GroupingPageView />
          </Route>
          <Route path="/search" exact>
            {
              //搜索页面
            }
            <SearchPageView />
          </Route>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
