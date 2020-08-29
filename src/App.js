import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import Webapp from './Webapp/Webapp';
import Page404 from './Page404/Page404';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "@apollo/client";

export const theme = {
  grey: '#646C77',
  greyDark: '#424953',
  greyLight: '#A9B1BC',
  silver: '#E5E8EC',
  silverDark: '#CBD0D8',
  silverLight: '#F4F6F9',
  rose: '#EB87BF',
  roseDark: '#D670AC',
  roseLight: '#F299CE',
  lavender: '#AC92EA',
  lavenderDark: '#967ADA',
  lavenderLight: '#B3A5EF',
  jeans: '#5E9CEA',
  jeansDark: '#4B89DA',
  jeansLight: '#73B1F4',
  aqua: '#4FC1E9',
  aquaDark: '#3BAFDA',
  aquaLight: '#66D4F0',
  mint: '#46CEAD',
  mintDark: '#35BB9B',
  mintLight: '#62DDBD',
  grass: '#9ED36A',
  grassDark: '#8AC054',
  grassLight: '#B4E080',
  sunflower: '#FECD57',
  sunflowerDark: '#F5BA45',
  sunflowerLight: '#FCD277',
  melon: '#FB6D51',
  melonDark: '#E8563F',
  melonLight: '#FC8370',
  amaranth: '#EC5564',
  amaranthDark: '#D94452',
  amaranthLight: '#F76D82',

  crimson: '#9C0103',
  white: '#FFFFFF',
};

function App() {

    const client = new ApolloClient({
        uri: 'https://hacknarok-backend.herokuapp.com/graphql'
    });

  return (
      <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Webapp} />
        <Route path="/:section/" component={Webapp} />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </ThemeProvider>
      </ApolloProvider>
  );
}

export default App;
