"use strict";

//declear and assign value
    let mountList=[];
    const showMyList = document.getElementById("myfavlist");
    showMyList.innerHTML = `<div"></div>`

    let mainList=document.createElement("div")
// using getItem to get the data
    if(localStorage.getItem("myObject")!=null&&localStorage.getItem("myObject")!="") {//check if there is data storage in the local storage
        mountList = localStorage.getItem("myObject").split("#$#");//get the data from local storage
    }
       
// put the list back to html to show
    for(let i=0;i<mountList.length;i++){
        let obj=JSON.parse(mountList[i])
        // template of how to display
        console.log(obj)
        if(obj.type=="park"){
            mainList.innerHTML+=`<div class="card">
            <div class="row">
                <div class="col">
                    <h3 id="name${i}" class="myfav">${obj.LocationName}</h3>
                </div>
                <div class="col">
                    <p>Address: ${obj.Address}</p>
                    <p>City: ${obj.City}</p>
                    <p>State: ${obj.State}</p>
                    <p>Zipcode: ${obj.ZipCode}</p>
                </div>
                <div class="col">
                    <a type="btn" class="btn btn-secondary" id="btn${i}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>                                    
                    </a>
                </div>
            </div>
        </div>`;  
        }else{
            mainList.innerHTML+= `<div class="card">
            <div class="row">
                <div class="col">
                    <h3 id="name${i}" class="myfav">${obj.name}</h3>
                </div>
                <div class="col">
                    <p>Elevation: ${obj.elevation}</p>
                    <p>Mode: ${obj.effort}</p>
                </div>
                <div class="col">
                    <a type="btn" class="btn btn-secondary" id="btn${i}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>                                    
                    </a>
                </div>
            </div>
        </div>`;  
        }
        showMyList.appendChild(mainList)
    }
    
    //display the fav list clear button
    if(mountList.length!=0){
        showMyList.innerHTML += `<div  style="text-align: center;">
                                <a type="btn" class="btn btn-secondary" id="toclear">Clear</a>
                                </div>`;
        $("#toclear")[0].addEventListener("click",function(){
            localStorage.removeItem("myObject");
            //document.location.href="./favlist.html";
            showMyList.innerHTML="";
            mountList=[];//return an empty array
            showMyList.innerHTML += `<div style="text-align: center;"><h3>Empty List</h3></div>`
        })
    }else{
        showMyList.innerHTML += `<div style="text-align: center;"><h3>Empty List</h3></div>`
    }
        

// to remove item from the list
    for(let i=0; i<mountList.length; i++){
        let btn=$("#btn"+i)[0]
        btn.addEventListener("click",function(){
            // localStorage.removeItem(mountList)
            mountList.splice(i,1)
            localStorage.setItem("myObject", mountList.join("#$#"));
            document.location.href="./favlist.html" 
        })
    }
