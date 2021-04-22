const cards = document.querySelectorAll(".card");
/* const columns = document.querySelectorAll(".column"); */
let mouseDown = false;

const columns = document.querySelectorAll(".dragable-zone");

const sortableConfig = {
    group:'board',
    sort: true,
    animation: 200,
}
columns.forEach(e=>{
    Sortable.create(e,sortableConfig);
})





cards.forEach(card=>{
    card.addEventListener('mousedown',e=>{
        console.log(card.id);
        mouseDown = true;
        setTimeout(()=>{
            if(mouseDown){
                card.classList.add("holding");
            setTimeout(()=>{
                if(mouseDown){
                    card.remove();
                }
            },2000)
            }
        },500);
    })
    card.addEventListener('mouseup',e=>{
        console.log(e.target.id);
        card.classList.remove("holding")
        mouseDown=false
    });
    card.addEventListener('mouseleave', e=>{
        card.classList.remove("holding")
        mouseDown=false
    })
})

/* columns.forEach(column=>{
    column.addEventListener('dragover', e=>{
        e.preventDefault();
        const card = document.querySelector('.dragging')
        column.appendChild(card);
    })
}) */

/* 
// Get a reference to an element.
var square = document.getElementById('0');

// Create an instance of Hammer with the reference.
var hammer = new Hammer(square);

// Subscribe to a quick start event: press, tap, or doubletap.
// For a full list of quick start events, read the documentation.
hammer.on('press', function(e) {
  e.target.classList.toggle('holding');
  console.log("You're pressing me!");
  console.log(e);
});

 */



//delete keep pressing (iphone effect)
//modal de add con animations
//create cards
//access to edit