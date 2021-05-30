let todayFullDate = new Date();
var options = {month: 'long'};

const viewYear = todayFullDate.getFullYear();
const viewMonth = todayFullDate.getMonth();
const viewMonthTitle = new Intl.DateTimeFormat('en-US', options).format(todayFullDate).toUpperCase();
const viewTodayDate = todayFullDate.getDate();

const viewTodayDay = todayFullDate.getDay();
var weekDay = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];


document.querySelector('.year').textContent = `${viewYear}  ${viewMonthTitle}`;
document.querySelector('.num-date').textContent = `${viewTodayDate}`;
document.querySelector('.day').textContent = `${weekDay[viewTodayDay]}`;


// 지난달 마지막 날짜와 요일, 그리고 이번 달 마지막 날짜와 요일 구하기
const prevLast = new Date(viewYear, viewMonth, 0);
const thisLast = new Date(viewYear, viewMonth + 1, 0);
const prevLastDate = prevLast.getDate();
const prevLastDay = prevLast.getDay();
const thisLastDate = thisLast.getDate();
const thisLastDay = thisLast.getDay();

 //날짜를 담아두는 배열
 const prevDates = [];
 const thisDates = [...Array(thisLastDate + 1).keys()].slice(1); //분석할것.
 const nextDates = [];

 //지난달 날짜 계산(달력 앞부분)
 if(prevLastDay !== 6) {
     for (let i = 0; i< prevLastDay + 1; i++) {
         prevDates.unshift(prevLastDate - i);
     }
 }

 //다음달 날짜 배열에 입력(달력 뒷부분)
 for (let i = 1; i<7 - thisLastDay; i++) {
     nextDates.push(i);
 }

 //지난달 이번달 다음달 날짜 합치기
 const dates = prevDates.concat(thisDates, nextDates);

 const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(thisLastDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');