
/* Liste des travaux */
let lst_works=JSON.parse(window.localStorage.getItem("lst_works"))
const user=JSON.parse(window.localStorage.getItem("user"))


/* Liste des categories */
let Menu_items = new Set()
/* filtre actif */
let filtre_actif = 0



if(lst_works===null){
    GetApiWorks()
}else{
    show_gallery()
}

if(user===null){
    show_filtre()
    document.getElementById("edit").classList.add("hidden")
}else{
    document.getElementById("edit").classList.remove("hidden")
}


 








//window.location.href = "https://www.toutjavascript.com/reference/ref-window.location.href.php"