import React from 'react';
import Stack from '@mui/material/Stack';
import AlertNotification from './AlertNotification';

type Props = {
  placeList: any[]
  socIntList: any[]
}

const Alerts: React.FC<Props> = (props: Props) => {
  const { placeList, socIntList } = props;

  let alertPlace = {
    isExists: false,
    message: "",
    severity: ""
  };

  let alertSocial = {
    isExists: false,
    message: "",
    severity: ""
  };

  const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
  const earliestDate = new Date(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0));

  alertPlace.isExists = placeList.some((item) =>  new Date(new Date(item.date).setHours(0, 0, 0, 0)) <= todayDate && new Date(new Date(item.date).setHours(0, 0, 0, 0)) >= earliestDate);
  alertSocial.isExists = socIntList.some((item) => new Date(new Date(item.date).setHours(0, 0, 0, 0)) <= todayDate && new Date(new Date(item.date).setHours(0, 0, 0, 0)) >= earliestDate);

  if (alertPlace.isExists) {
    alertPlace.message = `You have been exposed to a crowded place for the last 14 days. \n Try to avoid crowded places to minimized your exposure risk. `
    alertPlace.severity = "error"
  }
  else {
    alertPlace.message = `Thank you for helping to stop spread the virus by staying home `
    alertPlace.severity = "success"
  }

  if (alertSocial.isExists) {
    alertSocial.message = `You did not practice social distancing for the last 14 days. \nStay at home and maintain 1-2 meters away from other people.`
    alertSocial.severity = "error"
  }
  else {
    alertSocial.message = `You are maintaining proper social distancing. Keep it up!`
    alertSocial.severity = "success"
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={2} className="my-4">
      <AlertNotification
        severity={alertPlace.severity}
        message={alertPlace.message}
      />

      <AlertNotification
        severity={alertSocial.severity}
        message={alertSocial.message}
      />

    </Stack>
  );
}
export default Alerts

