import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const FavCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        filterFunc(data);
      })

      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const delete1 = (id) => {
    setCardsArr(cardsArr.filter((card) => card._id !== id));
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
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
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
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);

      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("Succesfully deleted card");
    } catch (err) {
      toast.error("Error when deleting");
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    const selectedCards = cardsArr.find((card) => card._id == id);
    navigate(`/edit/${id}`, { state: { user_id: selectedCards.user_id } }); //localhost:3000/edit/123213
  };
  const handleMoreInformationFromInitialCardsArr = (id) => {
    navigate(`/MInfo/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {originalCardsArr.length === 0 ? (
        <Typography>You don't have favorites cards</Typography>
      ) : (
        <Box>
          <h1>Favorites Cards page</h1>
          <h3>Here you view your favorites cards</h3>
          <Grid container spacing={2}>
            {cardsArr.map((item) => (
              <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  phone={item.phone}
                  address={
                    item.street + " " + item.houseNumber + ", " + item.city
                  }
                  cardNumber={item.bizNumber}
                  title={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  img={item.image ? item.image.url : ""}
                  onDeletefav={delete1}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  onInfo={handleMoreInformationFromInitialCardsArr}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  canEditPrivate={payload && payload.biz}
                  user_id={item.user_id}
                  isFav={true}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FavCardsPage;
