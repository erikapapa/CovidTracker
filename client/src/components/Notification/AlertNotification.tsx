import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

  // return (
  //   <Alert severity={severity} onClose={() => setShow(false)}>{message}</Alert>
  // );
}
export default AlertNotification

