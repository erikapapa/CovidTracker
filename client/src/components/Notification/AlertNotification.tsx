import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

type Props = {
  severity: any
  message: string
}

const AlertNotification: React.FC<Props> = (props: Props) => {
  const { severity, message } = props;
  const [show, setShow] = useState(true);

  return (
    show && severity !== "" ?
      <Alert severity={severity} onClose={() => setShow(false)}>{message}</Alert>
      : <></>
  );

}
export default AlertNotification

