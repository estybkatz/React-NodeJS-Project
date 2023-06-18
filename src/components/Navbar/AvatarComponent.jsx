import { Avatar, IconButton, Menu } from "@mui/material";
import NavArrayComponent from "./NavArrayComponent";
import React from "react";
import ROUTES from "../../routes/ROUTES";

const AvatarComponent = ({ logoutClick }) => {
  const avatarPages = [
    {
      label: "PROFILE",
      url: ROUTES.PROFILE,
    },
    {
      label: "LOGOUT",
      url: ROUTES.LOGOUT,
    },
  ];
  const [anchorAvatar, setAnchorAvatar] = React.useState(null);

  const handleOpenAvatarMenu = (event) => {
    setAnchorAvatar(event.currentTarget);
  };
  const handleCloseNavMenuAvatar = () => {
    setAnchorAvatar(null);
  };
  return (
    <React.Fragment>
      <IconButton size="large" onClick={handleOpenAvatarMenu} color="inherit">
        <Avatar />
      </IconButton>
      <Menu
        anchorEl={anchorAvatar}
        open={Boolean(anchorAvatar)}
        onClose={handleCloseNavMenuAvatar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onBackdropClick={handleCloseNavMenuAvatar}
      >
        {anchorAvatar ? (
          <NavArrayComponent
            linkArray={avatarPages}
            logoutClick={logoutClick}
            onClick={handleCloseNavMenuAvatar}
            isMenu={true}
          />
        ) : (
          ""
        )}
      </Menu>
    </React.Fragment>
  );
};
export default AvatarComponent;
