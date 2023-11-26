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
const CostumerPrivtePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardData, setCardData] = useState(null);
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
      .get("cards/tasks/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setTaskData(data);
      })

      .catch((err) => {
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
      .get("cards/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setCardData(data);
      })

      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  //   const delete1 = (id) => {
  //     setCardsArr(cardsArr.filter((card) => card._id !== id));
  //   };

  //   const filterFunc = (data) => {
  //     if (!originalCardsArr && !data) {
  //       return;
  //     }
  //     let filter = "";
  //     if (qparams.filter) {
  //       filter = qparams.filter;
  //     }
  //     if (!originalCardsArr && data) {
  //       /*
  //         when component loaded and states not loaded
  //       */
  //       setOriginalCardsArr(data);
  //       setCardsArr(
  //         data.filter(
  //           (card) =>
  //             card.firstName.startsWith(filter) ||
  //             card.bizNumber.startsWith(filter)
  //         )
  //       );

  //       return;
  //     }
  //     if (originalCardsArr) {
  //       /*
  //         when all loaded and states loaded
  //       */
  //       let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
  //       setCardsArr(
  //         newOriginalCardsArr.filter(
  //           (card) =>
  //             card.firstName.startsWith(filter) || card.email.startsWith(filter)
  //         )
  //       );
  //     }
  //   };
  //   useEffect(() => {
  //     filterFunc();
  //   }, [qparams.filter]);

  //   const handleDeleteFromInitialCardsArr = async (id) => {
  //     try {
  //       await axios.delete("/cards/" + id);

  //       setCardsArr((newCardsArr) =>
  //         newCardsArr.filter((item) => item._id !== id)
  //       );
  //       toast.success("Succesfully deleted card");
  //     } catch (err) {
  //       toast.error("Error when deleting");
  //     }
  //   };
  //   const handleEditFromInitialCardsArr = (id) => {
  //     const selectedCards = cardsArr.find((card) => card._id == id);
  //     navigate(`/edit/${id}`, { state: { user_id: selectedCards.user_id } }); //localhost:3000/edit/123213
  //   };
  //   const handleMoreInformationFromInitialCardsArr = (id) => {
  //     navigate(`/customer/${id}`);
  //   };
  if (!cardData) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Card square raised>
        {/* <CardActionArea onClick={handleInfoBtnClick}>
        <CardMedia component="img" image={img} className="cardMedia" />
      </CardActionArea> */}
        <CardHeader
          title={cardData.firstName}
          subheader={cardData.lastName}
          //   onClick={handleInfoBtnClick}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + cardData.phone}</Typography>
          <Typography>
            {"Address: " +
              " " +
              cardData.street +
              " " +
              cardData.houseNumber +
              " " +
              cardData.city +
              " " +
              cardData.country +
              " " +
              cardData.zip}
          </Typography>
          <Typography>{"Card Number: " + cardData.cardNumber}</Typography>
          <Typography variant="body1" color="white">
            {"Email: " + cardData.email}
          </Typography>
          <Typography variant="body1" color="white">
            {"ReceptionDateAtTheOffice: " + cardData.ReceptionDateAtTheOffice}
          </Typography>
          <Typography variant="body1" color="white">
            {"clubMember: " + cardData.clubMember}
          </Typography>
          <Typography variant="body1" color="white">
            {"BusinessDescription: " + cardData.BusinessDescription}
          </Typography>
          <hr />
        </CardContent>

        {/* <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
            {payload &&
            (payload.isAdmin ||
              (payload && payload.isBusiness && payload._id === user_id)) ? (
              <Fragment>
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={handleDeleteBtnClick}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Fragment>
            ) : (
              ""
            )}
            {(canEdit || canEditPrivate) && payload._id === user_id ? (
              <Fragment>
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={handleEditBtnClick}
                >
                  <CreateIcon />
                </IconButton>
              </Fragment>
            ) : (
              ""
            )}
          </Box>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={openModal}
            >
              <CallIcon />
            </IconButton>
            {isLoggedIn ? (
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleFavBtnClick}
              >
                <FavoriteIcon
                  style={favState ? { color: "red" } : { color: "blue" }}
                />
              </IconButton>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <IconButton onClick={handleDetailsBtnClick}>
              More Details
            </IconButton>
          </Box>
        </CardActions> */}
      </Card>
    </Box>
  );
};
export default CostumerPrivtePage;
