"use strict";    
//declear & assign value
    const $ = document.querySelectorAll.bind(document);
    const mainSelectionDiv = $("#mainselectiondiv")[0];
    const secondSelectionLoc = $("#locationselection")[0];
    const secondSelectionLocDiv = $("#secondselectionloc")[0];
    const thirdSelectionLoc = $("#locparkselection")[0];
    const thirdSelectionLocDiv = $("#thirdselectionloc")[0];
    const secondSelectionType = $("#parkselection")[0];
    const secondSelectionTypeDiv = $("#secondselectiontype")[0];
    const thirdSelectionType = $("#typeparkselection")[0];
    const thirdSelectionTypeDiv = $("#thirdselectiontype")[0];
    const listToDisplay = $("#displaylist")[0];
    let fav = new Array();
    let searchInput = $("#data-search")[0];
    let searchBtn = $("#searchbtn")[0];
//get data/array from other js file
    import { locationsArray, parkTypeArray} from "./data-scripts/locationData.js";
    import { nationalParksArray } from "./data-scripts/nationalParkData.js";
    import { fillDisplayDiv } from "./framework.js/htmlinjs.js";

    fav=[...(localStorage.getItem("myObject")==""||localStorage.getItem("myObject")==null)
            ?[]
            :localStorage.getItem("myObject").split("#$#")]

