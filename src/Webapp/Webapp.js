import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { ReactComponent as LogoSVG } from '../media/logoWhite.svg';
import Sections from './Sections/Sections';
import {gql, useMutation, useQuery} from "@apollo/client"

const Canvas = styled.div`
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  max-width: 1080px;
  margin: auto;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.white};
  color: white;

  ${({ theme }) => theme === 'white' && css``}

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 300px;
    top: 0;
    left: 0;
    background: coral;
    z-index: -1;
    background-image: linear-gradient(
      to left,
      #7231b5,
      #4c5dd4,
      #007ee7,
      #009bef,
      #00b5f1,
      #32bdf2,
      #4bc4f2,
      #60ccf3,
      #60c6f5,
      #63bff6,
      #6ab8f6,
      #73b1f4
    );
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 240px;
    top: 300px;
    left: 0;
    background: coral;
    z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 100%);
    background-image: linear-gradient(
      to left,
      #7231b5,
      #4c5dd4,
      #007ee7,
      #009bef,
      #00b5f1,
      #32bdf2,
      #4bc4f2,
      #60ccf3,
      #60c6f5,
      #63bff6,
      #6ab8f6,
      #73b1f4
    );
  }
`;

const Left = styled.a`
  display: block;
  margin-top: 4px;

  svg {
    width: 128px;
  }
`;

const Center = styled.nav`
  display: block;
  font-weight: 560;
  font-size: 16px;
`;

const StyledTextLink = styled(TextLink)`
  padding: 12px 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const Webapp = ({ theme = 'white' }) => {
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

  const CREATE_USER_MUTATION =
      gql`
  mutation CreateUser($username: String!, $password: String!, $role: String!, $email: String!) {
        createUser(user: {username: $username, password: $password, role: $role, email: $email})
          {
          id
          email
          }
      }`;

  const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(userLogin: {email: $email, password: $password}) {
      id
      username
      role
    }
  }`;

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const { loading, error, data } = useQuery(LOGIN_QUERY, { variables: { email: 'dupa4@dupa.com', password: 'dupa' } });

  async function createNewUser() {
      await createUser({variables: { username: 'dupa2', password: 'dupa', role: 'VENUE', email: 'dupa4@dupa.com'}})
  }

  function loginUser() {
    console.log(data);
  }

  return (
    <Canvas>
      <Header theme={theme}>
        <Left href="/">
          <LogoSVG />
        </Left>
        <Center>
          <Button onClick={createNewUser}>Testing my stuff</Button>
          <Button onClick={loginUser}>Trying to login</Button>
          <StyledTextLink href="/matching">Matching</StyledTextLink>
          <StyledTextLink href="/chat">Messages</StyledTextLink>
          <StyledTextLink href="/calendar">Calendar</StyledTextLink>
        </Center>
        <Button background="white-outline" href="/login" content="Sign in"></Button>
      </Header>
      <Sections />
    </Canvas>
  );
};

export default Webapp;
