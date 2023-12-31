import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import StickyHeadTable from "../components/TableComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ROUTES from "../routes/ROUTES";
import TocIcon from "@mui/icons-material/Toc";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowComponent from "../components/TableRowComponent";
import TableRowsComponent from "../components/TableRowsComponent";
import Modal from "react-modal";
const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [currentView, setCurrentView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

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
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("Succesfully deleted card");
    } catch {
      toast.error("Oops, The item was not deleted");
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    const selectedCards = cardsArr.find((card) => card._id == id);
    navigate(`/edit/${id}`, { state: { user_id: selectedCards.user_id } }); //localhost:3000/edit/123213
  };

  const handleMoreInformationFromInitialCardsArr = (id) => {
    navigate(`/MInfo/${id}`);
  };
  const createtask = (id) => {
    navigate(`/createTask/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }

  const delete1 = () => {};
  const handleDetailsBtnClick = (id) => {
    navigate(`/MInfo/${id}`);
  };
  const createCustomer = () => {
    navigate(ROUTES.CREATE);
  };
  const changeView = () => {
    // if (viewCard) {
    //   viewCard = false;
    //   viewList = true;
    //   setCurrentView(viewList);
    //   // return (viewCard = false);
    // } else {
    //   viewCard = true;
    //   viewList = false;
    //   setCurrentView(viewCard);
    //   // return (viewCard = true);
    // }
    if (currentView) {
      setCurrentView(false);
      // return (viewCard = false);
    } else {
      setCurrentView(true);
      // return (viewCard = true);
    }
  };
  const createWorker = () => {};
  //function homepage -> homeComponent(view,data)
  //function homeComponent return view? <cardComponent>->array :tableArray->array;
  //
  return (
    <Box>
      <h1>Cards page</h1>
      <h3>Here you can find cards of all categories</h3>
      <Button onClick={changeView}>
        <TocIcon />
        <DashboardIcon />
      </Button>
      {payload && payload.isAdmin ? (
        <Box>
          <Button>
            <AddCircleIcon onClick={createCustomer} />
          </Button>
        </Box>
      ) : (
        ""
      )}
      {currentView ? (
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
                title={item.firstName}
                subTitle={item.ReceptionDateAtTheOffice}
                description={item.BusinessDescription}
                //img={item.image ? item.image.url : ""}
                onDelete={handleDeleteFromInitialCardsArr}
                onDeletefav={delete1}
                onEdit={handleEditFromInitialCardsArr}
                onInfo={handleMoreInformationFromInitialCardsArr}
                canEdit={payload && payload.isBusiness && payload.isAdmin}
                onCreateTask={createtask}
                canEditPrivate={payload && payload.isBusiness}
                card={item}
                user_id={item.user_id}
                isFav={payload && item.likes.includes(payload._id)}
                more_details={handleDetailsBtnClick}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
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
      )}
    </Box>
  );
};

export default HomePage;
