import React from "react";
import { Button } from 'react-bootstrap';

type Props = {
  btnClass: string
  variant: string
  disabled: boolean
  method: () => void
  type: "button" | "submit" | "reset"
};

const CustomButton: React.FC<Props> = (props) => {
  const { btnClass, disabled, children, variant, method, type } = props;

  return (
    <Button type={type} className={`${btnClass}`} variant={variant} disabled={disabled} onClick={method}>
      {children}
    </Button>
  );
};

export default CustomButton;
