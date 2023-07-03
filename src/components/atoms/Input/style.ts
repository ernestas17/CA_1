import styled from 'styled-components';
import { IInputProps } from './Input';

<<<<<<< HEAD
export const StyledInput = styled.input<IInputProps>`
    padding: 10px;
    border-radius: 3px;
    box-shadow: none;
    outline: none;
    border: 1px solid ${(props) => (props.theme ? props.theme.background : 'initial')};
    font-size: 14px;
    width: 100%;
`;
=======
export const StyledInputWrapper = styled.form`
hight: 100px
border-color: red`;

export const StyledInput = styled.input``;
>>>>>>> eb89a74 (test)
