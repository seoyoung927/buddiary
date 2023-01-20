import {Cookies} from 'react-cookie';

//https://velog.io/@cyheum/React-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%97%86%EC%9D%B4-%EB%8B%AC%EB%A0%A5%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EC%9E%90
export function getNewDateObj(newDate: Date) {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    const day = newDate.getDay();
    const hours = 0;
    const minutes = 0;
    const seconds = 0;
  
    return { year, month, date, day, hours, minutes, seconds };
}
interface IDate {
    year: number;
    month: number;
    date: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export function getMonthDate(newDate:IDate) {
    const doMonth = getNewDateObj(
      new Date(newDate.year, newDate.month - 1, 1)
    );
  
    const prevMonthLastDate = getNewDateObj(
      new Date(doMonth.year, doMonth.month - 1, 0)
    );
    const startDate =
      prevMonthLastDate.day === 0
        ? prevMonthLastDate
        : prevMonthLastDate.day === 6
        ? doMonth
        : getNewDateObj(
            new Date(doMonth.year, doMonth.month - 1, -prevMonthLastDate.day)
          );
    let monthDate = [];
    for (let i = 0; i < 42; i++) {
      monthDate.push(
        getNewDateObj(
          new Date(startDate.year, startDate.month - 1, startDate.date + i)
        )
      );
    }
  
    const week1 = monthDate.slice(0, 7);
    const week2 = monthDate.slice(7, 14);
    const week3 = monthDate.slice(14, 21);
    const week4 = monthDate.slice(21, 28);
    const week5 = monthDate.slice(28, 35);
    const week6 = monthDate.slice(35);
  
    const week4LastDate = week4[week4.length - 1];
    const week5LastDate = week5[week5.length - 1];
    const lastDate = new Date(doMonth.year, doMonth.month, 0);
    const isLastWeek4 =
      week4LastDate.month !== doMonth.month ||
      !(week4LastDate.date < lastDate.getDate());
    const isLastWeek5 =
      week5LastDate.month !== doMonth.month ||
      !(week5LastDate.date < lastDate.getDate());
    const dateArr = [week1, week2, week3, week4];
  
    return {
      year: doMonth.year,
      month: doMonth.month,
      date: isLastWeek4
        ? dateArr
        : isLastWeek5
        ? [...dateArr, week5]
        : [...dateArr, week5, week6],
    };
}
//https://velog.io/@defaultkyle/react-cookie
const cookies = new Cookies();
export const getLoginState = () => {
  const res = cookies.get("AUTH-TOKEN");
  if(res) return true
  else return false
}
