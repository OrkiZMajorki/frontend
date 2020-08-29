import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { ReactComponent as LogoSVG } from '../media/logoWhite.svg';
import Sections from './Sections/Sections';

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

const Webapp = ({ color = 'white', type = 'regular' }) => {
  const [user, setUser] = useState({});

  function authenticate(newUser) {
    setUser(newUser);
    console.log('authenticated', newUser);
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
        {user.name ? <>{user.name}</> : <Button background="white-outline" href="/login" content="Sign in"></Button>}
      </Header>
      <Sections authenticate={authenticate} user={user} />
    </Canvas>
  );
};

export default Webapp;
