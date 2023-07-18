import { Alert, Grid, TextField } from "@mui/material";
const mustFields = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "ReceptionDateAtTheOffice",
  "BusinessDescription",
  "city",
  "street",
  "houseNumber",
];

const CreateEditComponent = ({
  item,
  inputState,
  handleInputChange,
  inputsErrorsState,
}) => {
  const isRequired = mustFields.includes(item);
  if (item === "clubMember") return;
  return isRequired ? (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id={item}
        label={item}
        name={item}
        autoComplete={item}
        value={inputState[item] ? inputState[item] : ""}
        onChange={handleInputChange}
      />
      {inputsErrorsState && inputsErrorsState[item] && (
        <Alert severity="warning">
          {inputsErrorsState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  ) : (
    <Grid item xs={12}>
      <TextField
        fullWidth
        id={item}
        label={item}
        name={item}
        autoComplete={item}
        value={inputState[item] ? inputState[item] : ""}
        onChange={handleInputChange}
      />
      {inputsErrorsState && inputsErrorsState[item] && (
        <Alert severity="warning">
          {inputsErrorsState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  );
};

export default CreateEditComponent;
