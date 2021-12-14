import styled from "styled-components";
export const StyledWrapper = styled.main`
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-flow: column;
  background-color: ${(props) => props.theme.colors.bgPrimary};
  transition: background-color 0.4s ease-in-out;

  @media (min-weight: 1024px) {
    flex-grow: row;
  } ;
`;
