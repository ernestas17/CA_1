<<<<<<< HEAD
import { IColorTheme } from '../../../shared/color_themes';
import { StyledInput } from './style';
import { ChangeEventHandler, MutableRefObject } from 'react';

export interface IInputProps {
    type: 'number' | 'checkbox' | 'date' | 'radio' | 'text';
    changeEvent?: ChangeEventHandler<HTMLInputElement>;
    identifier?: string;
    innerRef?: MutableRefObject<HTMLInputElement> | MutableRefObject<undefined>;
    data?: IData;
    min?: string;
    max?: string;
    value?: string | number;
    disabled?: boolean;
    theme?: IColorTheme;
}

interface IData {
    [key: string]: string;
}

const Input = ({ type, changeEvent, identifier, innerRef, data, min, max, value, disabled, theme }: IInputProps) => {
    return (
        <StyledInput
            {...data}
            disabled={disabled}
            value={value}
            min={min}
            max={max}
            ref={innerRef}
            className={identifier}
            id={identifier}
            name={identifier}
            onChange={changeEvent}
            type={type}
            theme={theme}
        />
    );
};
=======
import { useState, ChangeEvent, useEffect } from 'react';
import { StyledInputWrapper, StyledInput } from './style';

type InputType = 'number' | 'checkbox' | 'date' | 'radio';

interface IInputProps {
  type: InputType;
  value: any;
  onChange: (value: any) => void;
}

const Input = () => {};
>>>>>>> eb89a74 (test)

export default Input;
