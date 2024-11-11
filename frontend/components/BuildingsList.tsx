import { useRouter } from "next/router";
import { Box, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BuildingsListTable from "./BuildingsListTable";

const BuildingsList = () => {
  const router = useRouter();

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
      <BuildingsListTable />
    </Box>
  );
};

export default BuildingsList;
