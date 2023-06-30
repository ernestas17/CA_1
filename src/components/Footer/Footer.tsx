import { StyledFooter, StyledFooterText } from './styles';

export interface IFooterProps {
    breakpoint: string;
}

const layoutHeightBreakpoint = '768px';

const Footer = () => {
    return (
        <StyledFooter breakpoint={layoutHeightBreakpoint}>
            <StyledFooterText>© 2023 Visos teisės saugomos </StyledFooterText>
        </StyledFooter>
    );
};

export default Footer;
