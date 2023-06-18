import { Fragment } from "react";
import NavLinkComponent from "./NavLinkComponent";
import MenuItem from "@mui/material/MenuItem";
const NavArrayComponent = ({
  linkArray = [],
  logoutClick,
  onClick,
  isMenu = false,
}) => {
  return (
    <Fragment>
      {isMenu
        ? linkArray.map((page) => (
            <MenuItem key={page.url}>
              <NavLinkComponent
                key={page.url}
                {...page}
                logoutClick={logoutClick}
                onClick={onClick}
              />
            </MenuItem>
          ))
        : linkArray.map((page) => (
            <NavLinkComponent
              key={page.url}
              {...page}
              onClick={onClick}
              logoutClick={logoutClick}
            />
          ))}
    </Fragment>
  );
};
export default NavArrayComponent;
