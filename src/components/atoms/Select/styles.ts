import styled from 'styled-components';
import { IOptionProps } from './Select';

export const StyledSelect = styled.select<IOptionProps>`
    padding: 10px;
    border-radius: 3px;
    border: none;
    outline: none;
    background-color: ${(props) => (props.theme.background ? props.theme.background : 'initial')};
    color: ${(props) => (props.theme.color ? props.theme.color : 'initial')};
    transition: 0.2s;
    cursor: pointer;
    font-size: 14px;
    width: 100%;

    &:hover {
        background-color: ${(props) => (props.theme.hovercolor ? props.theme.hovercolor : 'initial')};
    }

    option {
        background-color: ${(props) => (props.theme.hovercolor ? props.theme.hovercolor : 'initial')};
        color: ${(props) => (props.theme.color ? props.theme.color : 'initial')};
        transition: 0.2s;
    }
    option:hover {
        background-color: ${(props) => (props.theme.background ? props.theme.background : 'initial')};
    }
`;
