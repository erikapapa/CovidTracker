
export const filterArrayDates = (arrayList: any[], isPlaceExposure: boolean) => {

  const todayDate = new Date();
  const earliestDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const filteredList: { label: string; data: any; date: any }[] = [];

  if (arrayList !== []) {
    for (let index = 0; index < arrayList.length; index++) {
      let formattedDate = new Date(formatDate(arrayList[index].date));
      if (formattedDate <= todayDate && formattedDate >= earliestDate) {
        filteredList.push({
          label: isPlaceExposure ? arrayList[index].place : arrayList[index].name,
          data: arrayList[index].hours,
          date: formattedDate
        })
      }
    }
  }

  filteredList.sort(function (a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  return customGraphArray(filteredList);
}


export const customGraphArray = (list: any[]) => {

  let arr: any[] = [];
  let dataTemp = [];
  let dateTemp = [];

  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(0, 153, 0, 0.5)'
  ];

  if (list.length !== 0) {

    for (let index = 0; index < list.length; index++) {

      for (const date of dateArray()) { // 7 dates
        if(list[index].date.valueOf() === date.valueOf()){
          dataTemp.push(list[index].data);
          dateTemp.push(date)
        }
        else {
          dataTemp.push(0)
          dateTemp.push(date)
        }
        
      }

      arr.push({
        label: list[index].label,
        backgroundColor: colors[index],
        date: dateTemp,
        data: dataTemp
      })

      dateTemp = [];
      dataTemp = [];

    }

  }

  return arr;
}



export const dateArray = () => {
  const dates = [];

  const dateToday = new Date().setHours(0,0,0,0);

  for (let index = 0; index < 7; index++) {
    dates.push(new Date(dateToday - index * 24 * 60 * 60 * 1000))
  }

  dates.sort(function (a, b) {
    return new Date(a).valueOf() - new Date(b).valueOf();
  });

  return dates;

}


export const dateHeaders = () => {

  let dates: any[] = [];
  let value:any = "";

  for (const date of dateArray()){
    value = date.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
    dates.push(value);
  }

    return dates;
}



export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
}

export const formatWord = (word: boolean) => {
  return word ? "Yes" : "No";
}

export const suggestedList = (isPlaceExposure: boolean, dataList: any) => {
  let dropdownList = [];

  if (isPlaceExposure && dataList !== []) {
		dropdownList = dataList.map((item: any) => item.place)
	}
	else {
		dropdownList = dataList.map((item: any) => item.name)
	}

	return [...new Set(dropdownList)];
}
