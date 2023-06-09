import {
  StyledMain,
  StyledSection,
  StyledSectionHeadingWrapper,
  StyledSectionContent,
} from './Pages/styles';
import { IPageProps } from './Pages/types';
import IndividualiosVeiklosMokesciuSkaiciuokleOrganism from './organisms/IndividualiosVeiklosMokesciuSkaiciuokle';

const IndividualiosVeiklosMokesciuSkaiciuokle = ({
  headingText,
  theme,
  layoutbreakpoint,
}: IPageProps) => {
  return (
    <StyledMain layoutbreakpoint={layoutbreakpoint}>
      <StyledSection>
        <StyledSectionHeadingWrapper theme={theme}>
          <h3>{headingText}</h3>
        </StyledSectionHeadingWrapper>

        <StyledSectionContent theme={theme}>
          <IndividualiosVeiklosMokesciuSkaiciuokleOrganism theme={theme} />
        </StyledSectionContent>
      </StyledSection>
    </StyledMain>
  );
};

export default IndividualiosVeiklosMokesciuSkaiciuokle;
