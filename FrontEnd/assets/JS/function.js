
/**
 * création des figures selon leur destination (portfolio ou galerie photo )
 * valeur par default de mode="portfolio"
 * 
 * @param {[{}]} lst tableau d'enregistrements 
 * @param {string} mode  "portfolio" aff. portfolio ou "edit" aff. galerie modale 
 * @returns 
 */

function show_gallery(lst=lst_works,mode="portfolio") {
  cible=document.getElementById("gallery")
  
    //console.log(lst)
    
  let work_cards=[]
  if(mode==="portfolio"){
    cible.innerHTML=""
    for ( work of lst){
      const fig = new work_card(work,mode)
      fig.show(cible)
    }
  }else{
    for ( work of lst){
      const elt={elt:new work_card(work,mode)._workCard,att:[{name:"class",val:"modale__gallery__figure"}]}
      //work_cards.push(new work_card(work,mode))
      work_cards.push(elt)
    }
    return work_cards
  }
}


/*
async function AffGalerie(){
  if(lst_works===null){
    lst_works= await GetApiWorks()
  }else{
    show_gallery()
  }
}
*/

/**
 * convertion du Set Menus_items en tableau 
 * @returns {[[string,string]]} 
 */
function convSetOnTab(){
  let lst=[]
  filtres=Menu_items
  const lst_filtre = Array.from(filtres)
  lst_filtre.forEach(element => { 
    lst.push(element.split(';'))
  })
  return lst
}


/**
 * parcours de l'ensemble des works pour alimenter le set Menu_items de catégorie 
 * auquel on ajoute un premier element d'id '0' et nom 'Tous' 
 */
function ExtractCategories(){
  Menu_items.add("0;Tous")
  for ( work of lst_works){
    Menu_items.add(`${work.category.id};${work.category.name}`)
  }
}

function show_filtre(){
  if(Menu_items.size===0)ExtractCategories()
  const fltr = new filtres( document.getElementById("blk_filtre"), convSetOnTab())
  fltr.showFiltre()
}
  
/**
 * Bascule des styles et EventListener du bouton actif avant et après l'evenement
 * @param {Event} e Event
 */

  function toggleFiltreActif(e){
    const btOld=document.getElementById(`filtre_${filtre_actif}`)
    e.target.setAttribute("class","filtre actif")
    btOld.setAttribute("class","filtre clickable")
    e.target.removeEventListener("click",appFiltre)
    btOld.addEventListener("click",appFiltre)
  
  }

  /**
   * Filtrage des projets en fonction de la catégorie
   * @param {Event} e 
   */
  
  function appFiltre(e){
    const cat=e.target.getAttribute("data-value")*1
    toggleFiltreActif(e)
    filtre_actif=cat
    if(cat===0){
      //console.log(lst_works)
      show_gallery(lst_works)
    }else{
      show_gallery(lst_works.filter((elt) => elt.categoryId===cat))
    }
  }

  function newProjet(e){
      //ajoutPhoto()
      alert("nouveau projet")
  }


  function MajAfterdel(id,elt){
    elt=document.getElementById(`ed_${id}`)
    document.getElementById("main").removeChild(elt)
    elt=document.getElementById(`pf_${id}`)
    document.getElementById("gallery").removeChild(elt)
    lst_works.splice(lst_works.findIndex((elt)=>elt.id=id), 1)
    window.localStorage.setItem("lst_works", JSON.stringify(lst_works))
  }

  function DelProjet(e){
    const id = parseInt(e.target.getAttribute("data-value"))
    if(confirm(`Souhaitez poursuivre la suppression projet ${id}`)){
      ApiDelWork(id, e.target)
    }
  }

  function CloseModale(e){
    document.getElementById("modale").setAttribute("style","display:none;")
  }


  /**
   * Creation d'une liste d'options
   * @returns 
   */
