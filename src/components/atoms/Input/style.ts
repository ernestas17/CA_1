import styled from 'styled-components';
import { IInputProps } from './Input';

export const StyledInput = styled.input<IInputProps>`
    padding: 10px;
    border-radius: 3px;
    box-shadow: none;
    outline: none;
    border: 1px solid #485fc7;
    font-size: 14px;
    width: 100%;
`;
