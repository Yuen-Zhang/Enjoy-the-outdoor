"use strict";    
//declear & assign value
    const $ = document.querySelectorAll.bind(document);
    const mainSelectionDiv = $("#mainselectiondiv")[0];
    const secondSelectionLoc = $("#locationselection")[0];
    const secondSelectionLocDiv = $("#secondselectionloc")[0];
    const secondSelectionType = $("#parkselection")[0];
    const secondSelectionTypeDiv = $("#secondselectiontype")[0];
    const listToDisplay = $("#displaylist")[0];
    let fav = [];

//get data/array from other js file
    import { locationsArray, parkTypeArray} from "./data-scripts/locationData.js";
    import { nationalParksArray } from "./data-scripts/nationalParkData.js";
    import { fillDisplayDiv } from "./framework.js/htmlinjs.js";



//selction of radio button all / location / type
// to modified: no need the confirm button, change by switch option,
//  and will clear the list when option change
    mainSelectionDiv.addEventListener("change", function() {
        listToDisplay.innerHTML="";
        secondSelectionLoc.innerHTML="";
        $("#parkselection")[0].innerHTML=""


        const mainSelection = $("input[name='mainselection']:checked")[0];
        try{
            if (mainSelection.value == "location") {
                //if selected location show the state list
                secondSelectionLocDiv.classList.remove("d-none");
                secondSelectionTypeDiv.classList.add("d-none");
                selectionList(locationsArray, "locationselection");
            }else if (mainSelection.value == "parktype") {
                //if selected park type show the type selection
                secondSelectionLocDiv.classList.add("d-none");
                secondSelectionTypeDiv.classList.remove("d-none");
                // const parkTypeOption = new Option("Others");
                selectionList(parkTypeArray, "parkselection");//.appendChild(parkTypeOption);
            }else{
                // selected all
                displayTheList(nationalParksArray);
                secondSelectionLocDiv.classList.add("d-none");
                secondSelectionTypeDiv.classList.add("d-none");
            }
        }catch(e){
            // catch any type of error
            console.log(`error : ${e}`);
        }
    });
//the result by select different state

    secondSelectionLoc.addEventListener("change", function() {
        let parkInState = [];
        let parkList = nationalParksArray.length;
        for (let index = 0; index < parkList; index++) {//search state match selector, push parkInState[].
            if (nationalParksArray[index].State === this.value){
                parkInState.push(nationalParksArray[index]); //push parkInState[].
            }
            
        }
        displayTheList(parkInState);
    });
    

// the result by select different type
    secondSelectionType.addEventListener("change", function() {
        let parkByType = [];
        let keyWord = this.value;
        let parkList = nationalParksArray.length
        for (let index = 0; index < parkList; index++) {
           if (nationalParksArray[index].LocationName.indexOf(keyWord) >= 0) {
            parkByType.push(nationalParksArray[index]);
           }
            
        }
        displayTheList(parkByType);
    });

//function for selection in array list
    function selectionList(_array, _selection) {
        const exampleList = $("#"+_selection)[0];
        //add a default selection
        const allValue=new Option("select form the list");
        exampleList.appendChild(allValue);
        for (let index = 0; index < _array.length; index++) {
            let theSelection = new Option(_array[index]);
            exampleList.appendChild(theSelection);
        }
        return exampleList;
    }


//function to display the park list
    function displayTheList(_array) {
        // display in card
        let theDisplayList = `<div class="card">`;
        
        let checkData=data=>data!==undefined&&data!=0?data:"N/A";//check _array[index] in nationalParkData location which == 0 

        let arrayList = _array.length;
        for (let index = 0; index < arrayList; index++) {
            const obj = _array[index]; // function for display the park list in detail
            obj.index = index;// put a index to each div to contorl different collapse   e: collapse1 .. collapse 2... 
            obj.detail = 
                    `Address: ${checkData(obj.Address)}, ${obj.City}, ${obj.State}, ${checkData(obj.ZipCode)}
                    <br>Phone: ${checkData(obj.Phone)}
                    <br>Fax: ${checkData(obj.Fax)}
                    <br>Visit: ${checkData(obj.Visit)}`
                    
            theDisplayList += fillDisplayDiv(obj)


        } //fillDisplayDiv function import from the html in js file
        theDisplayList += `</div>`;        
        listToDisplay.innerHTML = theDisplayList;

        let toFav = document.getElementsByClassName("tofav");
        for(let dom of toFav) {
            dom.addEventListener("click", () => {
                add2Fav(dom.id.replace("btn", ""));
            })
        }
    }
// function for display message when mouseover(tooltip), set location and message @ the html
        let detialInfoButton = $("mousehopover");
        detialInfoButton.forEach(t => {
            new bootstrap.Tooltip(t)
        })
    



// add to fav function
    function add2Fav() {
        let favPlace = "";
        for(let place of nationalParksArray) {
            if(place.LocationID == id) {
                favPlace = place.LocationName;
                fav.push(favPlace);
                $("#favnum")[0].innerText = fav.length;
            }
        }
    }





/*time permit when select location display the US map then can click the state
in map to go to the result of the certain state, and zoom in the result by
the state locate, and when mouse over the state, display the park name */