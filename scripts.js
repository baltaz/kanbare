import {demoCards} from './demo.js';

const columns = document.querySelectorAll(".dragable-zone");
const modal = document.querySelector(".overlay");
const addButton = document.querySelector(".add-button");
const saveButton = document.querySelector(".save-button");
const score = document.querySelector(".score");
const done = document.querySelector("#done").querySelector(".dragable-zone")

let holdTimer = null;
let i = 0;

let savedCards = localStorage.getItem("cards");
let cardsList = savedCards?JSON.parse(savedCards):demoCards;

const sortableConfig = {
  group: "board",
  sort: true,
  animation: 200,
  onEnd: e =>{
    const position = cardsList.findIndex(item => item.id==e.item.id);
    cardsList[position].status=e.to.parentElement.id;
    localStorage.setItem("cards", JSON.stringify(cardsList));
    renderScore();
  }
};

columns.forEach(e => {
  Sortable.create(e, sortableConfig);
});

const holding = clickedCard => {
  card = clickedCard.currentTarget;
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

const renderScore = () => {
  score.innerText = `${cardsList.length? Math.round(done.children.length/cardsList.length*100):0}%`;
}

const release = releasedCard => {
  clearTimeout(holdTimer);
  const card = releasedCard.currentTarget;
  card.classList.remove("holding");
};
//MODAL//////////////////////
const showModal = () => (modal.style.display = "block");
const hideModal = () => (modal.style.display = "none");

addButton.addEventListener("click", showModal);
modal.addEventListener("click", e => { if (e.target == modal) hideModal();});

//NEW CARD
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const column = document.querySelector("#todo").querySelector(".dragable-zone");


const titleField = document.querySelector(".title-field");
const descriptionField = document.querySelector(".description-field");

const saveCard = () => {
  const newCard = {
    id : i++,
    title : titleField.value,
    description : descriptionField.value,
    status: "todo"
  }
  renderCard(newCard);
  cardsList.push(newCard);
  localStorage.setItem("id",newCard.id);
  localStorage.setItem("cards", JSON.stringify(cardsList));
  
  hideModal();
  titleField.value = "";
  descriptionField.value = "";
};

saveButton.addEventListener("click", saveCard);

const renderCard = cardData =>{
  const column = document.querySelector(`#${cardData.status}`).querySelector(".dragable-zone");
  const card = document.createElement("div");
  
  card.classList.add("card");
  card.id = cardData.id;

  let title = document.createElement("h3");
  title.innerText = cardData.title;

  let titleContent = document.createElement("div");
  titleContent.classList.add("title");
  titleContent.appendChild(title);

  let description = document.createElement("p");
  description.innerText = cardData.description;

  let descriptionContent = document.createElement("div");
  descriptionContent.classList.add("description");
  descriptionContent.appendChild(description)

  card.appendChild(titleContent);
  card.appendChild(descriptionContent);
  card.addEventListener("mousedown", (e)=>{holding(e)});
  card.addEventListener("touchstart", (e)=>{holding(e)});
  card.addEventListener("mouseup",    (e)=>{release(e)});
  card.addEventListener("mouseleave", (e)=>{release(e)});
  card.addEventListener("touchend",   (e)=>{release(e)});
  card.addEventListener("touchcancel",(e)=>{release(e)});

  column.appendChild(card);
}

  cardsList.forEach(aCard=>{renderCard(aCard)});
  renderScore();
  
//save order
//access to edit