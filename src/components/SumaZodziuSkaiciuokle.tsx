import { StyledMain, StyledSection, StyledSectionHeadingWrapper, StyledSectionContent } from './Pages/styles';
import { IPageProps } from './Pages/types';

const SumaZodziuSkaiciuokle = ({ headingText, theme }: IPageProps) => {
    return (
        <StyledMain>
            <StyledSection>
                <StyledSectionHeadingWrapper theme={theme}>
                    <h3>{headingText}</h3>
                </StyledSectionHeadingWrapper>

                <StyledSectionContent theme={theme}></StyledSectionContent>
            </StyledSection>
        </StyledMain>
    );
};

export default SumaZodziuSkaiciuokle;
