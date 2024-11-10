import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { GET_BUILDINGS } from "../graphql/buildingQueries";
import BuildingsListTable from "./BuildingsListTable";

// and a edit button that will redirect to the building edit page (maybe add a delete button too)
// create building button
const BuildingsList = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_BUILDINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Buildings</Typography>
        <Tooltip title="Create a new building">
          <IconButton
            color="primary"
            aria-label="create building"
            onClick={() => router.push("/buildings/create")}
          >
            <AddCircle sx={{ fontSize: 36 }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <BuildingsListTable buildings={data?.buildings} />
    </Box>
  );
};

export default BuildingsList;
