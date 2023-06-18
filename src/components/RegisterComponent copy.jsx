import { Alert, Grid, TextField } from "@mui/material";

const mustFields = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "password",
  "country",
  "city",
  "street",
  "houseNumber",
];
const RegisterComponent = ({
  item,
  label,
  onChange,
  inputsErrorState,
  inputState,
  onClick,
}) => {
  const isRequired = mustFields.includes(item);
  if (item === "biz") return;
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        name={item}
        required={isRequired}
        fullWidth
        type={item}
        autoFocus={item === "firstName"}
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
    </Grid>
  );
};

export default RegisterComponent;
