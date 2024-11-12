import { Box, CircularProgress, Typography } from "@mui/material";

export const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

export const Error = ({ message }: { message: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Typography variant="h6" color="error">
      Error: {message}
    </Typography>
  </Box>
);

export const NoDataFound = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Typography variant="h6" color="error">
      No data found.
    </Typography>
  </Box>
);
