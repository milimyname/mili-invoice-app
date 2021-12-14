import styled from "styled-components";
import { defaultInput } from "../Form/StyledForm";
import { buttonDefault } from "../../shared/button/StyledButton";

export const CustomPicker = styled.button`
  ${buttonDefault}
  ${defaultInput}
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
