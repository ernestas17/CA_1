import styled from "styled-components";
import { IPageProps } from "../../Pages/types";

export const StyledMain = styled.main<IPageProps>`
  padding: 35px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: stretch;

  ${(props) => {
    const breakpoint = props.layoutbreakpoint || "1200px";
    return `
      @media (min-width: ${breakpoint}) {
        min-height: 90vh;
        padding: 50px;
      }
    `;
  }}
`;

export const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StyledSectionHeadingWrapper = styled.div`
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.background};
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const StyledSectionContent = styled.div`
  padding: 20px;
  border: 3px solid ${(props) => props.theme.background};
  border-top: none;
  width: 100%;
  padding-bottom: 20px;
  border-radius: 0 0 5px 5px;
  min-height: 39vh;
`;
