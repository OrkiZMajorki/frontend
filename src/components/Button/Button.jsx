import React from 'react';
import styled, { css } from 'styled-components';
import { blendColors } from '../../helpers/colorHelpers';
import TextLink from '../TextLink/TextLink';

const Canvas = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledTextLink = styled(TextLink)`
  display: inline-block;
`;

const ButtonCanvas = styled.button`
  display: inline-block;
  position: relative;
  color: ${(props) => props.theme.white};
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 600;
  user-select: none;
  text-transform: uppercase;
  border-radius: 32px;
  height: 36px;
  padding: 0 24px;
  font-size: 12px;
  width: 100%;
  transition: background-color 0.2s, color 0.2s;

  ${({ size }) =>
    size === 'small' &&
    css`
      height: 36px;
      padding: 0 24px;
      font-size: 12px;
    `}

  ${({ size }) =>
    size === 'big' &&
    css`
      height: 48px;
      padding: 0 48px;
      font-size: 14px;
    `}
        
  ${({ background, theme }) =>
    background === 'highlight' &&
    css`
      background-color: ${(props) => props.theme.roseDark};
      &:hover {
        background: ${blendColors(theme.roseDark, '#FFFFFF', 0.125)};
      }
      &:active {
        background: ${blendColors(theme.roseDark, '#000000', 0.125)};
      }
    `}

  ${({ background, theme }) =>
    background === 'highlight-outline' &&
    css`
      border: 1px solid ${(props) => props.theme.roseDark};
      color: ${(props) => props.theme.roseDark};

      &:hover {
        color: ${(props) => props.theme.white};
        background: ${blendColors(theme.roseDark, '#FFFFFF', 0.125)};
      }
      &:active {
        background: ${blendColors(theme.roseDark, '#000000', 0.125)};
      }
    `}
    
    ${({ background, theme }) =>
    background === 'white-outline' &&
    css`
      border: 1px solid ${(props) => props.theme.white};
      color: ${(props) => props.theme.white};
      background: rgba(255, 255, 255, 0.1);

      &:hover {
        color: ${(props) => props.theme.white};
        background: rgba(255, 255, 255, 0.2);
      }
    `}
`;

const Button = ({
  className,
  content,
  onClick = () => {},
  type = 'button',
  background = 'highlight',
  href,
  size = 'small',
}) => {
  const contentToDisplay = (
    <ButtonCanvas size={size} onClick={onClick} type={type} background={background}>
      {content}
    </ButtonCanvas>
  );

  return (
    <Canvas className={className}>
      {href && <StyledTextLink href={href}>{contentToDisplay}</StyledTextLink>}
      {!href && contentToDisplay}
    </Canvas>
  );
};

export default Button;
