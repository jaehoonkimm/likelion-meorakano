// 모달 가져오기
var modal = document.getElementById('myModal');

// 모달 오픈 버튼 가져오기
var btn = document.getElementById('button');

// span(모달 닫을 때 씀) 가져오기
var span = document.getElementsByClassName("close")[0];

// 오픈 버튼 누르면 켜지기
btn.onclick = function() {
    modal.style.display = "block";
}

// 닫기 버튼 누르면 닫기
span.onclick = function() {
    modal.style.display = "none";
}

// 모달 바깥 영역 누르면 꺼지기
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}