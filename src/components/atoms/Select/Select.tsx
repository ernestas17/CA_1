import { IColorTheme } from '../../../shared/color_themes';
import { StyledSelect } from './styles';
import { ChangeEventHandler, MutableRefObject } from 'react';

export interface IOptionProps {
    label?: string | number;
    changeEvent?: ChangeEventHandler<HTMLSelectElement>;
    identifier?: string;
    innerRef?: MutableRefObject<HTMLSelectElement> | MutableRefObject<undefined>;
    data?: IData;
    min?: string;
    max?: string;
    value?: string | number;
    disabled?: boolean;
    children?: JSX.Element | JSX.Element[] | null | undefined | any;
    theme?: IColorTheme;
}

interface IData {
    [key: string]: string;
}

const Select = ({ changeEvent, identifier, children, theme, value }: IOptionProps) => {
    return (
        <StyledSelect defaultValue={value} theme={theme} className={identifier} id={identifier} name={identifier} onChange={changeEvent}>
            {children}
        </StyledSelect>
    );
};

export default Select;
