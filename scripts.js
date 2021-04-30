import {demoCards} from './demo.js';

const columns = document.querySelectorAll(".dragable-zone");
const addButton = document.querySelector(".add-button");
const modal = document.querySelector(".overlay");
const saveButton = document.querySelector(".save-button");
const titleField = document.querySelector(".title-field");
const descriptionField = document.querySelector(".description-field");
let editingCard = null;
let holdTimer = null;
let currentId = localStorage.getItem("id") || demoCards.length-1;
let cardsList = JSON.parse(localStorage.getItem("cards")) || demoCards

const sortableConfig = {
  group: "board",
  sort: true,
  animation: 200,
  dataIdAttr: "id",
  onEnd: e =>{
    const card = cardsList.find(item => item.id==e.item.id);
    card.status=e.to.parentElement.id;
    localStorage.setItem("cards", JSON.stringify(cardsList));
    renderScore();
  },
  store:{
    set: sortable => {
      const order = sortable.toArray();
      localStorage.setItem(sortable.el.parentElement.id, order.join('|'));
    },
    get: sortable =>{
      const order = localStorage.getItem(sortable.el.parentElement.id)
      return order ? order.split('|'): [];
    }
  }
};

const holding = clickedCard => {
  const card = clickedCard.currentTarget;
  card.classList.add("holding");
  holdTimer = setTimeout(() => {
    if (card.classList.contains("holding")){
      const position = cardsList.findIndex(e => e.id==card.id);
      cardsList.splice(position,1);
      card.remove();
      localStorage.setItem("cards", JSON.stringify(cardsList));
      renderScore();
    } 
  }, 1900);
};

const renderScore = () =>{
  const done = document.querySelector("#done").querySelector(".dragable-zone")
  const score = document.querySelector(".score");
  score.innerText = `${cardsList.length? Math.round(done.children.length/cardsList.length*100):0}%`;
}

const release = releasedCard => {
  clearTimeout(holdTimer);
  const card = releasedCard.currentTarget;
  card.classList.remove("holding");
};

const showModal = () => modal.style.display = "block";
const hideModal = () => modal.style.display = "none";

const saveCard = () => {
  if(editingCard){
    let currentCard = cardsList.find(aCard => aCard.id == editingCard.id);
    currentCard.title = titleField.value;
    currentCard.description = descriptionField.value;
    editingCard.querySelector(".title").firstChild.innerText= titleField.value;
    editingCard.querySelector(".description").firstChild.innerText= descriptionField.value;
    editingCard=null;
  }else{
    const newCard = {
      id : ++currentId,
      title : titleField.value,
      description : descriptionField.value,
      status: "todo"
    }
    renderCard(newCard);
    cardsList.push(newCard);
    localStorage.setItem("id",newCard.id);
    renderScore();
  }
  localStorage.setItem("cards", JSON.stringify(cardsList));
  hideModal();
};

const editCard = e =>{
  editingCard=e.currentTarget;
  titleField.value= editingCard.querySelector(".title").innerText;
  descriptionField.value= editingCard.querySelector(".description").innerText;
  showModal();
}

const renderCard = cardData =>{
  const column = document.querySelector(`#${cardData.status}`).querySelector(".dragable-zone");
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = cardData.id;
  
  let titleContent = document.createElement("div");
  let title = document.createElement("h3");
  title.innerText = cardData.title;
  titleContent.classList.add("title");
  titleContent.appendChild(title);
  
  let descriptionContent = document.createElement("div");
  let description = document.createElement("p");
  description.innerText = cardData.description;
  descriptionContent.classList.add("description");
  descriptionContent.appendChild(description)
  
  card.appendChild(titleContent);
  card.appendChild(descriptionContent);
  card.addEventListener("click", e=>editCard(e));
  ['mousedown','touchstart'].forEach( evt => card.addEventListener( evt, e => holding(e)));
  ['mouseup','mouseleave','touchend','touchcancel'].forEach( evt => card.addEventListener(evt, e => release(e)));
  column.appendChild(card);
}

saveButton.addEventListener("click", saveCard);
modal.addEventListener("click", e => { if (e.target == modal) hideModal();});
addButton.addEventListener("click", () =>{
  titleField.value = "";
  descriptionField.value = "";
  showModal()
});

cardsList.forEach( aCard => renderCard(aCard));
columns.forEach( e => Sortable.create(e, sortableConfig));
renderScore();