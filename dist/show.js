const ADD_CLASS = "showCard";
const firstCard = document.querySelector(".pic:first-child");

function card() {
    const currentCard = document.querySelector(`.${ADD_CLASS}`);
    if(currentCard){
        currentCard.classList.remove(ADD_CLASS);
        const nextCard = currentCard.nextElementSibling;
        if(nextCard){
            nextCard.classList.add(ADD_CLASS);
        }else{
            firstCard.classList.add(ADD_CLASS);
        }
    }else{
        firstCard.classList.add(ADD_CLASS);
    }
    console.log(currentCard);
}

card();
setInterval(card, 2500);