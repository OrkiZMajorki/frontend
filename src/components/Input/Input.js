import React from 'react';
import styled from 'styled-components';

const Canvas = styled.div``;

const Field = styled.input`
  outline: 0;
  width: 100%;
  min-width: 0;
  margin: 0;
  appearance: none;
  padding: 12px;
  display: inline-block;
  border-radius: 4px;
  background: ${(props) => props.theme.white};
  height: 40px;
  border: 1px solid ${(props) => props.theme.silverDark};
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  line-height: inherit;

  &::placeholder {
    color: ${(props) => props.theme.greyLight};
  }
`;

const Title = styled.label`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  padding-left: 0;
  color: ${(props) => props.theme.grey};
`;

const Input = ({ type = 'text', skin = 'regular', className, value, onChange, title, placeholder }) => {
  return (
    <Canvas className={className}>
      {title && skin !== 'natural' && <Title>{title}</Title>}
      <Field skin={skin} type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </Canvas>
  );
};

export default Input;
