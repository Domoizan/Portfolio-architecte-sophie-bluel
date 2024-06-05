
/* Durée de validité de StorLstWorks en ms */
const validityTime=(3600*1000) // 1 heure => 60 * 60 * 1000 = 3600000ms
/* Liste des travaux */
/**
 * Heure d'enregitrement et liste des works
 * @var {
 *      {
 *          timeEnrg: "timestamp", 
 *          lst_works:[{work}] 
 *      }
 * } storLstWorks
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

// liste des extension et libellés acceptées sous forme de chaine 
/**
 * 
 * @returns {string} liste des extension issues du tableau typeFile
 */
const Ext_type_accept = ()=>{
    let res=""
    typeFile.forEach((elt) => {
        res+=(res==="")?`${elt.split('/')[1]}`:`, ${elt.split('/')[1]}`
    })
    return res
}

/**
 * 
 * @returns {string} liste des libellés issues du tableau typeFile 
 */
const lib_type_accept = ()=>{
    let res=""
    typeFile.forEach((elt) => {
        res+=(res==="")?`${elt}`:`, ${elt}`
    })
    return res
}

//info sur les types et taille de fichier acceptés dans le formulaire ajout photo
const infoImg=`${Ext_type_accept()} : ${maxSize} ${unit[idxUnitMaxSize]}`



/**
 * info user authentifié
 * @var {userid:number,token:'md5sum'} user 
 */
let user=JSON.parse(window.localStorage.getItem("user"))
/* liste categories */
let LstCat=[]
/* utilisée pour stocker la liste des catégories  */
let Menu_items = new Set()
/* filtre actif */
let filtre_actif = 0

/*
 validEng est utilisé en mode binaire pour valider les champs de formulaire ajout photo et activer le bouton Valider
 image => 1
 Title => 2
 category => 4
 le bouton est activé quand validEng = 7
 aprés controle de validité de la valeur entrée dans l'un des champ, 
 validEng est affecté en binaire de la facon suivante

 entrée valide      => validEng = validEng OU valeur du champ    
 entrée non valide  => validEng = validEng ET (7-valeur du champ) 

 dans les deux cas, seul le bit correspondant au champ est affecté et bascule entre 0 et 1 selon le cas de figure.

*/
let validEng=0 
let blkImg=[] // stockage des elemnents du block de selection de fichier avant preview image
let fileEnrg=null // sauvegade de file[0] avant preview
let modale_galerie=null // HtmlElement contenant la galerie des works en mode edition
let form=null // HtmlElement contenant le formulaire d'ajout de photo

// refresh est un booleen qui est vrai si storLstWorks existe dans le localstorage et que sa durée de
// validité a expiré ce qui declenchera un nouvel appel a l'api pour recharger le liste des projets
const refresh=(storLstWorks!==null && ((Date.now() - parseInt(storLstWorks.timeEnrg)) > validityTime))?true:false
