const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".dragable-zone");
let holdTimer = null

const sortableConfig = {
    group:'board',
    sort: true,
    animation: 200,
}

columns.forEach(e=>{
    Sortable.create(e,sortableConfig);
})

const holding = (clickedCard)=>{
    card = clickedCard.currentTarget;
    card.classList.add('holding');
    holdTimer=setTimeout(()=>{
        if(card.classList.contains('holding'))card.remove();
    },2000);
}

const release = (releasedCard)=>{
    console.log("released");
    clearTimeout(holdTimer);
    card = releasedCard.currentTarget;
    card.classList.remove('holding');
}

cards.forEach(card=>{
    card.addEventListener("mousedown", holding);
    card.addEventListener("mouseup", release);
    card.addEventListener("mouseleave", release);
    //touch
    card.addEventListener("touchstart", holding);
    card.addEventListener("touchend", release);
    card.addEventListener("touchcancel", release);

})

//modal de add con animations
//create cards
//access to edit