import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableRowComponent from "../../components/TableRowComponent";
import TableRowsComponent from "../../components/TableRowsComponent";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const NestedPage1 = () => {
  const [originalWorkersArr, setOriginalWorkersArr] = useState(null);
  const navigate = useNavigate();
  const [workersArr, setWorkersArr] = useState(null);
  let qparams = useQueryParams();
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/auth/users")
      .then(({ data }) => {
        console.log("data", data);
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalWorkersArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalWorkersArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalWorkersArr(data);
      setWorkersArr(
        data.filter(
          (card) =>
            card.phone.startsWith(filter) || card.email.startsWith(filter)
        )
      );
      return;
    }
    if (originalWorkersArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalWorkersArr));
      workersArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.phone.startsWith(filter) || card.email.startsWith(filter)
        )
      );
    }
  };
  if (!workersArr) {
    return <CircularProgress />;
  }
  const navigateToMoreInfoWorker = () => {
    navigate(ROUTES.MOREINFORMATIOMPAGE);
  };
  const columns = [
    "Name",
    "last Name",
    "phone",
    "email",
    "address",
    "isAdmin",
    "link to tasks",
  ];
  return (
    <Box>
      <h2>workers list</h2>
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

        {workersArr.map((item) => (
          <TableBody>
            <TableRow>
              <TableCell key={item.name.firstName + Date.now()}>
                {item.name.firstName}
              </TableCell>
              <TableCell key={item.name.lastName + Date.now()}>
                {item.name.lastName}
              </TableCell>
              <TableCell key={item.phone + Date.now()}>{item.phone}</TableCell>
              <TableCell key={item.email + Date.now()}>{item.email}</TableCell>
              <TableCell
                key={
                  item.address.street +
                  item.address.houseNumber +
                  item.address.city +
                  Date.now()
                }
              >
                {item.address.street +
                  "" +
                  item.address.houseNumber +
                  "" +
                  item.address.city}
              </TableCell>
              <TableCell key={item.isAdmin + Date.now()}>
                {item.isAdmin ? "yes" : "no"}
              </TableCell>
              <TableCell key={Date.now()}>
                <Button onClick={navigateToMoreInfoWorker}>"link"</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      {/* </TableContainer> */}
    </Box>
  );
};
export default NestedPage1;
