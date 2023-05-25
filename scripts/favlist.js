import { mountainsArray } from "./data-scripts/mountainData.js";
import { nationalParksArray } from "./data-scripts/nationalParkData.js";

    let html=localStorage.getItem("fav2").split(",")


    let htmls=""
    for(let i=0;i<html.length;i++){
        for(let j=0;j<mountainsArray.length;j++){
            if(html[i]==mountainsArray[j].name){
                let obj=mountainsArray[j]
                htmls+=`<li id="name${i}" class="myfav">${obj.name}</li>`;
                break;
            }
        }
    }
    
    document.getElementById("myfavlist").innerHTML=`<ul>${htmls}</ul>`;
    
    for(let i=0;i<html.length;i++){

        document.getElementById("name"+i).addEventListener("click",function(){
           // alert(i)
        })
    }
