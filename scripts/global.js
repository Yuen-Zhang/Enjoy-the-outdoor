const $  = document.querySelectorAll.bind(document);

try{
    document.getElementById("favnum").innerHTML=
        localStorage.getItem("myObject")==""?0
        :localStorage.getItem("myObject").split("#$#").length
}catch(e){

}
