let all = document.querySelectorAll('.goTo');

for(let i = 0; all.length; i+=1){
    if(i%2 == 0){
        all[i].addEventListener('click', function(){
            window.scrollBy({left:0, top:-730, behavior:'smooth'});
        })
    }else{
        all[i].addEventListener('click', function(){
            window.scrollBy({left:0, top:730, behavior:'smooth'});
        })
    };
};