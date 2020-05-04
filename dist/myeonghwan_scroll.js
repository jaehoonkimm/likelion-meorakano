let all = document.querySelectorAll("button");
for(let i = 0; all.length; i+= 1){
    if(i%2 == 0){
        all[i].addEventListener('click',function(){
            window.scrollBy({left:0,top:+700, behavior:'smooth'});
        })
    }else{
        all[i].addEventListener('click',function(){
            window.scrollBy({left:0,top:-700, behavior:'smooth'});
        })
    };
};
