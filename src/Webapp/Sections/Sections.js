import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Matching from './Matching/Matching';
import Messages from './Messages/Messages';
import ImageComponent from '../ImageUpload/client/src/ImageComponent';
import LandingPage from './LandingPage/LandingPage';

formRef = React.createRef();
save = () => {
  alert("how to get state of Form?");
  const form = formRef.current;
  console.log(form.state)
  //fire api call
};
const Sections = () => {
  return (
    <Switch>
      <Route exact path="/matching" render={(props) => <Matching {...props} />} />
      <Route exact path="/chat" render={(props) => <Messages {...props} />} />
      <Route exact path="/calendar" render={(props) => <ImageComponent {...props} ref={formRef} />} />
      <button onClick={save}>save</button>
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
    </Switch>
  );
};

export default withRouter(Sections);
