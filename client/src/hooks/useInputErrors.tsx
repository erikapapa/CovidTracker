import { useState, useEffect } from 'react';

export const useInputErrors = (value: any, isNumber: boolean) => {
  const [errorValue, setErrorValue] = useState<any>('');

  useEffect(() => {
    console.log("hello")
    if (isNumber && value > 0) {
      setErrorValue(`Hours is required and must be greater than 0.`)
    }
    else if (value !== "") {
      setErrorValue(`This is required.`)
    }
  }, [])



  return {
    errorValue
  };
}

