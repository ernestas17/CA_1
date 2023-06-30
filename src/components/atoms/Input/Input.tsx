import { StyledInputWrapper, StyledInput } from './style';
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
}

interface IData {
    [key: string]: string;
}

const Input = ({ type, changeEvent, identifier, innerRef, data, min, max, value, disabled }: IInputProps) => {
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
        />
    );
};

export default Input;
