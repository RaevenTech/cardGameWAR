const newDeckBtn = document.getElementById("new-deck-btn")
//console.log(newDeckBtn)
const baseUrl = "https://apis.scrimba.com/deckofcards/api/deck/"
// fetch data from api save the card deck id
let deckId = ""
const handleClick = () => {

  fetch(baseUrl + "new/shuffle/", {method:"GET"})
    .then(resp => resp.json())
    .then(jsonData => {
      deckId = jsonData.deck_id
      console.log(deckId)
    })
  } 

  newDeckBtn.addEventListener("click", handleClick)