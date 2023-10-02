const newDeckBtn = document.getElementById("new-deck-btn")
const drawNewBtn = document.getElementById("draw-new-btn")
const topCardEl = document.getElementById("top-card")
const bottomCardEl = document.getElementById("bottom-card")
const cardsContainerEl = document.getElementById("cards-container")
const cardsRemainingEl = document.getElementById("cards-remaining")
const computerScoreEl = document.getElementById("comp-score")
const playerScoreEl = document.getElementById("player-score")
console.log(computerScoreEl)

const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"


let computerScore = 0
let playerScore = 0
let deckId = ""

const getNewDeck = () => {
  fetch(baseUrl + "new/shuffle/", {method:"GET"})
  .then(resp => resp.json())
  .then(jsonData => {
    cardsRemainingEl.innerText = `Remaining cards:${jsonData.remaining}`
    deckId = jsonData.deck_id
    console.log(deckId)
  })
} 
//getNewDeck()      // call function to get a new deck when page loads
newDeckBtn.addEventListener("click", getNewDeck)

const drawNewCards = () => {
  fetch(baseUrl + `${deckId}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => { 
  
      cardsContainerEl.innerHTML = `
      
      <div class="top-card" id="top-card">
        <img src="${data.cards[0].image}" class="card-img" alt="Top playin card"/>
      </div>
      <h3 class="cards-remaining">Remaining cards:${data.remaining}</h3>
      <div class="bottom-card" id="bottom-card">
        <img src="${data.cards[1].image}" class="card-img" alt="Bottom playin card"/>
      </div>
      <h3 class="player-score score">Player: ${playerScore}</h3>`

      const winnerText = getWinningCard(data.cards[0], data.cards[1])
            document.getElementById("game-title").innerText =  winnerText
      
            if(data.remaining === 0){
              drawNewBtn.disabled = true
            }
    })
  }
  drawNewBtn.addEventListener("click", drawNewCards)

  const getWinningCard = (card1, card2) => {
    const cardValuesArr = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1IndexValue = cardValuesArr.indexOf(card1.value)
    const card2IndexValue = cardValuesArr.indexOf(card2.value)

    if(card1IndexValue > card2IndexValue){
      computerScore++
      computerScoreEl.innerText = `Computer: ${computerScore}`
      return "Card 1 Wins!"
    }
    else if(card1IndexValue < card2IndexValue){
      playerScore++
      playerScoreEl.innerText = `Player: ${playerScore}`
      return "Card 2 Wins!"
    }
    else{
      return "Continue Battle!"
    }
  }

