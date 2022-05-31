
export const useDate = () => {
  const dateArray = () => {
    const dates = [];

    const dateToday = new Date().setHours(0, 0, 0, 0);

    for (let index = 0; index < 7; index++) {
      dates.push(new Date(dateToday - index * 24 * 60 * 60 * 1000))
    }

    dates.sort(function (a, b) {
      return new Date(a).valueOf() - new Date(b).valueOf();
    });

    return dates;

  }

  const dateHeaders = () => {
    let dates: any[] = [];
    let value: any = "";

    for (const date of dateArray()) {
      value = date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
      dates.push(value);
    }

    return dates;
  }



  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
  }



  return {
    dateArray,
    dateHeaders,
    formatDate
  };
}

