import { useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { GET_BUILDINGS } from "../graphql/buildingQueries";
import BuildingsListTable from "./BuildingsListTable";

// and a edit button that will redirect to the building edit page (maybe add a delete button too)
// create building button
const BuildingsList = () => {
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
      <Typography variant="h5">Buildings</Typography>
      <BuildingsListTable buildings={data?.buildings} />
    </Box>
  );
};

export default BuildingsList;
