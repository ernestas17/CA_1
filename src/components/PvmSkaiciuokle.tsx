// import {
//   StyledMain,
//   StyledSection,
//   StyledSectionHeadingWrapper,
//   StyledSectionContent,
// } from "./Pages/styles";

import {
  StyledMain,
  StyledSection,
  StyledSectionHeadingWrapper,
  StyledSectionContent,
} from "./organisms/PVMSkaiciuokle/styles";

import PVMSkaiciuokleOrganism from "./organisms/PVMSkaiciuokle/PVMSkaiciuokleOrganism";
import { IPageProps } from "./Pages/types";

const PvmSkaiciuokle = ({
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
          <PVMSkaiciuokleOrganism theme={theme} />
        </StyledSectionContent>
      </StyledSection>
    </StyledMain>
  );
};

export default PvmSkaiciuokle;
