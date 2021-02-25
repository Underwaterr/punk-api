let beerListElement = document.getElementById("beer-list")
let buttonElement = document.getElementById("next-beer")

buttonElement.addEventListener('click', function(e) {
  e.preventDefault()

  // Hide current beer
  let elementToHide = document.querySelector(`li[data-index='${beerIndex}']`)
  elementToHide.style.display="none"

  // Increment beer counter, wrapping around beer length
  beerIndex = (beerIndex+1) % beerLength

  // Show next beer
  let elementToShow = document.querySelector(`li[data-index='${beerIndex}']`)
  elementToShow.style.display="block"
})

let beerIndex = 0
let beerLength = 0

function createBeerElements(beers) {

  // Keep track of how many beers there are
  beerLength = beers.length

  // Create each beer element and append to the DOM
  for(let beer of beers) {
    let element = document.createElement('li')
    element.innerText = beer.name
    element.style.display = "none"
    element.dataset.index = beerIndex++
    beerListElement.append(element)
  }

  // Show first beer and reset beer counter
  let elementToShow = document.querySelector("li[data-index='0']")
  elementToShow.style.display="block"
  beerIndex = 0
}

fetch("https://api.punkapi.com/v2/beers")
  .then(response=> response.json())
  .then(createBeerElements)
