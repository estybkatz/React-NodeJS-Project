import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateCreateSchema from "../validation/createValidation";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import CreateEditComponent from "../components/CreateAndEditComponent";

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({
    url: "",
    alt: "",
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  });
  let joiResponse = validateCreateSchema(inputState);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateCreateSchema(inputState);

      setInputsErrorsState(joiResponse);

      if (!joiResponse) {
        //move to homepage
        await axios.post("/cards/", inputState);
        toast.success("A new business card has been created");
        navigate(-1);
      }
    } catch {
      toast.error("errrrrrror Your new card didn't saved");
    }
  };

  const handleCancelBtnClick = (ev) => {
    //move to homepage
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);

    joiResponse = validateCreateSchema(newInputState);
    setInputsErrorsState(joiResponse);
  };

  const resetForm = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      url: "",
      alt: "",
      title: "",
      subTitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
    };

    setInputState(newInputState);

    joiResponse = validateCreateSchema(inputState);
    if (!joiResponse) {
      return;
    }

    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
    });
    setInputsErrorsState(newjoiResponse);
  };
  const keys = Object.keys(inputState);
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create card
        </Typography>
        <Typography component="h2" variant="h5">
          Here you can create a new cards
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={
            inputState.url
              ? inputState.url
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <CreateEditComponent
                key={item}
                item={item}
                inputState={inputState}
                handleInputChange={handleInputChange}
                inputsErrorsState={inputsErrorsState}
              />
            ))}
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
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={handleCancelBtnClick}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={handleSaveBtnClick}
                {...(!joiResponse ? { disabled: false } : { disabled: true })}
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

export default CreateCardPage;
