import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
const TableRowsComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  cardNumber,
  Name,
  email,
  clubMember,
  linkToCard,
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
  const [favState, setfavState] = React.useState(isFav);
  const columns = [
    "Name",
    "Phone",
    "Email",
    "club - member",
    "link - to - card",
  ];
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
      await axios.patch("/cards/" + id);
      onDeletefav(id);
      setfavState(!favState);
      toast.success("The change was made successfully");
    } catch {
      toast.error("error when change favorites cards, try later again");
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableBody>
            <TableRow>
              <TableCell text-align="left">{Name}</TableCell>
              <TableCell text-align="left">{phone}</TableCell>
              <TableCell text-align="left">{email}</TableCell>
              <TableCell text-align="left">{clubMember}</TableCell>

              <TableCell text-align="left">
                <Button>{linkToCard} </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableRowsComponent;
