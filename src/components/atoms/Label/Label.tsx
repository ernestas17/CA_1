import { IColorTheme } from '../../../shared/color_themes';
import { StyledLabel } from './style';

export interface ILabelProps {
    theme?: IColorTheme;
    targetinput?: string;
    size?: string;
    weight?: string;
    children?: string;
}

const Label = ({ theme, children, targetinput, size, weight }: ILabelProps) => {
    return (
        <StyledLabel weight={weight} size={size} htmlFor={targetinput} theme={theme}>
            {children}
        </StyledLabel>
    );
};

export default Label;
