import TocIcon from "@mui/icons-material/Toc";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box } from "@mui/material";
import { useState } from "react";

const ViewComponent = ({ tocIcon, dashboardIcon, choice }) => {
  const [currentView, setCurrentView] = useState(choice);

  const changeView = () => {
    let view;
    if (view) setCurrentView(view);
  };
  return;
  <Box>
    <TocIcon onClick={changeView} />
    <DashboardIcon onClick={changeView} />
  </Box>;
};
