import styled from 'styled-components';

export const StyledDivider = styled.div`
  height: 1px;
  background-color: #485fc730;
  margin: 20px 0 20px 0;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;

  h1 {
    font-size: 19px;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 50px;
  }
`;

export const StyledIputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  
  h1 {
    @media (min-width: 1160px) {
      margin-top: 0px;

    }
   
 
`;
export const StyledRadiosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;

  div {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
  }
  input {
    width: fit-content;
    margin-right: 15px;
  }
`;

export const StyledCheckbox = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  margin-top: 10px;

  input {
    width: fit-content;
    margin-right: 15px;
  }
`;
export const StyledOutputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
