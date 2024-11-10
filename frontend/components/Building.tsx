import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { GET_BUILDING } from "@/graphql/buildingQueries";
import { IBuilding } from "@/types/IBuilding";
import TemperatureRecordsTable from "./TemperatureRecordsTable";
import BuildingHeader from "./BuildingHeader";

const Building = ({ id }: { id: number }) => {
  const { data, loading, error } = useQuery(GET_BUILDING, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const building: IBuilding = data.building;

  return (
    <Box sx={{ padding: 10 }}>
      <BuildingHeader building={building} />
      <TemperatureRecordsTable building={building} />
    </Box>
  );
};

export default Building;
