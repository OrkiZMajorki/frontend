import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/Button';

const Canvas = styled.div`
  height: 100%;
`;

const Webapp = () => {
  function sendRequest() {
    axios.get('https://api.github.com/users/mapbox').then((response) => {
      console.log(response.data);
    });
  }

  function sendDoubleRequest() {
    axios
      .all([axios.get('https://api.github.com/users/mapbox'), axios.get('https://api.github.com/users/phantomjs')])
      .then((response) => {
        console.log('Date created: ', response[0].data);
        console.log('Date created: ', response[1].data);
      });
  }
  return (
    <Canvas>
      <strong>hejka</strong>
      <Button onClick={sendRequest} content="Click me" />
      <button onClick={sendDoubleRequest}>Click me for double fun!</button>
    </Canvas>
  );
};

export default Webapp;
