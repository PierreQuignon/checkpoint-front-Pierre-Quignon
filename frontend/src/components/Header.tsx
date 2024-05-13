import { Stack } from "@mui/material";
import styled from "styled-components";

const StyledTitle = styled.h2`
  color: white;
`;

const StyledText = styled.p`
  color: white;
`;

const StyledHeader = styled(Stack)`
  background-color: rgb(247, 20, 107);
`;

export default function Header() {
  return (
    <StyledHeader
      width="100%"
      height="30%"
      justifyContent="center"
      alignItems="center"
    >
      <StyledTitle>Checkpoint: frontend</StyledTitle>
      <StyledText>Countries</StyledText>
    </StyledHeader>
  );
}
