"use strict";
//declear and assign value
const panels = document.querySelectorAll(".panel")

//function for display the image when click
panels.forEach(panel => {
    panel.addEventListener("click", () => {
        removeActionClass();
        panel.classList.add("active") //when click that photo, the photo become active
    })
})

//function for remove the "actice" class in the panel
function removeActionClass() {
    panels.forEach(panel => {
        panel.classList.remove("active")
    })
}