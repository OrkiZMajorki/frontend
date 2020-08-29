import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Matching from './Matching/Matching';
import Messages from './Messages/Messages';
import ImageComponent from '../ImageUpload/client/src/ImageComponent';
import LandingPage from './LandingPage/LandingPage';
import Auth from './Auth/Auth';

<<<<<<< HEAD
formRef = React.createRef();
save = () => {
  alert("how to get state of Form?");
  const form = formRef.current;
  console.log(form.state)
  //fire api call
};
const Sections = () => {
=======
const Sections = ({ authenticate, ...props }) => {
>>>>>>> 5d044697b46a6003c2cb5c213ca9a50b295df174
  return (
    <Switch>
      <Route exact path="/matching" render={(props) => <Matching {...props} />} />
      <Route exact path="/chat" render={(props) => <Messages {...props} />} />
<<<<<<< HEAD
      <Route exact path="/calendar" render={(props) => <ImageComponent {...props} ref={formRef} />} />
      <button onClick={save}>save</button>
=======
      <Route exact path="/calendar" render={(props) => <Calendar {...props} />} />
      <Route exact path="/login" render={(props) => <Auth mode="login" authenticate={authenticate} {...props} />} />
      <Route
        exact
        path="/register/:role"
        render={(props) => <Auth mode="register" authenticate={authenticate} {...props} />}
      />
>>>>>>> 5d044697b46a6003c2cb5c213ca9a50b295df174
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
    </Switch>
  );
};

export default withRouter(Sections);
