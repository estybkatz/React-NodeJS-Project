import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
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
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ROUTES from "../routes/ROUTES";
//import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const MyTasksPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  //const [costumerData, setCostumerData] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  //   useEffect(() => {
  //     /*
  //       useEffect cant handle async ()=>{}
  //       this is why we use the old promise way
  //     */

  //     axios
  //       .get("auth/users/" + id)

  //       .then(({ data }) => {
  //         console.log(data);
  //         //   filterFunc(data);
  //         setCostumerData(data);
  //       })

  //       .catch((err) => {
  //         toast.error("Oops");
  //       });
  //   }, []);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */

    axios
      .get("cards/tasks/getmytasks/" + payload._id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setTaskData(data);
        console.log(payload._id);
      })

      .catch((err) => {
        console.log(id);
        toast.error("Oops2");
      });
  }, []);
  console.log(taskData);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards")
      .then((response) => {
        // קבלנו את רשימת העובדים מהשרת
        console.log("response.data!!!", response.data);
        setCustomers(response.data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data", err);
      });
  }, []);
  const columns = [
    "customer name",
    "task",
    "workerToDo",
    "dateOpened",
    "last date to do",
    "status",
  ];

  if (!taskData) {
    return <CircularProgress />;
  }
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
  };
  const getDoneList = () => {
    navigate(ROUTES.MYDONETASK);
  };
  return (
    <Box>
      <Card square raised>
        {/* <CardHeader
          title={costumerData.firstName}
          subheader={costumerData.lastName}
          //   onClick={handleInfoBtnClick}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + costumerData.phone}</Typography>
          <Typography>{"Address: " + costumerData.address}</Typography>
          <Typography>{"Card Number: " + costumerData.cardNumber}</Typography>
          <Typography variant="body1" color="white">
            {"Email: " + costumerData.email}
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

        <h2>My Tasks</h2>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button onClick={getDoneList}>Done Tasks List</Button>
        <Box>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell key={item + Date.now()}>
                    <Typography>{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {customers.map((item2) =>
                      item2._id === item.customerID
                        ? item2.firstName + " " + item2.lastName
                        : null
                    )}
                  </TableCell>
                  <TableCell>{item.task}</TableCell>
                  <TableCell>{item.workerToDo}</TableCell>
                  <TableCell>{item.dateOpened}</TableCell>
                  <TableCell>{item.lastDateToDo}</TableCell>
                  <TableCell>
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
              ))}
              ;
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};
export default MyTasksPage;
