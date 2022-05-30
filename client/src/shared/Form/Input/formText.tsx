import React from "react";
import TextField from '@mui/material/TextField';

type Props = {
  inputValue: string | number
  inputType: string 
  inputPlaceholder: string
  label: string
  formClass: string
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  isError: boolean
  helperText: string
}

const FormText: React.FC<Props> = (props) => {
  const { inputValue, inputPlaceholder, label, formClass, handleOnChange, id, isError, helperText, inputType } = props;

  return (
    <TextField
      required
      className={`d-block ${formClass}`}
      error={isError}
      id={id}
      type={inputType}
      label={label}
      helperText={helperText}
      onChange={handleOnChange}
      value={inputValue}
      placeholder={inputPlaceholder}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default FormText;



	