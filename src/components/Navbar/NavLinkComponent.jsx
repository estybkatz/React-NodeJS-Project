import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ROUTES from "../../routes/ROUTES";

const NavLinkComponent = ({ url, label, logoutClick, onClick, ...rest }) => {
  return url !== ROUTES.LOGOUT ? (
    <NavLink to={url} {...rest} onClick={onClick}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          color={isActive ? "warning.main" : "text.primary"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  ) : (
    <NavLink to={url} onClick={logoutClick}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          color={isActive ? "warning.main" : "text.primary"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
