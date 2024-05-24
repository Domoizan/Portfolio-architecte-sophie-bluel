
/* Liste des travaux */
let lst_works=JSON.parse(window.localStorage.getItem("lst_works"))
/* info user connecté */
/**
 * info user authentifié
 * @var {userid:number,token:'md5sum'} user 
 */
let user=JSON.parse(window.localStorage.getItem("user"))
/* liste categories */
let LstCat=JSON.parse(window.localStorage.getItem("LstCat"))
/* utilisée pour stocker la liste des catégories  */
let Menu_items = new Set()
/* filtre actif */
let filtre_actif = 0
/* options fenetre modale pour la galerie photo + ajout et suppr. photo*/
const options_modale_galerie={
    modale : {
        id:"modale",
        class:"modale"
    },
    content:{
        id:"content",
        class:"modale__content"
    },
    header:{
        id:"header",
        class:"modale__header",
        title:"Galerie",
        bt:[{
            id:"btClose",
            class:"btClose clickable",
            content:'<i class="fa-solid fa-xmark"></i>',// Libellé du bouton ou icone 
            evtfct:[{ evt:"click", fct: CloseModale }] /* tableau d'objet [{ evt:"event", fct:function ] }*/
            },{
            id:"btBack",
            class:"btBack clickable hidden",
            content:'<i class="fa-solid fa-arrow-left"></i>',// Libellé du bouton ou icone 
            evtfct:[{ evt:"click", fct: editGalerie }] /* tableau d'objet [{ evt:"event", fct:function ] }*/  
            }]
    },
    main:{
        id:"main",
        class:"modale__gallery",
        innerhtml:null //HTMLElement du contenu a afficher
    },
    separateur:{
        id:"sep",
        class:"modale__hr",
    },
    footer:{
        id:"footer",
        class:"modale__footer"
    },
    cta:{
        id:"bt_Ajout",
        class:"modale__button clickable",
        content:"Ajout photo",
        evtfct:[{ evt:"click", fct: formAjoutPhoto }] /* tableau d'objet [{ evt:"event", fct:function ] }*/
    }
}

let modale_galerie=null
let form=null






/* Affichage de la galerie */
//AffGalerie()

if(lst_works===null){
    console.log("lst_works===null")
    GetApiWorks()
  }else{
    console.log("lst_works!==null")
    show_gallery()
  }


/*
    affichage des filtres est masquage des liens "modifier" en l'absence de "user" 
    dans le localStorage => utilisateur non Authentifié
*/

if(user===null){
    if(lst_works!==null)show_filtre()
    document.getElementById("edit").classList.add("hidden")
    document.getElementById("edit_intro").classList.add("hidden")
}else{
    document.getElementById("edit").classList.remove("hidden")
    document.getElementById("edit_intro").classList.remove("hidden")
    document.getElementById("edit").addEventListener("click",editGalerie)
    document.getElementById("login").removeChild(document.getElementById("login").firstChild)
    document.getElementById("login").appendChild(document.createTextNode("Logout"))
}