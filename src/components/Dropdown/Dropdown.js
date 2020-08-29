import React from 'react';
import styled, { css } from 'styled-components';

const Canvas = styled.div``;

const Field = styled.select`
  width: 100%;
  min-width: 0;
  outline: 0;
  margin: 0;
  appearance: none;
  padding: 12px;
  display: flex;
  border-radius: 4px;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.silverDark};
  margin-top: 8px;
  height: 40px;

  &::placeholder {
    color: ${(props) => props.theme.greyLight};
  }

  ${({ type }) =>
    type === 'natural' &&
    css`
      display: inline-block;
      border: 0;
      width: auto;
      color: ${(props) => props.theme.amaranth};
    `}
`;

const Title = styled.label`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  padding-left: 0;
  color: ${(props) => props.theme.grey};
`;

const Dropdown = ({ type = 'regular', className, value, onChange, title, options }) => {
  return (
    <Canvas className={className}>
      {title && type !== 'natural' && <Title>{title}</Title>}
      <Field type={type} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </Canvas>
  );
};

export default Dropdown;
