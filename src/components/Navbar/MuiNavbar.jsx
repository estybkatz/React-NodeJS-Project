import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import NavArrayComponent from "./NavArrayComponent";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import { authActions } from "../../store/auth";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AvatarComponent from "./AvatarComponent";

// access to all
const pages = [
  {
    label: <img width={50} src="/assets/images/atom.png" alt="logo" />,
    url: ROUTES.HOME,
  },
];

//not logged in users
const notAuthPages = [
  { label: "ABOUT", url: ROUTES.ABOUT },
  {
    label: "SIGNUP",
    url: ROUTES.REGISTER,
  },
  {
    label: "LOGIN",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  { label: "ABOUT", url: ROUTES.ABOUT },

  { label: "FAV CARDS", url: ROUTES.FAV },
];

//admin/biz pages
const BizPages = [
  {
    label: "MY CARDS",
    url: ROUTES.MYCARDS,
  },
];

const AdminPages = [{ label: "SANDBOX", url: ROUTES.SANDBOX }];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavArrayComponent linkArray={pages} />
            <NavArrayComponent
              linkArray={isLoggedIn ? authedPages : notAuthPages}
            />
            {isLoggedIn && payload.biz ? (
              <NavArrayComponent linkArray={BizPages} />
            ) : (
              ""
            )}
            {isLoggedIn && payload.isAdmin ? (
              <NavArrayComponent linkArray={AdminPages} />
            ) : (
              ""
            )}
          </Box>

          <Box>
            <SearchPartial />
          </Box>
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            {isDarkTheme ? (
              <WbSunnyIcon checked={isDarkTheme} onClick={changeTheme} />
            ) : (
              <DarkModeIcon onClick={changeTheme} />
            )}
          </Box>
          {isLoggedIn ? <AvatarComponent logoutClick={logoutClick} /> : ""}

          {/*hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavArrayComponent linkArray={pages} isMenu={true} />
              <NavArrayComponent
                linkArray={isLoggedIn ? authedPages : notAuthPages}
                isMenu={true}
                logoutClick={logoutClick}
                onClick={handleCloseNavMenu}
              />
              <NavArrayComponent
                linkArray={isLoggedIn && payload.biz ? BizPages : []}
                isMenu={true}
                onClick={handleCloseNavMenu}
              />
              <NavArrayComponent
                linkArray={isLoggedIn && payload.isAdmin ? AdminPages : []}
                isMenu={true}
                onClick={handleCloseNavMenu}
              />
              {/* {isLoggedIn ? <AvatarComponent logoutClick={logoutClick} /> : ""} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MuiNavbar;
