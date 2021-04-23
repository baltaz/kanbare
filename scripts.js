const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".dragable-zone");
let holdTimer = null;

const sortableConfig = {
  group: "board",
  sort: true,
  animation: 200,
};

columns.forEach((e) => {
  Sortable.create(e, sortableConfig);
});

const holding = (clickedCard) => {
  card = clickedCard.currentTarget;
  card.classList.add("holding");
  holdTimer = setTimeout(() => {
    if (card.classList.contains("holding")) card.remove();
  }, 1900);
};

const release = (releasedCard) => {
  clearTimeout(holdTimer);
  card = releasedCard.currentTarget;
  card.classList.remove("holding");
};

cards.forEach((card) => {
  card.addEventListener("mousedown", holding);
  card.addEventListener("mouseup", release);
  card.addEventListener("mouseleave", release);
  //touch
  card.addEventListener("touchstart", holding);
  card.addEventListener("touchend", release);
  card.addEventListener("touchcancel", release);
});

//MODAL//////////////////////
showModal = () => (modal.style.display = "block");
hideModal = () => (modal.style.display = "none");

const modal = document.querySelector(".overlay");
const addButton = document.querySelector(".add-button");
//const infoButton = document.querySelector(".info-button");
const saveButton = document.querySelector(".save-button");

addButton.addEventListener("click", showModal);
//infoButton.addEventListener("click", showModal);
modal.addEventListener("click", (e) => {
  if (e.target == modal) hideModal();
});

//NEW CARD
const name = document.querySelector(".name");
const description = document.querySelector(".description");
const column = document.querySelector(".todo").querySelector(".dragable-zone");
let i = 5;

const titleField = document.querySelector(".title-field");
const descriptionField = document.querySelector(".description-field");

const saveCard = () => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = i++;

  let title = document.createElement("h3");
  title.innerText = titleField.value;

  let titleContent = document.createElement("div");
  titleContent.classList.add("title");

  titleContent.appendChild(title);

  let description = document.createElement("div");
  description.classList.add("description");
  description.innerText = descriptionField.value;

  card.appendChild(titleContent);
  card.appendChild(description);
  card.addEventListener("mousedown", holding);
  card.addEventListener("mouseup", release);
  card.addEventListener("mouseleave", release);
  //touch
  card.addEventListener("touchstart", holding);
  card.addEventListener("touchend", release);
  card.addEventListener("touchcancel", release);

  column.appendChild(card);
  hideModal();
  titleField.value = "";
  descriptionField.value = "";
};

saveButton.addEventListener("click", saveCard);

//create cards
//access to edit
//localstorage
