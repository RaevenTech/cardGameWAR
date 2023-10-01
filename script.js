const newDeckBtn = document.getElementById("new-deck-btn")
const drawNewBtn = document.getElementById("draw-new-btn")
//console.log(drawNewBtn)

const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"

// fetch data from api save the card deck id
let deckId = ""

const getNewDeck = () => {
  fetch(baseUrl + "new/shuffle/", {method:"GET"})
  .then(resp => resp.json())
  .then(jsonData => {
    deckId = jsonData.deck_id
    console.log(deckId)
  })
} 
getNewDeck()      // call function to get a new deck when page loads
newDeckBtn.addEventListener("click", getNewDeck)

const drawNewCards = () => {
  fetch(baseUrl + `${deckId}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data.cards[0].image)
      return document.getElementById("cards-container").innerHTML = `
      <div id="cards-container" class="cards-container">
        <h3 class="comp-score score">Computer: 0</h3> 
        <div class="top-card" id="top-card">
          <img src="${data.cards[1].image}" class="card-img" alt="Top playin card"/>
        </div>
        <h3 class="cards-remaining">Remaining cards: 0</h3>
        <div class="bottom-card" id="bottom-card">
           <img src="${data.cards[0].image}" class="card-img" alt="Bottom playin card"/>
        </div>
        <h3 class="player-score score">Player: 0</h3> 
      </div>
      `
    })
  }
  drawNewBtn.addEventListener("click", drawNewCards)
