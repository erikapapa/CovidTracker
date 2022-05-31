import { useDate } from "./useDate";

export const useCustomGraphData = () => {

  const {
    dateArray
    ,formatDate
  } = useDate();

  const filterArrayDates = (arrayList: any[], isPlaceExposure: boolean) => {

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


  const customGraphArray = (list: any[]) => {

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
          if (list[index].date.valueOf() === date.valueOf()) {
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


  return {
    filterArrayDates,
    customGraphArray
  };
}

