import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";

import { CircularProgress } from "@mui/material";

import InformationComponent from "../components/MoreinformationComponent";
import { toast } from "react-toastify";

const MoreInformationPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.__v;

        let dataArr = Object.keys(data);
        dataArr.forEach((item) => {
          if (dataArr[item] === "") {
            delete inputState[item];
          }
        });

        setInputState(newInputState);
      } catch {
        toast.error(
          "There was a problem retrieving the data, please try again later"
        );
      }
    })();
  }, [id]);
  const handleCancelBtnClick = (ev) => {
    navigate(-1);
  };
  if (!inputState) {
    return <CircularProgress />;
  }
  let keys = Object.keys(inputState);

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
          <ContactEmergencyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          More Information
        </Typography>
        <Box
          component="img"
          sx={{
            height: 180,
            width: 250,
            maxHeight: { xs: 180, md: 167 },
            maxWidth: { xs: 250, md: 250 },
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
            <Grid item xs={12}>
              {keys.map(
                (item) =>
                  inputState[item] && (
                    <InformationComponent
                      item={item}
                      inputState={inputState}
                      key={item}
                    />
                  )
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Return Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default MoreInformationPage;
