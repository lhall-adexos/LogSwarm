// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NewStreamPage from './containers/NewStreamPage';
import StreamPage from './containers/StreamPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/newStream" component={NewStreamPage} />
    <Route path="/stream/:streamId" component={StreamPage} />
  </Route>
);
