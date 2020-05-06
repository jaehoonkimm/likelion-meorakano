var clockTarget = document.getElementById("clock");


function clock() {
    var date = new Date();

    var month = date.getMonth();
    var clockDate = date.getDate();
    var day = date.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토']; //요일은 숫자형태로 리턴됨. 따라서 미리 리스트 만들어둠

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    clockTarget .innerText = `${month+1}월 ${clockDate}일 ${week[day]}요일 ` +
    `${hours<10 ? `0${hours}` : hours}:${minutes<10 ? `0${minutes }` : minutes }:${seconds<10 ? `0${seconds }` : seconds}`;
    // 월은 0부터 1월이라서 +1일
}


function init() {
// 최초 함수를 한번 실행
clock();
// setInterval로 매초마다 실행 
setInterval(clock, 1000);
}


init();