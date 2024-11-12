import React from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";

const BuildingActionsButtons = ({
  id,
  loading,
}: {
  id: number | undefined;
  loading: boolean;
}) => {
  const router = useRouter();

  const handleOnClickCancelButton = () => {
    if (id) {
      router.push(`/buildings/${id}`);
    } else {
      router.push(`/buildings`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        marginTop: 4,
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      <Button
        aria-label="save building"
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ width: "fit-content", alignSelf: "end" }}
      >
        {loading ? "Submitting..." : "Save"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOnClickCancelButton}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default BuildingActionsButtons;
