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
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const WorkerPrivtePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [workerData, setWorkerData] = useState(null);
  const [taskData, setTaskData] = useState(null);
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
      .get("auth/users/userCard/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setTaskData(data);
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
  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];

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
          <Typography>
            {"Address: " +
              " " +
              workerData.street +
              " " +
              workerData.houseNumber +
              " " +
              workerData.city +
              " " +
              workerData.country +
              " " +
              workerData.zip}
          </Typography>
          <Typography>{"Card Number: " + workerData.cardNumber}</Typography>
          <Typography variant="body1" color="white">
            {"Email: " + workerData.email}
          </Typography>
          <Typography variant="body1" color="white">
            {"ReceptionDateAtTheOffice: " + workerData.ReceptionDateAtTheOffice}
          </Typography>
          <Typography variant="body1" color="white">
            {"clubMember: " + workerData.clubMember}
          </Typography>
          <Typography variant="body1" color="white">
            {"BusinessDescription: " + workerData.BusinessDescription}
          </Typography>
          <hr />
          <h2>tasks for the costumer</h2>
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
