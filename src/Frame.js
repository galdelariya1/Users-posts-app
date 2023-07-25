import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const Frame = () => {
  return (
    <>
      <Typography sx={{ m: 4 }} variant="h2">
        Users And Posts App
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Frame;
