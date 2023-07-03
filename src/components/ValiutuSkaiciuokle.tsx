import { StyledMain, StyledSection, StyledSectionContent, StyledSectionHeadingWrapper } from './Pages/styles';

import { IPageProps } from './Pages/types';
import ValiutuSkaiciuokleOrganism from './organisms/ValiutuSkaiciuokle';

const ValiutuSkaiciuokle = ({ headingText, theme, layoutbreakpoint }: IPageProps) => {
    return (
        <StyledMain layoutbreakpoint={layoutbreakpoint}>
            <StyledSection>
                <StyledSectionHeadingWrapper theme={theme}>
                    <h3>{headingText}</h3>
                </StyledSectionHeadingWrapper>

                <StyledSectionContent theme={theme}>
                    <ValiutuSkaiciuokleOrganism theme={theme} />
                </StyledSectionContent>
            </StyledSection>
        </StyledMain>
    );
};

export default ValiutuSkaiciuokle;
