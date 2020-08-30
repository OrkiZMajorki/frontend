import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Canvas = styled.div`
  display: block;

  ${({ skin }) =>
    skin === 'natural' &&
    css`
      display: inline-block;
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

const Field = styled.select`
  width: 100%;
  min-width: 0;
  outline: 0;
  margin: 0;
  appearance: none;
  padding: 12px;
  display: inline-block;
  border-radius: 4px;
  background: transparent;
  border: 1px solid ${(props) => props.theme.silverDark};
  height: 40px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  line-height: inherit;

  &::placeholder {
    color: ${(props) => props.theme.greyLight};
  }
`;

const NaturalField = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 12px;
`;

const Trigger = styled.div`
  line-height: inherit;
  display: inline-block;
  color: ${(props) => props.theme.roseDark};
  cursor: pointer;
  line-height: 72px;
  border-bottom: 2px solid ${(props) => props.theme.roseDark};
`;

const Options = styled.ul`
  position: absolute;
  list-style-type: none;
  padding: 0;
  margin: 8px 0;
  background: ${(props) => props.theme.silverDark};
  left: -20px;
  top: 50%;
  font-size: 40px;
  line-height: 56px;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-40%) scale(0.9);
  z-index: 2;
  transition: visibility 0s 0.3s, opacity 0.3s, transform 0.3s;

  ${({ open }) =>
    open &&
    css`
      visibility: visible;
      opacity: 1;
      transform: translateY(-50%) scale(1);
      transition: visibility 0s 0s, opacity 0.3s, transform 0.3s;
    `}
`;

const Option = styled.li`
  color: #fff;
  position: relative;
  padding: 0 60px 0 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  ${({ selected }) =>
    selected &&
    css`
      background: rgba(0, 0, 0, 0.05);
      color: ${(props) => props.theme.roseDark};
    `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
  visibility: hidden;
  transition: visibility 0s 0.3s, opacity 0.3s;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      -webkit-transition-delay: 0s;
      -moz-transition-delay: 0s;
      transition-delay: 0s;
    `}
`;

const Dropdown = ({ skin, className, value, onChange, title, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <Canvas className={className} skin={skin}>
      {title && skin !== 'natural' && <Title>{title}</Title>}
      {skin !== 'natural' && (
        <Field skin={skin} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      )}
      {skin === 'natural' && (
        <NaturalField>
          <Trigger onClick={() => setOpen(!open)}>
            {value ? options.find((el) => el.value === value).label : '...'}
          </Trigger>
          <Options open={open}>
            {options.map((option) => (
              <Option
                key={option.id}
                selected={option.value === value}
                onChange={onChange}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </Option>
            ))}
          </Options>
        </NaturalField>
      )}
      <Overlay open={open} onClick={() => setOpen(false)} />
    </Canvas>
  );
};

export default Dropdown;
