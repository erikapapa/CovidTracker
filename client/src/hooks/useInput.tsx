import { useState } from 'react';

export const useInput = (state: any, defaultVal: any) => {
  const [enteredValue, setEnteredValue] = useState<any>(defaultVal);
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if(isNumber){
    //   setEnteredValue(parseInt(e.target.value));
    // }
    // else {
    //   setEnteredValue(e.target.value);
    // }

    switch (state) {
      case "string":
        setEnteredValue(e.target.value);
        break;
      case "num":
        setEnteredValue(parseInt(e.target.value));
        break;
      case "checkbox":
        setEnteredValue(e.target.checked);
        break;
      default:
        break;
    }
    
  };

  // const inputBlurHandler = () => {
  //     setIsTouched(true);
  // };

  // const reset = () => {
  //     setEnteredValue('');
  //     setIsTouched(false);
  // };

  return {
    enteredValue,
    valueChangeHandler
  };
}

