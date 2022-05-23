import { readSync } from "fs";


export const filterArray = (arrayList: any[]) => {
  const todayDate = new Date();
  const earliestDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const filteredList = [];

  for (let index = 0; index < arrayList.length; index++) {
    if (new Date(arrayList[index].date) <= todayDate && new Date(arrayList[index].date) >= earliestDate) {
      filteredList.push({
        date: formatDate(arrayList[index].date),
        //new Date(arrayList[index].date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})  ,
        hours: arrayList[index].hours
      })
      // console.log('JSHDKHKSHAKHDK=====>', placeList[index])
    }

    // console.log('JSHDKHKSHAKHDK=====>', placeList[index].date, '-----', todayDate)
  }

  filteredList.sort(function (a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  });

  console.log("=============", filteredList)
  return filteredList;
}





// export const filterArrayy = (arrayList: any[]) => {

//   // sort and map out data , for dates - remove redundants

//   const todayDate = new Date();
//   const earliestDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//   const filteredList: { label: string; data: any; date: any }[] = [];



//   for (let index = 0; index < arrayList.length; index++) {
//     let formattedDate = new Date(formatDate(arrayList[index].date));

//     if (formattedDate <= todayDate && formattedDate >= earliestDate) {

//       filteredList.push({
//         label: arrayList[index].place,
//         data: arrayList[index].hours,
//         date: formattedDate
//       })

//     }


//   }



//   return filteredList;
// }

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

  return sample(filteredList);
}



export const sortGraphDates = (resultList: any[]) => {

  let filteredList2: any[] = [];
  let value = {};

  if (resultList.length !== 0) {
    dateArray().map((dateA) => {

      for (const res of resultList) {
        // console.log("RESRESRES", res.date, dateA)

        if(res.date.valueOf() === dateA.valueOf()){
          value = {
            label: res.label,
            data: [res.data],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // date: res.date
          }
          break;
        }
        else {
          value = {
            label: "WALA",
            data: [0],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // date: dateA
          }
        }

      }

      filteredList2.push(value)

    })

  }


  // console.log("============= filterArrayy", resultList, filteredList2)

  return filteredList2;
}



// export const sortGraphDates2 = (resultList: any[]) => {

//   let filteredList2: any[] = [];
//   let value = {};
//   let dateListIndex = -1;


//   if (resultList.length !== 0) {
//     dateArray().map((dateA) => {

//       for (let index = 0; index < resultList.length; index++) {



//         dateListIndex =  filteredList2?.findIndex(item => item.date?.valueOf() === dateA.valueOf());



//         if(resultList[index].date.valueOf() === dateA.valueOf() && dateListIndex < 0){
//           // value = {
//           //   label: resultList[index].label,
//           //   data: [resultList[index].data],
//           //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
//           //   date: dateA
//           // }

//           filteredList2.push({
//             label: resultList[index].label,
//             data: [resultList[index].data],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             date: dateA
//           })

//           // break;
//         }
//         else if (resultList[index].date.valueOf() === dateA.valueOf() && dateListIndex > -1){
//           filteredList2[dateListIndex].data.push(resultList[index].data);
//           // break;
//         }
//         else {
//           // value = {
//           //   label: "WALA",
//           //   data: [0],
//           //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
//           //   date: dateA
//           // }

//           filteredList2.push({
//             label: "WALA",
//             data: [0],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             date: dateA
//           })

//         }
//         console.log("============= dfgs ====", resultList[index], dateA, dateListIndex, filteredList2)

//       }



//       // filteredList2.push(value)

//     })

//   }


//   console.log("============= sortGraphDates2", filteredList2)

//   return filteredList2;
// }



export const sample = (list: any[]) => {

  let aa: any[] = [];
  let dataTemp = [];
  let dateTemp = [];

  const colors = [
    // "rgba(255, 99, 132, 0.5)"
    // , "rgba(53, 162, 235, 0.5)"
    // , "rgba(75, 192, 192, 0.5)"

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
        console.log("SAMPLEEEE 1", dataTemp, dateTemp)
        
      }
      console.log("SAMPLEEEE 2-", dataTemp, dateTemp.length)

      aa.push({
        label: list[index].label,
        backgroundColor: colors[index],
        date: dateTemp,
        data: dataTemp
      })

      dateTemp = [];
      dataTemp = [];

    }

  }

  console.log("----- aaaa", aa)
  return aa;
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
  let uniqDropdownList = [];

  if (isPlaceExposure && dataList !== []) {
		dropdownList = dataList.map((item: any) => item.place)
	}
	else {
		dropdownList = dataList.map((item: any) => item.name)
	}

	return uniqDropdownList = [...new Set(dropdownList)];
}
