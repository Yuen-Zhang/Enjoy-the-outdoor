
import { nationalParksArray } from "./scripts/data-scripts/nationalParkData.js"
const parkCardTemplate = document.querySelector("data-park-template")
let allData = []

const card = parkCardTemplate.textContent.cloneNode(true)
    
console.log(card);

