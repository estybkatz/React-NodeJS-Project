import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CachedIcon from "@mui/icons-material/Cached";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { sizing } from "@mui/system";

import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLoggedIn from "../hooks/useLoggedIn";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  let joiResponse = validateLoginSchema(inputState);

  const resetForm = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      email: "",
      password: "",
    };
    setInputState(newInputState);
    joiResponse = validateLoginSchema(newInputState);
    if (!joiResponse) {
      return;
    }

    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
    });
    setInputsErrorsState(newjoiResponse);
  };
  const handleBtnClick = async (ev) => {
    try {
      joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      //move to homepage
      navigate(ROUTES.HOME);
    } catch {
      toast.error(
        "User does not exist in the system, Or there is a problem connecting "
      );
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateLoginSchema(newInputState);
    setInputsErrorsState(joiResponse);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
                onClick={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState["email"] && (
                <Alert severity="warning">
                  {inputsErrorsState["email"].map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                value={inputState.password}
                onChange={handleInputChange}
                onClick={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState["password"] && (
                <Alert severity="warning">
                  {inputsErrorsState["password"].map((item) => (
                    <div key={"password-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                href={ROUTES.HOME}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={resetForm}
                endIcon={<CachedIcon />}
              ></Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                {...(!joiResponse ? { disabled: false } : { disabled: true })}
                onClick={handleBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
