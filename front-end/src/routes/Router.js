import React from 'react';
import { Switch , Route, HashRouter } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import HomeRoute from './HomeRoute';
import RestrictRoute from './RestrictRoute';

import NotFound from '../components/Error/NotFound';
import loadable from '@loadable/component';

const AsyncLoginForm = loadable(() => import('../containers/LoginContainer'));
const AsyncRegisterForm = loadable(() => import('../containers/RegisterContainer'));
const AsyncHome = loadable(() => import('../containers/HomeContainer'));

function Router() {
  return (    
    <React.Fragment>
      <HashRouter>
        <Switch>
          <HomeRoute exact path="/" component={AsyncHome} layout={MainLayout}/>
          <RestrictRoute path="/login" component={AsyncLoginForm} />
          <RestrictRoute path="/register" component={AsyncRegisterForm} />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default Router;


