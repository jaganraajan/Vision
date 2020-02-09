import React, {Fragment, useEffect} from 'react';

import './App.css';
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import {loadUser} from './actions/auth';
import store from './store';

const App =() => {
  useEffect(() => store.dispatch(loadUser()),[]);
  
  return (

  
  <Provider store={store}>

      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>

  </Provider>
);
};

export default App;
