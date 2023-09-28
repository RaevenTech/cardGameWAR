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
getNewDeck()      // call fucntion to get a new deck when page loads
newDeckBtn.addEventListener("click", getNewDeck)

const drawNewCards = () => {
  fetch(baseUrl + `${deckId}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data.cards[0].image)
      return document.getElementById("cards-container").innerHTML = `
      <div class="top-card" id="top-card">
          <img src="${data.cards[1].image}" class="card" alt="Top playin card"/>
      </div>
      <div class="bottom-card" id="bottom-card">
          <img src="${data.cards[0].image}" class="card" alt="Bottom playin card"/>
      </div>`
    })
}
drawNewBtn.addEventListener("click", drawNewCards)