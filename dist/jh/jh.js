
// 시계 효과 Start //
function printClock() {
    var clock = document.getElementById("clock");            // 출력할 장소 선택
    var currentDate = new Date();                                     // 현재시간
    var calendar = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate() // 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours(),2); 
    var currentMinute = addZeros(currentDate.getMinutes() ,2);
    var currentSeconds =  addZeros(currentDate.getSeconds(),2);
    if(currentHours >= 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
        amPm = 'PM';
        currentHours = addZeros(currentHours - 12,2);
    }
    if(currentSeconds >= 50){// 50초 이상일 때 색을 변환해 준다.
        currentSeconds = '<span style="color:#de1951;">'+currentSeconds+'</span>'
    }
    clock.innerHTML = currentHours+":"+currentMinute+":"+currentSeconds +" <span style='font-size:10px;'>"+ amPm+"</span>"; //날짜를 출력해 줌
    
    setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출
}
function addZeros(num, digit) { // 자릿수 맞춰주기
        var zero = '';
        num = num.toString();
        if (num.length < digit) {
        for (i = 0; i < digit - num.length; i++) {
            zero += '0';
        }
        }
        return zero + num;
}
// 시계 효과 끝

//눈 내리는 스크립트
/**
* Instant Snowstorm, rev 2
* (c) Copyright 2012 DWUser.com.  All rights reserved.
* by Nathan Rohler
* Released under MIT License
*/

(function() {
    // Only supported in IE8+
    if ($.browser.msie && parseInt($.browser.version) < 8) return;
    // -------------------------------
    // --- Configuration variables ---
    // -------------------------------
    
    // How many frames per second?  More => smoother but more processor intensive
    var fps = 30;

    // How often should flakes be added?  Every 10 frames by default.  Greater => fewer flakes
    var addNewFlakesEveryNFrames = 10;

    // How many flakes should be added each time?  Greater => more flakes, more processor intensive
    var newFlakesToAdd = 3;

    // Controls the speed; 0.7 provides a nice speed
    var speedControl = 0.7;

    // -------------------------------
    // -------------------------------
    // -------------------------------
    
    // Holder variables
    var flakes = [];
    var additionCounter = 0;

    // The flake creator function
    function createFlake(curX, curY) {

        // How unique should each flake be?  These values specify max unique speed and wiggle/drift
        var maxSpeedOffset = 2;
        var maxWiggleOffset = 10;

        // How big should the flakes be?
        var minSize = 5;
        var maxSize = 15;

        // How much drifting/wiggling should be allowed in the downward path?
        var minWiggle = 10;
        var maxWiggle = 40;

        var sizePercent = Math.random();
        var size = Math.floor(sizePercent * (maxSize - minSize) + minSize);
        var opacity = 0.3 + Math.random() * 0.7;
        if ($.browser.msie && parseInt($.browser.version) < 10) //disable transparency on old IE to make rendering easier
            opacity = undefined;
        var color = '#9CF';

        // Create a unique speed offset, so each flake falls at a unique rate
        var speedOffset = Math.floor(Math.random() * maxSpeedOffset);

        // Create a unique wiggle amount based on size (bigger = more wiggle/drift)
        var wiggle = minWiggle + (maxWiggleOffset * Math.random()) + (maxWiggle - minWiggle) * sizePercent;

        var flake = $('<div>').text(' ').css({
            position: 'fixed',
            left: curX,
            top: curY,
            zIndex: 1000000,
            width: size,
            height: size,
            opacity: opacity,
            borderRadius: size / 2,
            '-moz-border-radius': size / 2,
            '-webkit-border-radius': size / 2,
            backgroundColor: color
        }).appendTo('body');

        var flakeObj = {
            size: size,
            sizePercent: sizePercent,
            homeX: curX,
            curX: curX,
            curY: curY,
            flake: flake,
            uniqueSpeedOffset: speedOffset,
            wiggle: wiggle,
            wiggleCounter: Math.floor(100 * Math.random())
        };
        flakes.push(flakeObj);

        return flakeObj;
    }

    // Create the sin table to save processing power later
    var sinTable = [];
    for (var i = 0; i < 100; i++) {
        var sin = Math.sin((i / 100) * Math.PI * 2);
        sinTable.push(sin);
    }

    // Track where the mouse is, so we can move flakes away from it
    var mouseX = -200;
    var mouseY = -200;
    var $w = $(window);
    $(document).mousemove(function(e) {
        mouseX = e.pageX - $w.scrollLeft();
        mouseY = e.pageY - $w.scrollTop();
    });

    function onEnterFrame() {
        // Update existing flakes
        var winH = $w.height();
        for (var i = flakes.length - 1; i > -1; i--) {
            var flakeObj = flakes[i];
            var flake = flakeObj.flake;
            var speed = 2 + (1 - flakeObj.sizePercent) * 5 + flakeObj.uniqueSpeedOffset; // bigger = slower to fall
            speed *= speedControl; // apply the speed control
            var curY = flakeObj.curY;
            var newY = curY + speed;

            var wiggleCounter = flakeObj.wiggleCounter = (++flakeObj.wiggleCounter % 100);
            var sin = sinTable[wiggleCounter];
            var wiggle = flakeObj.wiggle * sin;
            var newX = flakeObj.homeX + wiggle;

            // If we're close to the mouse, force out of the way
            var mouseXDist = Math.abs(mouseX - newX);
            var mouseYDist = Math.abs(mouseY - newY);
            var influenceArea = 150;
            if (mouseXDist < influenceArea && mouseYDist < influenceArea) {
                var maxForce = 10;
                var dist = Math.sqrt(mouseXDist * mouseXDist + mouseYDist * mouseYDist);
                if (dist < influenceArea) {
                    var influence = maxForce * (1 - (dist / influenceArea));
                    if (mouseY > newY) {
                        newY -= influence;
                        if (mouseX < newX) flakeObj.homeX += influence;
                        else flakeObj.homeX -= influence;
                    }
                    else newY += influence;
                }
            }

            flakeObj.curY = newY;
            flakeObj.curX = newX;
            flake.css({
                top: newY,
                left: newX
            });

            // Destroy flake if it has gone out of view by 100
            if (newY > winH + 100) {
                flake.remove();
                flakeObj.flake = null;
                flakes.splice(i, 1);
            }
        }

        // Add any new flakes
        if (++additionCounter % addNewFlakesEveryNFrames == 0) {
            additionCounter = 0;

            var minX = -100;
            var maxX = $(window).width() + 100;
            var homeY = -100;
            for (var i = 0; i < newFlakesToAdd; i++) {
                var curX = minX + Math.floor(Math.random() * (maxX - minX));
                var curY = homeY + Math.floor(100 * Math.random());
                createFlake(curX, curY);
            }
        }
    }

    // Start the animation based on the requested frames per second
    setInterval(onEnterFrame, 1000 / fps);
	
	// Add easy support for a toggle button
	$('#toggleSnow').click(function(){
        newFlakesToAdd = (newFlakesToAdd==0) ? 3 : 0;
    });

})();
//눈 내리는 스크립트 끝

