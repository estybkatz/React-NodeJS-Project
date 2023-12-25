import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

//import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { CheckBox } from "@mui/icons-material";
const WorkerPrivtePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [workerData, setWorkerData] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [taskDataToUpdate, setTaskDataToUpdate] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */

    axios
      .get("auth/users/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setWorkerData(data);
      })

      .catch((err) => {
        toast.error("Oops");
      });
  }, []);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */

    axios
      .get("auth/users/usercard/" + id)

      .then(({ data }) => {
        console.log(data);
        // let newData = {
        //   ...data,
        // };
        // //   filterFunc(data);
        // delete newData._id;
        // delete newData.__v;

        setTaskData(data);

        // console.log("newData", newData);
      })
      .catch((err) => {
        console.log(id);
        toast.error("Oops2");
      });
  }, []);
  // console.log(taskData);

  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
    "status",
  ];
  const handleDoneChange1 = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(taskData));
    console.log("nnn", newInputState);

    newInputState["done"] = ev.target.checked;

    setTaskData(newInputState);
    //console.log("newInputState", newInputState);
  };

  const handleDoneChange2 = (taskId, newDoneValue) => {
    setTaskData((prevTaskData) => {
      // Create a new array with updated tasks
      const updatedTasks = prevTaskData.map((task) => {
        if (task._id === taskId) {
          // Update the "done" property for the specific task
          return { ...task, done: newDoneValue };
        }
        return task;
      });

      return updatedTasks;
    });
  };
  const handleDoneChange = (id) => {
    // Find the index of the task with the specified id
    // Find the index of the task with the specified id
    const taskIndex = taskData.findIndex((task) => task._id === id);

    // If the task is found, update it
    if (taskIndex !== -1) {
      setTaskData((prevTaskData) => {
        // Create a shallow copy of the array
        const updatedTaskArray = [...prevTaskData];

        // Create a shallow copy of the task object
        const updatedTask = { ...updatedTaskArray[taskIndex] };

        // Update the 'done' property
        updatedTask.done = !updatedTask.done;

        // Update the task in the array
        updatedTaskArray[taskIndex] = updatedTask;

        console.log(updatedTaskArray);

        // Return the new array
        setTaskData(updatedTaskArray);
        return updatedTaskArray;
      });
    }
    // // Extract the checked value from the event
    // // if (event && event.target) {
    // //   const isChecked = event.target.checked;
    // //   // Assuming `item` is your task data
    // //   // Create a new object with the updated done property
    // const taskIndex = taskData.findIndex((task) => task.id === id);
    // let newInputState = JSON.parse(JSON.stringify(taskData));
    // console.log(newInputState);
    // const updatedTaskData = { ...newInputState, id: id };
    // updatedTaskData.done = !updatedTaskData.done;
    // console.log(updatedTaskData);
    // setTaskData([...taskData, updatedTaskData]);
    // //   console.log(prevTaskData);
    // //   prevTaskData["done"] = event.target.checked;
    // //   //const updatedTaskData = { ...prevTaskData, done: isChecked };
    // //   setTaskData(...taskData, prevTaskData);
    // //   // Update the state with the new object
    // //   //return updatedTaskData;
    // // }
  };
  const handleSendData = async (id, item) => {
    try {
      console.log("taskData111", taskData);
      await axios.put("cards/tasks/toupdate/" + id, item);

      toast.success("The update task writed");
      // navigate(ROUTES.HOME);
    } catch {
      toast.error("update task was not done");

      // const taskDataJson = JSON.stringify({ taskData });
      // setTaskData(taskDataJson);
    }
  };
  if (!workerData) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Card square raised>
        <CardHeader
          title={workerData.firstName}
          subheader={workerData.lastName}
          //   onClick={handleInfoBtnClick}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + workerData.phone}</Typography>
          <Typography>{"Address: " + workerData.address}</Typography>
          <Typography>{"Card Number: " + workerData.cardNumber}</Typography>
          <Typography variant="body1" color="white">
            {"Email: " + workerData.email}
          </Typography>
          {/* <Typography variant="body1" color="white">
            {"ReceptionDateAtTheOffice: " + workerData.ReceptionDateAtTheOffice}
          </Typography>
          <Typography variant="body1" color="white">
            {"clubMember: " + workerData.clubMember}
          </Typography>
          <Typography variant="body1" color="white">
            {"BusinessDescription: " + workerData.BusinessDescription}
          </Typography> */}
          <hr />
          <h2>Tasks for the worker</h2>
          <Button onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Button>
          <Box>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell key={item + "Row" + Date.now()}>
                      <Typography>{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {taskData.map((item) => (
                // <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                <TableBody>
                  <TableRow>
                    <TableCell key={item.customerID + Date.now()}>
                      {item.customerID}
                    </TableCell>
                    <TableCell key={item.task + Date.now()}>
                      {item.task}
                    </TableCell>
                    <TableCell key={item.dateOpened + Date.now()}>
                      {item.dateOpened}
                    </TableCell>
                    <TableCell key={item.lastDateToDo + Date.now()}>
                      {item.lastDateToDo}
                    </TableCell>
                    <TableCell key={item.workerToDo + Date.now()}>
                      {item.workerToDo}
                    </TableCell>

                    <TableCell key={item.done + Date.now()}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            key={Date.now}
                            id="done"
                            value={item.done}
                            checked={item.done}
                            color="primary"
                            onClick={() => handleDoneChange(item._id)}
                          />
                        }
                        label="done"
                      />
                    </TableCell>
                    <TableCell key={item._id + Date.now()}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1, mb: 1 }}
                        color="primary"
                        onClick={() => handleSendData(item._id, item)}
                        // href={ROUTES.HOME}
                      >
                        Updating
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
                // </Grid>
              ))}
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default WorkerPrivtePage;
