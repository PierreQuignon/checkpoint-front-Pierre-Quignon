import Header from "@/components/Header";
import { queryCountry } from "@/graphql/queryCountry";
import { useQuery } from "@apollo/client";
import { Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export interface ICountryDetails {
  id: number;
  name: string;
  code: string;
  emoji: string;
  continent: {
    name: string;
  };
}

export default function Country(): React.ReactNode {
  const router = useRouter();
  const countryCode = router.query.id;

  const { data } = useQuery<{ country: ICountryDetails }>(queryCountry, {
    variables: {
      code: countryCode,
    },
    skip: countryCode === undefined,
  });
  const country = data ? data.country : null;

  return (
    <>
      <Header />
      <Stack alignItems="center" justifyContent="center" marginTop="5rem">
        {country ? (
          <>
            <p>{country.emoji}</p>
            <p>
              Name: {country.name} ({country.code})
            </p>
            {country.continent ? (
              <p>Continent: {country.continent.name}</p>
            ) : (
              ""
            )}
          </>
        ) : countryCode ? (
          "Chargement/erreur"
        ) : (
          "Il manque l'id dans l'URL"
        )}
        <Link href={"/"}>Retour à la liste des pays</Link>
      </Stack>
    </>
  );
}
