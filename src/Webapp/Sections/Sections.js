import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Matching from './Matching/Matching';
import Messages from './Messages/Messages';
import Calendar from './Calendar/Calendar';
import LandingPage from './LandingPage/LandingPage';

const Sections = () => {
  return (
    <Switch>
      <Route exact path="/matching" render={(props) => <Matching {...props} />} />
      <Route exact path="/chat" render={(props) => <Messages {...props} />} />
      <Route exact path="/calendar" render={(props) => <Calendar {...props} />} />
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
    </Switch>
  );
};

export default withRouter(Sections);
