
/* Liste des travaux */
let lst_works=JSON.parse(window.localStorage.getItem("lst_works"))
/* info user connecté */
const user=JSON.parse(window.localStorage.getItem("user"))

/* utilisée pour stocker la liste des catégories */ 
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
            evtfct:[{ evt:"click", fct: newProjet }] /* tableau d'objet [{ evt:"event", fct:function ] }*/  
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
        evtfct:[{ evt:"click", fct: newProjet }] /* tableau d'objet [{ evt:"event", fct:function ] }*/
    }
}



/*
    Appel API en l'absence "lst_works" dans le localStorage 
*/
if(lst_works===null){
    GetApiWorks()
}else{
    show_gallery()
}

/*
    affichage des filtres est masquage du lien "modifier" en l'absence de "user" dans le localStorage
    utilisateur non Authentifié
*/
if(user===null){
    show_filtre()
    document.getElementById("edit").classList.add("hidden")
}else{
    document.getElementById("edit").classList.remove("hidden")
}



options_modale_galerie.main.innerhtml=(show_gallery(lst_works,"edit"))
const modale_galerie= new modale(document.getElementById("modale-contener"),"galerie",options_modale_galerie)
modale_galerie.showModale()


//<i class="fa-regular fa-image"></i> image