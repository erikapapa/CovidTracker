import { useState } from 'react';

export const useSetField = (state: any, defaultVal: any) => {
  const [enteredValue, setEnteredValue] = useState<any>(defaultVal);

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

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

  return {
    enteredValue,
    valueChangeHandler
  };
}

