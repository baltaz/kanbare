const cards = document.querySelectorAll(".card");
/* const columns = document.querySelectorAll(".column"); */
let mouseDown = false;

const columns = document.querySelectorAll(".dragable-zone");

const sortableConfig = {
    group:'board',
    sort: true,
    animation: 200,
    easing: "ease-in",
}
columns.forEach(e=>{
    Sortable.create(e,sortableConfig);
})

/* const todo = document.querySelector(".dragable-zone");
const doing = document.querySelector(".doing");
const done = document.querySelector(".done");


let sortableToDo = Sortable.create(todo,sortableConfig);
let sortableDoing = Sortable.create(doing,sortableConfig);
let sortableDone = Sortable.create(done,sortableConfig); */


/* 
cards.forEach(card=>{
    card.addEventListener('dragstart',e=>{
        card.classList.add("dragging");
    })
    card.addEventListener('dragend',e=>{
        card.classList.remove("dragging");  
    })
    card.addEventListener('mousedown',e=>{
        mouseDown=true;
        setTimeout(()=>{
            if(mouseDown){
                card.classList.add("holding");
            }
        },1000);
    })
    card.addEventListener('mouseup',e=>{
        console.log("mouse up");
        card.classList.remove("holding")
        mouseDown=false
    });
})

columns.forEach(column=>{
    column.addEventListener('dragover', e=>{
        e.preventDefault();
        const card = document.querySelector('.dragging')
        column.appendChild(card);
    })
})

let addButton = document.querySelector(".add-button");
let modal = document.querySelector(".modal");
let titleField = document.querySelector(".title-field");
let descriptionField = document.querySelector(".description-field");

const hideElement = e => e.classList.remove("show");
const showElement = e => {
    console.log(e.childNodes);
    e.childNodes[1].classList.add("show");
    e.style.display="block";
}

addButton.onclick = ()=>{
    showElement(modal);
    descriptionField.value="";
    titleField.value="";
    saveButton.classList.remove("active")
};
modal.onclick = e => {if(e.target==modal) hideElement(modal)}; */





//modal de add con animations
//create cards
//cambiar ubicación al soltar
//drag and drop to delete
//access to edit
//mobile touch
//delete keep pressing (iphone effect)