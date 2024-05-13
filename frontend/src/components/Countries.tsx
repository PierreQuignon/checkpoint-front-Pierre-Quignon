import { queryCountries } from "@/graphql/queryCountries";
import { useQuery, useMutation } from "@apollo/client";
import { Stack, TextField, Button, Grid } from "@mui/material";
import CountryCard, { ICountry } from "./CountryCard";
import Link from "next/link";
import { useState } from "react";
import { mutationCountry } from "@/graphql/mutationCountry";
import styled from "styled-components";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const StyledAddButton = styled(Button)`
  &.MuiButtonBase-root {
    background-color: rgb(247, 20, 107);
    color: white;
  }
`;

export default function Countries() {
  const { data, loading, error } = useQuery<{ countries: ICountry[] }>(
    queryCountries,
    {
      variables: {},
    }
  );

  const countries = data ? data.countries : [];
  console.log(countries);

  const [formState, setFormState] = useState({
    code: "",
    name: "",
    emoji: "",
  });

  const [addCountry, { loading: mutationLoading, error: mutationError }] =
    useMutation(mutationCountry, {
      refetchQueries: [{ query: queryCountries }],
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addCountry({ variables: { data: formState } });
      setFormState({ code: "", name: "", emoji: "" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack alignItems="center">
      <Grid
        container
        justifyContent="center"
        component="form"
        flexDirection="row"
        onSubmit={handleSubmit}
        gap="2rem"
        borderRadius="4px"
        padding="2rem"
        margin="2rem"
      >
        <Grid item>
          <TextField
            name="code"
            label="Code"
            value={formState.code}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="emoji"
            label="Emoji"
            value={formState.emoji}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item>
          <StyledAddButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutationLoading}
          >
            Add
          </StyledAddButton>
        </Grid>
        {mutationError && <p>Error adding country: {mutationError.message}</p>}
      </Grid>
      <Stack
        maxWidth="200rem"
        minHeight="100rem"
        flexDirection="row"
        gap="2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          maxWidth="200rem"
          minHeight="100rem"
          flexDirection="row"
          gap="2rem"
          justifyContent="center"
          flexWrap="wrap"
        >
          {countries &&
            countries.map((c: ICountry) => (
              <Stack key={c.id}>
                <Link href={`/countries/${c.code}`} passHref>
                  <CountryCard
                    id={c.id}
                    name={c.name}
                    emoji={c.emoji}
                    code={c.code}
                  />
                </Link>
              </Stack>
            ))}
          {loading && <p>Chargement des pays</p>}
          {error && <p>Erreur lors du chargement des pays</p>}
        </Stack>
      </Stack>
    </Stack>
  );
}
