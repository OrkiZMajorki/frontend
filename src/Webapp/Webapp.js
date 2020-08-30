import React, {useEffect, useState} from 'react';
import styled, { css } from 'styled-components';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { ReactComponent as LogoSVG } from '../media/logoWhite.svg';
import Sections from './Sections/Sections';
import { gql, useMutation, useQuery } from '@apollo/client';
import {withRouter} from "react-router-dom";

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

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 72px;
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

  ${({ type }) =>
    type === 'slashed' &&
    css`
      &:before {
        height: 550px;
      }
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 120px;
        top: 550px;
        left: 0;
        z-index: -1;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
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
    `}
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
  font-weight: 500;
  font-size: 16px;
`;

const Right = styled.div`
  width: 128px;
  text-align: right;
`;

const Username = styled.div`
  font-size: 16px;
  margin-right: 8px;
`;

const StyledTextLink = styled(TextLink)`
  padding: 12px 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const Webapp = ({ color = 'white', type = 'regular', history}) => {
  const [user, setUser] = useState();
  const [mode, setMode] = useState();

  const CREATE_USER_MUTATION = gql`
    mutation CreateUser($username: String!, $password: String!, $role: String!, $email: String!) {
      createUser(user: { username: $username, password: $password, role: $role, email: $email }) {
        id
        email
        role
        username
      }
    }
  `;

  const CREATE_VENUE_MUTATION = gql`
    mutation CreateVenue($name: String!, $userId: ID!) {
      createVenue(venue: { name: $name }, userId: $userId) {
        id
        name
      }
    }
  `;

  const LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
      login(userLogin: { email: $email, password: $password }) {
        id
        username
        role
      }
    }
  `;

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [createVenue] = useMutation(CREATE_VENUE_MUTATION);
  const {load, error, data} = useQuery(LOGIN_QUERY, {variables: { email: (user || {}).email, password: (user || {}).password } });
  useEffect(() => {
      console.log(data);

      if (mode === 'login') {
          console.log('Another things necessary for loggin (setting id from data?)');
          history.push('/matching');
      }
  }, [data]);

  async function createNewUser(newUser) {
    return await createUser({ variables: { username: newUser.name, password: newUser.password, role: newUser.role, email: newUser.email } });
  }

  async function createNewVenue(name, userId) {
    return await createVenue({ variables: { name, userId }});
  }


  function authenticate(newUser, mode) {
    setUser(newUser);
    setMode(mode);

    if (mode === 'register') {
        createNewUser(newUser)
            .then((response) => {
                    const createdUser = response.data.createUser;
                    const userId = createdUser.id;
                    const userRole = createdUser.role;
                    const username = createdUser.username;

                    if (userRole === 'VENUE') {
                        createNewVenue(username, userId);
                    }
                }
            );
    }

        history.push('/matching');
    }

  return (
    <Canvas>
      <Header color={color} type={type}>
        <Left href="/">
          <LogoSVG />
        </Left>
        <Center>
          <StyledTextLink href="/matching">Matching</StyledTextLink>
          <StyledTextLink href="/chat">Messages</StyledTextLink>
          <StyledTextLink href="/calendar">Calendar</StyledTextLink>
        </Center>
        <Right>
          {user ? (
            <Username>{user.name}</Username>
          ) : (
            <Button background="white-outline" href="/login" content="Sign in"></Button>
          )}
        </Right>
      </Header>
      <Sections authenticate={authenticate} user={user} />
    </Canvas>
  );
};

export default withRouter(Webapp);
