//Youtube Tutorial by Coding Nepal - https://youtu.be/DABkhfsBAWw?si=WEDihNfFNf61O_x3

const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

document.addEventListener("keydown", e => {
  if (e.key === "Enter") startTimer();
});

function startTimer() {
  let t = document.getElementById("timeInput").value;
  const out = document.getElementById("timer");
  const i = setInterval(() => (out.textContent = t--, t < 0 && clearInterval(i)), 1000);
}
function enterName(){
    let nameInput = document.querySelector("#name-input");
    let n = nameInput.value;
    let greetingText = document.querySelector("#greeting");
    greetingText.innerHTML = "Good luck, " + n;
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") setColor();
});

function setColor() {
  document.body.style.backgroundColor = bgColor.value;
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") toggleMusic();
});

function toggleMusic() {
  const m = document.getElementById("bgMusic");
  document.getElementById("musicToggle").checked ? m.play() : m.pause();
}

function flipCard(e) {
    let clickedCard = e.target; //getting user clicked card
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne){
            //return the cardOne value to clickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}


function matchCards(img1, img2) {
   if(img1 === img2) { // if two cards img matched
    matchedCard++; // increment matched value by 1
    //if matched value is 8 that mkeans user has matched all the cards (8* 2 = 16 cards)
    if(matchedCard == 8){
        setTimeout(() => {
            return shuffleCard();
        }, 1000); // calling shuffleCard function after 1 sec
    }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);  
        cardOne = cardTwo = "";//setting both card value to blank 
        return disableDeck = false;
    
   }
//if two card not matched
   setTimeout(() => {
    // adding shake class to both card after 400ms
   cardOne.classList.add("shake");
   cardTwo.classList.add("shake");
   }, 400);

    setTimeout(() =>{
    // removing both shake & flip classes from the both card after 1.2 seconds
   cardOne.classList.remove("shake", "flip");
   cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = ""; //setting both card value to blank
    disableDeck = false;
   }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false
    //creating array of 16 items and each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array item randomly

    //removing flip class from all cards and passing image to each card
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card =>{//adding click event to all cards
    card.addEventListener("click", flipCard);
});