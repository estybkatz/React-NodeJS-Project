import FavoriteIcon from "@mui/icons-material/Favorite";

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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateIcon from "@mui/icons-material/Create";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";

import CallIcon from "@mui/icons-material/Call";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CardComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  cardNumber,
  id,
  onDelete,
  onDeletefav,
  onEdit,
  onInfo,
  canEdit,
  canEditPrivate,
  user_id,
  isFav,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const [favState, setfavState] = useState(isFav);
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleInfoBtnClick = () => {
    onInfo(id);
  };
  const handleFavBtnClick = async () => {
    try {
      if (!payload) {
        return;
      }
      await axios.patch("/cards/card-like/" + id);
      onDeletefav(id);
      setfavState(!favState);
      toast.success("The change was made successfully");
    } catch {
      toast.error("error when change favorites cards, try later again");
    }
  };
  return (
    <Card square raised>
      <CardActionArea onClick={handleInfoBtnClick}>
        <CardMedia component="img" image={img} className="cardMedia" />
      </CardActionArea>
      <CardHeader
        title={title}
        subheader={subTitle}
        onClick={handleInfoBtnClick}
      ></CardHeader>
      <CardContent onClick={handleInfoBtnClick}>
        <hr />
        <Typography>{"Phone: " + phone}</Typography>
        <Typography>{"Address: " + address}</Typography>
        <Typography>{"Card Number: " + cardNumber}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-start" }}>
          {payload &&
          (payload.isAdmin || (canEditPrivate && payload._id === user_id)) ? (
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
          <IconButton color="primary" aria-label="add to shopping cart">
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
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
