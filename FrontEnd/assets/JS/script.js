
/* Durée de validité de StorLstWorks en ms */
const validityTime=(3600*1000)
/* Liste des travaux */
/**
 * @var {{}}storLstWorks
 */
let storLstWorks=JSON.parse(window.localStorage.getItem("storLstWorks"))
let lst_works=(storLstWorks!==null)?storLstWorks.lst_works:null
/* constantes liées aux fichiers images */
const unit=["o","Ko","Mo","Go","To"] //unité de taille de fichier
const idxUnitMaxSize = 2 // index de l'unité de taille de maxSize
const maxSize = 4 // taille max du ficher dans l'unité selectionnée
const typeFile = [    // liste des type de fichier acceptés
    "image/jpeg",
    "image/png"
]

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
    },
    err:{
        id:"msgErr",
        class:"modale__err"
    }
}

let validEng=0
let blkImg=[] // permet de garder le block de selection de fichier
let fileEnrg=null //sauvegade de file[0] avant preview
let modale_galerie=null
let form=null
const refresh=(storLstWorks!==null && ((Date.now() - parseInt(storLstWorks.timeEnrg)) > validityTime))?true:false

/* Affichage de la galerie */
//AffGalerie()

if(lst_works===null || refresh){
    //console.log("lst_works===null")
    GetApiWorks()
  }else{
    //console.log("lst_works!==null")
    show_gallery()
  }

/*
    affichage des filtres est masquage des liens "modifier" en l'absence de "user" 
    dans le localStorage => utilisateur non Authentifié
*/

if(user===null){
    if(lst_works!==null && !refresh)show_filtre()
    document.getElementById("edit").classList.add("hidden")
    document.getElementById("edit_intro").classList.add("hidden")
}else{
    document.getElementById("edit").classList.remove("hidden")
    document.getElementById("edit_intro").classList.remove("hidden")
    document.getElementById("edit").addEventListener("click",editGalerie)
    document.getElementById("login").innerHTML="Logout"
    //document.getElementById("login").removeChild(document.getElementById("login").firstChild)
    //document.getElementById("login").appendChild(document.createTextNode("Logout"))
}

// navigation au clavier 


const focusInModale = function (e){
    e.preventDefault()
    console.log(document.getElementById("content").querySelector('img'))
}


window.addEventListener("keydown", (e) => {
        
        if(e.key === "Escape" || e.key === "Esc"){
            CloseModale(e,"esc")
        }
        /*
        if(e.key === 'Tab' && modale_galerie !==""){
            console.log("keydown tab" ) 
            focusInModale(e)
        }
        */
        
    }
)

