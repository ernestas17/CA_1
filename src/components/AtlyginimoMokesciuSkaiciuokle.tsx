import {
  StyledMain,
  StyledSection,
  StyledSectionHeadingWrapper,
  StyledSectionContent,
} from "./Pages/styles";
import AtlyginimoIrMokesciuSkaiciuokleOrganism from "./organisms/AtlyginimoIrMokesciuSkaiciuokle/AtlyginimoIrMokesciuSkaiciuokleOrganism";
import { IPageProps } from "./Pages/types";

const AtlyginimoMokesciuSkaiciuokle = ({
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
          <AtlyginimoIrMokesciuSkaiciuokleOrganism theme={theme} />
        </StyledSectionContent>
      </StyledSection>
    </StyledMain>
  );
};

export default AtlyginimoMokesciuSkaiciuokle;
