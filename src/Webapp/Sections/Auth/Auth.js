import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import TextLink from '../../../components/TextLink';
import Button from '../../../components/Button';

const Canvas = styled.div`
  max-width: 1080px;
  margin: 64px auto 0;
  padding: 0 16px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
`;

const Card = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  max-width: 480px;
  padding: 32px;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
  background: ${(props) => props.theme.white};
`;

const CardTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  margin-bottom: 32px;
`;

const StyledInput = styled(Input)`
  margin-top: 24px;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
  width: 100%;
`;

const BottomText = styled.div`
  margin-top: 32px;
  text-align: center;

  a {
    color: ${(props) => props.theme.roseDark};
    font-weight: 600;
  }
`;

const Auth = ({ mode, authenticate, user, location = '' }) => {
  const [role, setRole] = useState(location.pathname.replace('/register/', '').replace('/login/', '').toUpperCase());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onAuthenticate() {
    authenticate({ role, name, email, password });
  }

  console.log(role);

  return (
    <Canvas>
      <Card>
        <CardTitle>{mode === 'login' ? 'Sign in to your account' : 'Create your Zymph account'}</CardTitle>
        {mode === 'register' && (
          <>
            <Dropdown
              title="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { id: 1, value: 'VENUE', label: 'Venue' },
                { id: 2, value: 'BAND', label: 'Band' },
              ]}
            />
            <StyledInput title="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </>
        )}
        <StyledInput type="email" title="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <StyledInput type="password" title="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <StyledButton size="big" content="Sign in" onClick={onAuthenticate} />
        <BottomText>
          {mode === 'login' ? (
            <>
              Don't have an account? <TextLink href="/register/venue">Sign up</TextLink>
            </>
          ) : (
            <>
              Have an account? <TextLink href="/login">Sign in</TextLink>{' '}
            </>
          )}
        </BottomText>
      </Card>
    </Canvas>
  );
};

export default Auth;
