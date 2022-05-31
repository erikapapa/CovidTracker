
export const useFormatStrings = () => {

  const formatWord = (word: boolean) => {
    return word ? "Yes" : "No";
  }

  const suggestedList = (isPlaceExposure: boolean, dataList: any) => {
    let dropdownList = [];

    if (isPlaceExposure && dataList !== []) {
      dropdownList = dataList.map((item: any) => item.place)
    }
    else {
      dropdownList = dataList.map((item: any) => item.name)
    }

    return [...new Set(dropdownList)];
  }


  return {
    formatWord,
    suggestedList,
  };
}

