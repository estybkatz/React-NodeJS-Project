import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableRowComponent from "../../components/TableRowComponent";
import TableRowsComponent from "../../components/TableRowsComponent";
import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";

const NestedPage2 = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
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
    <Box>
      <h2>customers list</h2>;
      <Grid container spacing={2}>
        <TableRowComponent />
        {cardsArr.map((item) => {
          return (
            <TableRowsComponent
              key={item._id + Date.now()}
              Name={item.firstName}
              phone={item.phone}
              email={item.email}
              clubMember={item.clubMember}
              linkToCard={"link to card"}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
export default NestedPage2;
