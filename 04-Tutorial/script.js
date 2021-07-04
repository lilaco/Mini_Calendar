let nav = 0;
//클릭할때, 월 데이터를 받는곳?
let clicked = null;
//event 저장
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function openModal(date) {
    clicked = date;

    // find function
    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        console.log('이벤트가 이미 존재합니다.');
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    //This related on next:back button
    if(nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('ko-KR', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    //split 함수 유용함
    const paddingDays = weekdays.indexOf(dateString.split('. ')[3]);

    // 월, 연도 표시.
    // document.getElementById('monthDisplay').innerText(dt.toLocaleDateString('ko-KR',{ month: 'long' }) + " " + year);
    document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('ko-KR', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    //날짜찍기?
    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i>paddingDays) {
            daySquare.innerText = i - paddingDays;

            // daySquare.addEventListener('click', () => console.log('click'));
            daySquare.addEventListener('click', () => openModal());
        } else {
            daySquare.classList.add('padding');
        }

        // I need to catch error appendChild().
        calendar.appendChild(daySquare);
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
}

initButtons();
load();