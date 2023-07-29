import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateTaskSchema from "../validation/taskValidation";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import RegisterComponent from "../components/RegisterComponent";
import TaskComponent from "../components/TaskComponennt";
import Modal from "react-modal";
import { DatePicker } from "@mui/lab";

import { TextField } from "@mui/material";
import useQueryParams from "../hooks/useQueryParams";
const TasksPage = () => {
  let qparams = useQueryParams();
  const { id } = useParams();
  function generateTimestamp() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const timestamp = generateTimestamp();
  const [inputState, setInputState] = useState({
    task: "",
    workerToDo: "",
    dateOpened: "",
    lastDateToDo: "",
    done: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  let joiResponse = validateTaskSchema(inputState);
  const [inputsErrorState, setinputsErrorState] = useState(null);
  const navigate = useNavigate();
  const handeleBtnClick = async () => {
    try {
      joiResponse = validateTaskSchema(inputState);
      if (joiResponse) {
        return;
      }

      await axios.post("cards/tasks/" + id, {
        task: inputState.task,
        workerToDo: inputState.workerToDo,
        dateOpened: inputState.dateOpened,
        lastDateToDo: inputState.lastDateToDo,
        done: inputState.done,
      });
      toast.success("The task whrited");
      navigate(ROUTES.HOME);
    } catch {
      toast.error("registered task was not done");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateTaskSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  const handleDoneChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["done"] = ev.target.checked;
    setInputState(newInputState);
  };
  //   const resetForm = () => {
  //     let newInputState = JSON.parse(JSON.stringify(inputState));
  //     newInputState = {
  //       name: {
  //         firstName: inputState.firstName,
  //         middleName: inputState.middleName,
  //         lastName: inputState.lastName,
  //       },
  //       phone: inputState.phone,
  //       email: inputState.email,
  //       password: inputState.password,
  //       image: {
  //         url: inputState.imageUrl,
  //         alt: inputState.imageAlt,
  //       },
  //       state: inputState.state,
  //       address: {
  //         country: inputState.country,
  //         city: inputState.city,
  //         street: inputState.street,
  //         houseNumber: inputState.houseNumber,
  //         zip: inputState.zip,
  //       },
  //       isBusiness: inputState.biz,
  //     };
  //     setInputState(newInputState);
  //     joiResponse = validateRegisterSchema(newInputState);
  //     if (!joiResponse) {
  //       return;
  //     }
  //     let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
  //     Object.keys(newjoiResponse).forEach((index) => {
  //       newjoiResponse[index] = "";
  //     });
  //     setinputsErrorState(newjoiResponse);
  //   };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(inputState);
  const keys = Object.keys(inputState);
  console.log(keys);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create new Task
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <TaskComponent
                id={item}
                item={item}
                label={item}
                inputState={inputState}
                onChange={handleInputChange}
                inputsErrorState={inputsErrorState}
                key={item}
              />
            ))}

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="done"
                    value={inputState.done}
                    color="primary"
                    onClick={handleDoneChange}
                  />
                }
                label="Signup as business."
              />
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

            {/* <Grid item xs={12} sm={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={resetForm}
                endIcon={<CachedIcon />}
              ></Button>
            </Grid> */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                {...(!joiResponse ? { disabled: false } : { disabled: true })}
                onClick={handeleBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default TasksPage;
