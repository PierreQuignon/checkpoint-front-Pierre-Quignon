import { gql } from "@apollo/client";

export const mutationCountry = gql`
  mutation AdCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      name
      emoji
    }
  }
`;
