import { Box, Stack } from "@mui/material";
import styled from "styled-components";

export interface ICountry {
  id: number;
  name: string;
  emoji: string;
  code: string;
}

export default function CountryCard(props: ICountry) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="3rem"
      height="3rem"
    >
      <Box>{props.emoji}</Box>
      <Box>{props.name}</Box>
    </Stack>
  );
}
