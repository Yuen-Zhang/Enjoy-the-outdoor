"use strict";
// things need to do when page onload
    window.onload = function() {
        displayTheList(mountainsArray);
        selectionList(sortByArray, "sortorder");
    }
//declear & assign value
    const mountInfoDiv = document.getElementById("displaymountlist");
    const sortOrder = document.getElementById("sortorder");
    let sortByArray = ["A - Z", "Elevation"]
//get data/array from other js file
    import { mountainsArray } from "./data-scripts/mountainData.js";
    import { fillMountainDisplayDiv } from "./framework.js/htmlinjs.js";

//function for different sort way
    sortOrder.addEventListener("change", function() {
        let arr=[...mountainsArray];
        try {
            if (sortOrder.value == "A - Z") {
                displayTheList(arr.sort(function(a, b){
                    if (a.name < b.name) return -1;
                    else if (a.Title == b.Title) return 0;
                    else return 1;
                    }))
            } else if (sortOrder.value == "Elevation") {
                displayTheList(arr.sort(function(a,b){
                    if (a.elevation < b.elevation) return -1;
                    else if (a.price == b.price) return 0;
                    else return 1;
                }))
            } else {
                displayTheList(mountainsArray);
            }
        } catch (error) {
            console.log(error);
        }
    });
    
//function for selection in array list
    function selectionList(_array, _selection) {
        const exampleList = document.getElementById(_selection);
        //add a default selection
        const allValue=new Option("--");
        exampleList.appendChild(allValue);
        for (let index = 0; index < _array.length; index++) {
            let theSelection = new Option(_array[index]);
            exampleList.appendChild(theSelection);
        }
    }

//display pic with mount info
    function displayTheList(_array) {
        // display in card
        let theDisplayList = `<div class="card">`;
        let arrayList = _array.length;
        // loop through the array list to display the mountain information
        for (let index = 0; index < arrayList; index++) {
            const obj = _array[index];
            obj.index=index;
            obj.sunStatus = 
                        `<div class="sunstatus row">
                            <div class="col offset-3">
                                <p><span>Sunrise: </span> <span>Sunset: </span></p>
                            </div>
                        </div>`
            theDisplayList += fillMountainDisplayDiv(obj)
            
        }
        theDisplayList += `</div>`;
        mountInfoDiv.innerHTML = theDisplayList;
        
        //add event listener to the tofav button
        let toFav = document.getElementsByClassName("tofav");
        for(let dom of toFav) {
            dom.addEventListener("click", () => {
                add2Fav(dom.id.replace("btn", ""));
            })
        }
        
        
        
        // let btnArr=document.getElementsByClassName("checkSun")
        
        // for(let obj of btnArr) {
        //     obj.addEventListener("click",function(){
        //         let index=obj.id.split("#")[0];
        //         let lat=obj.id.split("#")[1];
        //         let lng=obj.id.split("#")[2];
                
        //         getSunsetForMountain(lat,lng,index)
        //     })
        // }


    }

// add to fav function
    function add2Fav(name) {
        let favPlace = "";
        for(let place of mountainsArray) {
            //alert(fav.indexOf(id))
            if(place.name == name && !fav.includes(place.name)) {
                favPlace = place.name;
                fav.push(favPlace);
                $("#favnum")[0].innerText = fav.length;
                localStorage.setItem("fav",fav)
                localStorage.getItem("fav")
            }
        }
    }

    for(let obj of document.getElementsByClassName("tofav")){
    obj.addEventListener("click", function(){
        add2Fav(name)
    })
    }

//search name function

//display mount sunrise & sunset time
// function that can "fetch" the sunrise/sunset times
    // async function asyncGetSunsetForMountain(lat, lng){
    //     let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    //     let data = await response.json();
    //     //console.log(data)
    //     return data;
    // }


    function getSunsetForMountain(lat, lng){
    //     fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
    //     .then(response=>response.json())
    //     .then(data=>{
    //         //console.log("data:"+data);
    //         document.getElementById(`sunset${index}`).innerHTML=`Sunrise:${data.results.sunrise}  Sunset:${data.results.sunset}`
    //         //return data
    //     }); //json.stringify() -> put json into string
    }

