import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { counterActions } from "../../store/counter";
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

import { toast } from "react-toastify";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
const RP1 = () => {
  const [originaltasksArr, setOriginaltasksArr] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tasksArr, setTasksArr] = useState(null);
  let qparams = useQueryParams();
  useEffect(() => {
    // בטעינת הדף, נבצע בקשת HTTP לשרת
    axios
      .get("/auth/users")
      .then((response) => {
        // קבלנו את רשימת העובדים מהשרת
        setEmployees(response.data);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards/tasks")
      .then(({ data }) => {
        console.log("data", data);
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
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
  const filterFunc = (data) => {
    if (!originaltasksArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originaltasksArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginaltasksArr(data);
      setTasksArr(
        data.filter(
          (card) =>
            card.task.startsWith(filter) || card.workerToDo.startsWith(filter)
        )
      );
      return;
    }
    if (originaltasksArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originaltasksArr));
      setTasksArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.task.startsWith(filter) || card.workerToDo.startsWith(filter)
        )
      );
    }
  };
  const whoIsTheWorker = () => {
    tasksArr.map((item) =>
      employees.map((item2) => {
        if (item2._id === item.id) {
          console.log("item2.name", item2.name);
          return item2.name;
        }
      })
    );
  };
  if (!tasksArr) {
    return <CircularProgress />;
  }
  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];
  return (
    <Box>
      <h2>tasks in the office list</h2>
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

        {/* {tasksArr.map((item) => (
          <TableBody>
            <TableRow>
              <TableCell key={item.customerID + Date.now()}>
                {item.customerID}
              </TableCell>
              <TableCell key={item.task + Date.now()}>{item.task}</TableCell>
              <TableCell key={item.dateOpened + Date.now()}>
                {item.dateOpened}
              </TableCell>
              <TableCell key={item.lastDateToDo + Date.now()}>
                {item.lastDateToDo}
              </TableCell>
              <TableCell key={item.workerToDo + Date.now()}>
{ employees.map((item2) =>
      (item2._id === item.id) ?  item2.name : null}
              </TableCell>
            </TableRow>
          </TableBody>
        ))} */}
        <TableBody>
          {tasksArr.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                {customers.map((item2) =>
                  item2._id === item.customerID
                    ? item2.firstName + " " + item2.lastName
                    : null
                )}
              </TableCell>
              <TableCell>{item.task}</TableCell>
              <TableCell>{item.dateOpened}</TableCell>
              <TableCell>{item.lastDateToDo}</TableCell>
              <TableCell>
                {employees.map((item2) =>
                  item2._id === item.workerToDo
                    ? item2.name.firstName + " " + item2.name.lastName
                    : null
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </Box>
  );
  //   const [txt, setTxt] = useState("");
  //   const dispatch = useDispatch();
  //   const handleAdd1 = () => {
  //     dispatch(counterActions.add1());
  //   };
  //   const handleSub1 = () => {
  //     dispatch(counterActions.sub1());
  //   };
  //   const handleInputChange = (e) => {
  //     setTxt(e.target.value);
  //   };
  //   const handleAddClick = () => {
  //     dispatch(counterActions.addNumber(txt));
  //   };
  //   return (
  //     <Fragment>
  //       <br></br>
  //       <button onClick={handleAdd1}>+1</button>
  //       <button onClick={handleSub1}>-1</button>
  //       <input type="text" value={txt} onChange={handleInputChange} />
  //       <button onClick={handleAddClick}>add</button>
  //       <Link to="../rp2">to rp2</Link>
  //     </Fragment>
  //   );
};

export default RP1;
