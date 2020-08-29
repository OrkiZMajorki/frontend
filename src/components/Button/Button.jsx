import React from 'react';
import styled, { css } from 'styled-components';
import { blendColors } from '../../helpers/colorHelpers';

const ButtonCanvas = styled.button`
  display: inline-block;
  position: relative;
  color: ${(props) => props.theme.white};
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 600;
  user-select: none;
  text-transform: uppercase;
  border-radius: 18px;
  height: 36px;
  padding: 0 24px;
  font-size: 12px;
  transition: background-color 0.2s;

  margin: 24px;

  ${({ background, theme }) =>
    background === 'highlight' &&
    css`
      background-color: ${(props) => props.theme.amaranth};

      &:hover {
        background: ${blendColors(theme.amaranth, '#FFFFFF', 0.2)};
      }

      &:active {
        background: ${blendColors(theme.amaranth, '#000000', 0.2)};
      }
    `}
`;

const Button = ({ className, content, onClick, type = 'button', background = 'highlight' }) => {
  return (
    <ButtonCanvas className={className} onClick={onClick} type={type} background={background}>
      {content}
    </ButtonCanvas>
  );
};

export default Button;