// mouse click 효과
src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
var d = document,
  $d = $(d),
  w = window,
  $w = $(w),
  wWidth = $w.width(),
  wHeight = $w.height(),
  credit = $('.credit > a'),
  particles = $('.particles'),
  particleCount = 0,
  sizes = [
    1,3,5,9,12
  ],
  colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#777777'
  ],

  mouseX = $w.width() / 2,
  mouseY = $w.height() / 2;

function updateParticleCount() {
  $('.particle-count > .number').text(particleCount);
};

$w
  .on('resize', function() {
    wWidth = $w.width();
    wHeight = $w.height();
  });

$d
  .on('mousemove touchmove', function(event) {
    event.preventDefault();
    event.stopPropagation();
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!!event.originalEvent.touches) {
      mouseX = event.originalEvent.touches[0].clientX;
      mouseY = event.originalEvent.touches[0].clientY;
    }
  })
  .on('mousedown touchstart', function(event) {
    if (event.target === credit.get(0)) {
      return;
    }
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!!event.originalEvent.touches) {
      mouseX = event.originalEvent.touches[0].clientX;
      mouseY = event.originalEvent.touches[0].clientY;
    }
    var timer = setInterval(function() {
      $d
        .one('mouseup mouseleave touchend touchcancel touchleave', function() {
          clearInterval(timer);
        })
      createParticle(event);
    }, 1000 / 60)

  });

function createParticle(event) {
  var particle = $('<div class="particle"/>'),
    size = sizes[Math.floor(Math.random() * sizes.length)],
    color = colors[Math.floor(Math.random() * colors.length)],
    negative = size / 2,
    speedHorz = Math.random() * 10,
    speedUp = Math.random() * 25,
    spinVal = 360 * Math.random(),
    spinSpeed = ((36 * Math.random())) * (Math.random() <= .5 ? -1 : 1),
    otime,
    time = otime = (1 + (.5 * Math.random())) * 1000,
    top = (mouseY - negative),
    left = (mouseX - negative),
    direction = Math.random() <= .5 ? -1 : 1,
    life = 10;

  particle
    .css({
      height: size + 'px',
      width: size + 'px',
      top: top + 'px',
      left: left + 'px',
      background: color,
      transform: 'rotate(' + spinVal + 'deg)',
      webkitTransform: 'rotate(' + spinVal + 'deg)'
    })
    .appendTo(particles);
  particleCount++;
  updateParticleCount();

  var particleTimer = setInterval(function() {
    time = time - life;
    left = left - (speedHorz * direction);
    top = top - speedUp;
    speedUp = Math.min(size, speedUp - 1);
    spinVal = spinVal + spinSpeed;

    particle
      .css({
        height: size + 'px',
        width: size + 'px',
        top: top + 'px',
        left: left + 'px',
        opacity: ((time / otime) / 2) + .25,
        transform: 'rotate(' + spinVal + 'deg)',
        webkitTransform: 'rotate(' + spinVal + 'deg)'
      });

    if (time <= 0 || left <= -size || left >= wWidth + size || top >= wHeight + size) {
      particle.remove();
      particleCount--;
      updateParticleCount();
      clearInterval(particleTimer);
    }
  }, 1000 / 50);
}

// mouse click 효과 끝