//selction of radio button all / location / type
// to modified: no need the confirm button, change by switch option,
//  and will clear the list when option change
    mainSelectionDiv.addEventListener("click", function() {
        listToDisplay.innerHTML="";
        secondSelectionLoc.innerHTML="";
        secondSelectionType.innerHTML="";


        const mainSelection = $("input[name='mainselection']:checked")[0];
        try{
            if (mainSelection.value == "location") {
                //if selected location show the state list
                secondSelectionLocDiv.classList.remove("d-none");
                secondSelectionTypeDiv.classList.add("d-none");
                thirdSelectionLocDiv.classList.add("d-none");
                thirdSelectionTypeDiv.classList.add("d-none");
                selectionList(locationsArray, "locationselection");
            }else if (mainSelection.value == "parktype") {
                //if selected park type show the type selection
                secondSelectionLocDiv.classList.add("d-none");
                thirdSelectionLocDiv.classList.add("d-none");
                secondSelectionTypeDiv.classList.remove("d-none");
                thirdSelectionTypeDiv.classList.add("d-none");
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
//default clik all
    $("#all")[0].click()

//the result by select different state

    secondSelectionLoc.addEventListener("change", function() {
        thirdSelectionLoc.innerHTML="";
        let parkInState = [];
        let parkList = nationalParksArray.length;
        thirdSelectionLocDiv.classList.remove("d-none");
        thirdSelectionTypeDiv.classList.add("d-none");
        for (let index = 0; index < parkList; index++) {//search state match selector, push parkInState[].
            if (nationalParksArray[index].State === this.value){
                parkInState.push(nationalParksArray[index]); //push parkInState[].
            }
        }
        selectionListObj(parkInState, "locparkselection")
        displayTheList(parkInState);
        thirdSelectionLoc.addEventListener("change", function() {
            let parkByName = [];
            let parkNameList = parkInState.length;
            for (let index = 0; index < parkNameList; index++) {
                if (parkInState[index].LocationName == thirdSelectionLoc.value) {
                    parkByName.push(parkInState[index]);
                }                
            }
            console.log(parkByName);
            displayTheList(parkByName);
        })
    });
    

// the result by select different type
    secondSelectionType.addEventListener("change", function() {
        thirdSelectionType.innerHTML="";
        let parkByType = [];
        let keyWord = this.value;
        let parkList = nationalParksArray.length;
        thirdSelectionLocDiv.classList.add("d-none");
        thirdSelectionTypeDiv.classList.remove("d-none");
        for (let index = 0; index < parkList; index++) {
           if (nationalParksArray[index].LocationName.indexOf(keyWord) >= 0) {
            parkByType.push(nationalParksArray[index]);
           }
            
        }
        selectionListObj(parkByType, "typeparkselection")
        displayTheList(parkByType);
        thirdSelectionType.addEventListener("change", function() {
            let parkByName = [];
            let parkNameList = parkByType.length;
            for (let index = 0; index < parkNameList; index++) {
                if(parkByType[index].LocationName == thirdSelectionType.value) {
                    parkByName.push(parkByType[index]);
                }
            }
            displayTheList(parkByName);
        })
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

//function for selection in array list with object
function selectionListObj(_array, _selection) {
    const exampleList = $("#"+_selection)[0];
    //add a default selection
    const allValue=new Option("select form the list");
    exampleList.appendChild(allValue);
    for (let index = 0; index < _array.length; index++) {
        let theSelection = new Option(_array[index].LocationName);
        exampleList.appendChild(theSelection);
    }
    return exampleList;
}


//function to display the park list
    function displayTheList(_array) {
        // display in card
        let theDisplayList = `<div class="card">`;
        
        let checkData=data=>data!==undefined&&data!=0?data:"N/A";//check _array[index] in nationalParkData location which == 0 
        let checkWebsite=data=>data!==undefined&&data!=0?data:"style='pointer-events:none'";
        let arrayList = _array.length;
        for (let index = 0; index < arrayList; index++) {
            const obj = _array[index]; // function for display the park list in detail
            obj.index = index;// put a index to each div to contorl different collapse   e: collapse1 .. collapse 2... 
            obj.detail = 
                    `<div class="parkdetailinfo row">
                        <div class="col offset-2">
                            <p><label>Address:</label> ${checkData(obj.Address)}, ${obj.City}, ${obj.State}, ${checkData(obj.ZipCode)}</p>
                            <p><label>Phone:</label> ${checkData(obj.Phone)}</p>
                            <p><label>Fax:</label> ${checkData(obj.Fax)}</p>
                            <p><label>Visit:</label> <a href="${checkData(obj.Visit)}" ${checkWebsite(obj.Visit)} class="disabled" target="_blank">${checkData(obj.Visit)}</a></p>
                        </div>
                    </div>`
            theDisplayList += fillDisplayDiv(obj)
        } //fillDisplayDiv function import from the html in js file
        theDisplayList += `</div>`;        
        listToDisplay.innerHTML = theDisplayList;
        //add event listener to the tofav button
        let toFav = document.getElementsByClassName("tofav");
        for(let dom of toFav) {
            dom.addEventListener("click", () => {
                add2Fav(dom.id.replace("btn", ""));
            })
        }
    }    
        //search function
        searchBtn.addEventListener("click", (e) => {
            //e.preventDefault()
            const value = $("#data-search")[0].value.toUpperCase();
            let searchArr = new Array();
            if(value.length>=2){
                for (let index = 0; index < nationalParksArray.length; index++) {
                    let tempLoc=nationalParksArray[index].LocationName.toUpperCase();
                    let tempCity=nationalParksArray[index].City.toUpperCase();
                    let tempState=nationalParksArray[index].State.toUpperCase();
                    if((tempLoc.indexOf(value)>=0 || tempCity.indexOf(value)>=0 || tempState.indexOf(value)>=0)) {
                        searchArr.push(nationalParksArray[index]);
                    } 
                } 
                displayTheList(searchArr);
                if(searchArr.length == 0) {
                    alert("Place Not Found")
                }
            }else{
                alert("Text too Short. Please Put at Least 2 Characters!");
            }
            
        })

    
    
    
    
// function for display message when mouseover(tooltip), set location and message @ the html
        let detialInfoButton = $("mousehopover");
        detialInfoButton.forEach(t => {
            new bootstrap.Tooltip(t)
        })
    



// add to fav function
    function add2Fav(id) {
        for(let place of nationalParksArray) {
            //alert(fav.indexOf(id))
            let newPlace={...place};
            newPlace.type="park";
            delete newPlace.detail;

            let tempPlace=JSON.stringify(newPlace)

            if(newPlace.LocationID == id && !fav.includes(tempPlace)) {
                
                fav.push(tempPlace);
                $("#favnum")[0].innerText = fav.length;
                localStorage.setItem("myObject",fav.join("#$#"))
            }
        }
        //localStorage.setItem("fav3",fav)
    }

for(let obj of $(".tofav")){
    obj.addEventListener("click", function(){
        add2Fav(LocationID);
    })
}