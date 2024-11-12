import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
import { IBuilding } from "@/types/IBuilding";

const BuildingHeader = ({ building }: { building: IBuilding }) => {
  const router = useRouter();
  const { name, currentTemperature, temperatureScale, address } = building;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5">
          {name} ({currentTemperature}°{temperatureScale})
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {address}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/buildings")}
      >
        Home
      </Button>
    </Box>
  );
};

export default BuildingHeader;
