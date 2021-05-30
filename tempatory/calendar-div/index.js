// moment 메소드 활용하기

let date = new Date();

const renderCalendar = () => {
    //년도-월 채우기
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    

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

    // //모든 날짜 html에 뿌리기
    // dates.forEach((date, i) => {
    //     dates[i] = `<div class="date">${date}</div>`;
    // })

    //모든 날짜 html에 뿌리기 -> 연하게 색깔 입히기
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(thisLastDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    })

    document.querySelector('.dates').innerHTML = dates.join('');
}
renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
}

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
}

const goToday = () => {
    date = new Date(); //date값을 재할당 해줘야해서 const -> let (???)
    renderCalendar();//const와 let 사용법 제대로 체크할 것
}







