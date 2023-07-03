import styled from 'styled-components';
import { ILabelProps } from './Label';

export const StyledLabel = styled.label<ILabelProps>`
    /* border: 1px solid ${(props) => (props.theme ? props.theme.background : 'initial')}; */
    color: ${(props) => (props.theme ? props.theme.background : 'initial')};
    font-size: ${(props) => (props.size ? props.size : 'initial')};
    line-height: 2em;
    font-weight: ${(props) => (props.weight ? props.weight : 'initial')};
`;
