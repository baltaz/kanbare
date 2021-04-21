const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".column");
let mouseDown = false;


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



//position en column
//create colums
//create cards
//access to edit
//delete card pressing for 2 seconds
