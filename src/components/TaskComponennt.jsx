import { Alert, Grid, TextField } from "@mui/material";
//import { DatePicker } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DateAdapter from "@mui/lab/AdapterMoment"; // Replace with the appropriate adapter for your localization library
import { TimePicker } from "@mui/lab";

//import { DatePicker } from "@mui/x-date-pickers";
//import { DatePicker } from "@mui/x-date-pickers-pro/DatePicker";
// or
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// or
//import { DatePicker } from "@mui/x-date-pickers-pro";
// or
//import { DatePicker } from "@mui/x-date-pickers";
// const mustFields = [
//   "firstName",
//   "lastName",
//   "phone",
//   "email",
//   "password",
//   "country",
//   "city",
//   "street",
//   "houseNumber",
// ];
const TaskComponent = ({
  item,
  label,
  onChange,
  inputsErrorState,
  inputState,
  onClick,
}) => {
  //   const isRequired = mustFields.includes(item);
  if (item === "done") return;
  //   if (item === "lastDateToDo") {
  //     return;
  //   }
  //console.log(item, label, inputState);
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        name={item}
        //required={isRequired}
        //fullWidth
        type={item}
        //autoFocus={item === "firstName"}
        id={item}
        label={label}
        onChange={onChange}
        onClick={onClick}
        autoComplete="family-name"
        value={inputState[item] ? inputState[item] : ""}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((error) => (
            <div key={"errors" + error + item}>{error}</div>
          ))}
        </Alert>
      )}
      {/* <Grid item xs={12}>
        <DatePicker label="Basic date picker" />
      </Grid> */}
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker label="Basic date picker" />
        {/* <DatePicker
          label="Helper text example"
          slotProps={{
            TextField: {
              helperText: "MM/DD/YYYY",
            },
          }}
        /> */}
      </LocalizationProvider>
    </Grid>
  );
};

export default TaskComponent;
