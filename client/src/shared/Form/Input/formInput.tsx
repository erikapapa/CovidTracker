import React, { useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  inputValue: string | number
  inputType: string
  inputPlaceholder: string
  label: string
  formClass: string
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

const FormInput: React.FC<Props> = (props) => {
  const { inputValue, inputType, inputPlaceholder, label, formClass, handleOnChange, required } = props;

  return (
    <Form.Group className={formClass}>
      <Form.Label> {label} </Form.Label>
      <Form.Control
        type={inputType}
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleOnChange}
        required={required}
        min="0"
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        Enter smth plith
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormInput;
