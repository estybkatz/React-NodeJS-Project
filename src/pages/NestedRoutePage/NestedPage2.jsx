import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableRowComponent from "../../components/TableRowComponent";
import TableRowsComponent from "../../components/TableRowsComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
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
//import { useNavigate } from "react-router-dom";
const NestedPage2 = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  const columns = [
    "Name",
    "Phone",
    "Email",
    "club - member",
    "link - to - card",
  ];
  const navigateToMoreInfoCostumer = (id) => {
    navigate(`/costumer/${id}`);
  };
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      setCardsArr(
        data.filter(
          (card) =>
            card.firstName.startsWith(filter) || card.email.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
    }
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    // <Box>
    //   <h2>customers list</h2>;
    //   <Grid container spacing={2}>
    //     <TableRowComponent />
    //     {cardsArr.map((item) => {
    //       return (
    //         <TableRowsComponent
    //           key={item._id + Date.now()}
    //           Name={item.firstName}
    //           phone={item.phone}
    //           email={item.email}
    //           clubMember={item.clubMember}
    //           linkToCard={"link to card"}
    //         />
    //       );
    //     })}
    //   </Grid>
    // </Box>
    <Box>
      <h2>costumers list</h2>
      <Table sticky Header aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell key={item + Date.now()}>
                <Typography>{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {cardsArr.map((item) => (
          <TableBody>
            <TableRow>
              <TableCell key={item.firstName + Date.now()}>
                {item.firstName}
              </TableCell>
              <TableCell key={item.lastName + Date.now()}>
                {item.lastName}
              </TableCell>
              <TableCell key={item.phone + Date.now()}>{item.phone}</TableCell>
              <TableCell key={item.email + Date.now()}>{item.email}</TableCell>
              <TableCell
                key={item.street + item.houseNumber + item.city + Date.now()}
              >
                {item.street + "" + item.houseNumber + "" + item.city}
              </TableCell>
              <TableCell key={item.isAdmin + Date.now()}>
                {item.isAdmin ? "yes" : "no"}
              </TableCell>
              <TableCell key={item._id + Date.now()}>
                <Button onClick={() => navigateToMoreInfoCostumer(item._id)}>
                  "link"
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      {/* </TableContainer> */}
    </Box>
  );
};
export default NestedPage2;