function creatListOptions(){
  const tab= Array.from(convSetOnTab())
  let opts=[]
  tab[0]=['0',""]
  tab.forEach(elt => {
    opts.push({text:elt[1], attr:[{name:"text"},{val:elt[1]},{name:"value"},{val:elt[0]}]})
  })
  return opts
}



  /**
   * creation du formulaire d'ajout de photo
   * 
   */
  function CreatFormAjout(){
    let form= new Form()
    let blk=form.Addblock([{name:"class",val:"modAjout"}],form._form)
    let blk2=form.Addblock([{name:"class",val:"modAjout__upload"}],blk)
    let blk3=form.Addblock([],blk2)
    let elt=null
    form.AddElt("i",[{name:"class",val:"fa-regular fa-image modAjout__ImgFile"}],blk3)
    blk3=form.Addblock([{name:"class",val:"modAjout__selFile"}],blk2)
    form.AddElt("input",[{name:"type",val:"file"},{name:"id",val:"file"},{name:"class",val:"modAjout__inputFile"}],blk3)
    elt=form.AddElt("label",[{name:"for",val:"file"},{name:"class",val:"modAjout__labelFile clickable"}],blk3)
    form.addText("+ Ajout photo",elt)
    elt=form.AddElt("label",[{name:"class",val:"modAjout__accept"}],blk3)
    form.addText("jpg, png : 4mo max",elt)
    blk2=form.Addblock([{name:"class",val:"modAjout__block"}],blk)
    elt=form.AddElt("label",[{name:"for",val:"title"},{name:"class",val:"modAjout__forsel"}],blk2)
    form.addText("Titre",elt)
    elt=form.AddElt("input",[{name:"type",val:"text"}],blk2)
    blk2=form.Addblock([{name:"class",val:"modAjout__block"}],blk)
    elt=form.AddElt("label",[{name:"for",val:"categorie"},{name:"class",val:"modAjout__forsel"}],blk2)
    form.addText("Categorie",elt)
    form.AddSelect([{name:"id",val:"categorie"}],creatListOptions(),blk2)
    return form._form
  }


/**
 * Affichage de la fenetre modale en mode galerie
 */

function editGalerie(){
  if(modale_galerie === null){
    options_modale_galerie.main.innerhtml=(show_gallery(lst_works,"edit"))
    modale_galerie= new modale(document.getElementById("modale-contener"),"galerie",options_modale_galerie)
    modale_galerie.showModale()
  }else{
    modale_galerie.ChangeHtmlContent(show_gallery(lst_works,"edit",null))
    modale_galerie.addEvent([{evt:"click",fct:formAjoutPhoto}],document.getElementById("bt_Ajout"))
    modale_galerie.addClass("hidden",document.getElementById("btBack"))
    modale_galerie.ChangeText("Galerie",document.getElementById("Galerie_title"))
    modale_galerie.ChangeText("Ajout photo",document.getElementById("bt_Ajout"))
    modale_galerie.addClass("clickable",document.getElementById("bt_Ajout"))
    modale_galerie.removeClass("bgColorGrey",document.getElementById("bt_Ajout"))
  }
  modale_galerie.setAttr([{name:"class",val:"modale__gallery"}],document.getElementById('main'))
  modale_galerie._modale.setAttribute("style","")

  
}



/**
 * Bascule la fenetre modale en mode ajout d'image.
 */
function formAjoutPhoto(){
  const main=document.getElementById("main")
  if(form===null){
     form=CreatFormAjout()
  }
    CreatFormAjout()
  //main.innerText="" 
  modale_galerie.appendBlock(form,main)
  modale_galerie.setAttr([{name:"class",val:"modale__Ajout"}],document.getElementById('main'))
  modale_galerie.ChangeText("Ajout photo",document.getElementById("Galerie_title"))
  modale_galerie.ChangeText("Valider",document.getElementById("bt_Ajout"))
  modale_galerie.removeClass("hidden",document.getElementById("btBack"))
  modale_galerie.addClass("bgColorGrey",document.getElementById("bt_Ajout"))
  modale_galerie.removeClass("clickable",document.getElementById("bt_Ajout"))
  modale_galerie.removeEvent([{evt:"click",fct:formAjoutPhoto}],document.getElementById("bt_Ajout"))
}