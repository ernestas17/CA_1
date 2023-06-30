import { useState, ChangeEvent, useEffect } from 'react';
import { StyledInputWrapper, StyledInput } from './style';

type InputType = 'number' | 'checkbox' | 'date' | 'radio';

interface IInputProps {
  type: InputType;
  value: any;
  onChange: (value: any) => void;
}

const Input = () => {};

export default Input;
