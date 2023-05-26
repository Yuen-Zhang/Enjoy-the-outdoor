"use strict";
//shorter way to call id,class...
const $  = document.querySelectorAll.bind(document);

//the add to list number keeps in all pages
try{
    document.getElementById("favnum").innerHTML=
        localStorage.getItem("myObject")==""?0
        :localStorage.getItem("myObject").split("#$#").length
}catch(e){

}
