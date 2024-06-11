
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
      const card = new work_card(work,mode)
      card.show(cible)
    }
  }else{
    for ( work of lst){
      const card={elt:new work_card(work,mode)._workCard,att:[{name:"class",val:"modale__gallery__figure"}]}
      //work_cards.push(new work_card(work,mode))
      work_cards.push(card)
    }
    return work_cards
  }
}

/**
 * convertion du Set Menus_items en tableau 
 * @returns {[[string,string]]} 
 */

function convSetOnTab(){
  let lst=[]
  const lst_filtre = Array.from(Menu_items)
  lst_filtre.forEach(element => { 
    lst.push(element.split(';'))
  })
  return lst
}


/**
 * parcours de l'ensemble des works pour alimenter le set Menu_items de catégorie 
 * auquel on ajoute un premier element d'id '0' et nom 'Tous' 
 * ne contient que les categories associées à 1 ou plusieurs projets
 */

function ExtractCategories(){
  Menu_items.add("0;Tous")
  for ( work of lst_works){
    Menu_items.add(`${work.category.id};${work.category.name}`)
  }
}

/**
 * affichage des boutons de filtrage des projets 
 */

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



/**
 * Mise a jour de l'affichage des galeries, de lst_works et storLstWorks après une suppression
 * @param {number} id id du projet supprimé 
 */
  function MajAfterdel(id){
    elt=document.getElementById(`ed_${id}`)
    document.getElementById("main").removeChild(elt)
    elt=document.getElementById(`pf_${id}`)
    document.getElementById("gallery").removeChild(elt)
    lst_works.splice(lst_works.findIndex((elt)=>elt.id===id), 1)
    storLstWorks={
      timeEnrg : Date.now(),
      lst_works : lst_works
    }
    window.localStorage.setItem("storLstWorks", JSON.stringify(storLstWorks))
    alert("Suppression réussie")
  }


  /**
   * Suppression du projet a l'origine de l'evenement e
   * @param {event} e 
   */
  function DelProjet(e){
    const id = parseInt(e.target.getAttribute("data-value"))
    if(confirm(`Souhaitez poursuivre la suppression projet ${id}`)){
      ApiDelWork(id)
    }
  }


  /**
   * fermeture de la fenetre modale
   * @param {event} e 
   * @param {string} org type de l'evenement
   * @returns 
   */
  function CloseModale(e,org){
    if(modale_galerie === null) return
    if(e.target.id !=="modale" && org==="click") return
    e.preventDefault()
    document.getElementById("modale").setAttribute("style","display:none;")
    document.getElementById("modale").removeEventListener("click",CloseModale)
  }


  /**
   * Creation du tableau pour l'argument  liste d'options pour l'argument lstOpts de form.AddSelect
   * qui genere le select Category depuis LstCat qui contient toutes les catégories utilisées et non utilisées
   * @returns {[{text:"string",attr:[{name:"string",val:number}]}}
   */
  
function creatListOptions(){
  let tab=LstCat
  let opts=[]
  tab.unshift(['0',""])
  tab.forEach(elt => {
    opts.push({text:elt[1], attr:[{name:"value",val:elt[0]}]})
  })
  return opts
}



  /**
   * creation du formulaire d'ajout de photo
   * 
   */
  function CreatFormAjout(){
    let form= new Form("PhotoForm")
    let blk=form.Addblock([{name:"class",val:"modAjout"}],form._form)
    let blk2=form.Addblock([{name:"id",val:"Blk_img"},{name:"class",val:"modAjout__upload"}],blk)
    let blk3=form.Addblock([],blk2)
    let elt=null
    form.AddElt("i",[{name:"class",val:"fa-regular fa-image modAjout__ImgFile"}],blk3)
    blk3=form.Addblock([{name:"class",val:"modAjout__selFile"}],blk2)
    form.AddElt("input",
      [
      {name:"type",val:"file"},
      {name:"id",val:"file"},
      {name:"name",val:"file"},
      {name:"class",val:"modAjout__inputFile"},
      {name:"accept",val:lib_type_accept()}
      ],
      blk3,
      [{evt:"change",fct:ctrlFile}])
      elt=form.AddElt("label",[
      {name:"for", val:"file"},
      {name:"class", val:"modAjout__labelFile clickable"},
      {name:"tabindex",val:"0"}
      ],
      blk3)
    form.addText("+ Ajout photo",elt)
    elt=form.AddElt("label",[{name:"class",val:"modAjout__accept"}],blk3)
    form.addText(infoImg,elt)

    blk2=form.Addblock([{name:"class",val:"modAjout__block"}],blk)
    elt=form.AddElt("label",[{name:"for",val:"title"},{name:"class",val:"modAjout__forsel"}],blk2)
    form.addText("Titre",elt)
    elt=form.AddElt("input",[
      {name:"type",val:"text"},
      {name:"id",val:"title"},
      {name:"name",val:"title"},
      {name:"tabindex",val:"0"}
      ],
      blk2,
      [{evt:"change",fct:ctrlEmptyTitle}]
    )
    blk2=form.Addblock([{name:"class",val:"modAjout__block"}],blk)
    elt=form.AddElt("label",[{name:"for",val:"categorie"},{name:"class",val:"modAjout__forsel"}],blk2)
    form.addText("Categorie",elt)
    form.AddSelect([
      {name:"id",val:"category"},
      {name:"name",val:"category"},
      {name:"tabindex",val:"O"}],
      creatListOptions(),
      blk2,
      [{evt:"change",fct:ctrlSelct}]
    )
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
    document.getElementById("btBack").setAttribute("tabindex","0")
    document.getElementById("btClose").setAttribute("tabindex","0")
  }else{
    modale_galerie.ChangeHtmlContent(show_gallery(lst_works,"edit",null))
    modale_galerie.addEvent([{evt:"click",fct:formAjoutPhoto}],document.getElementById("bt_Ajout"))
    modale_galerie.addClass("hidden",document.getElementById("btBack"))
    modale_galerie.ChangeText("Galerie",document.getElementById("Galerie_title"))
    modale_galerie.ChangeText("Ajout photo",document.getElementById("bt_Ajout"))
    modale_galerie.addClass("clickable",document.getElementById("bt_Ajout"))
    modale_galerie.removeClass("bgColorGrey",document.getElementById("bt_Ajout"))
    document.getElementById("bt_Ajout").removeEventListener("click",sendForm)
    document.getElementById("msgErr").innerHTML=""
  }
  modale_galerie.setAttr([{name:"class",val:"modale__gallery"}],document.getElementById('main'))
  modale_galerie._modale.setAttribute("style","")
  modale_galerie._modale.addEventListener("click", (e)=>CloseModale(e,"click"))
}



/**
 * Bascule la fenetre modale en mode ajout d'image.
 */
function formAjoutPhoto(){
  const main=document.getElementById("main")
  validEng=0
  if(form===null){
     form=CreatFormAjout()
  }
  //main.innerText="" 
  modale_galerie.appendBlock(form,main)
  const selImg=document.getElementById("Blk_img")
  if(blkImg.length !== 0){
    selImg.innerHTML=""
    blkImg.forEach((elt)=>selImg.appendChild(elt))
  } 
  document.getElementById("category").selectedIndex=0
  document.getElementById("title").value=""
  document.getElementById("msgErr").innerHTML="Tous les champs doivent être reseignés"
  modale_galerie.setAttr([{name:"class",val:"modale__Ajout"}],document.getElementById('main'))
  modale_galerie.ChangeText("Ajout photo",document.getElementById("Galerie_title"))
  modale_galerie.ChangeText("Valider",document.getElementById("bt_Ajout"))
  modale_galerie.removeClass("hidden",document.getElementById("btBack"))
  modale_galerie.addClass("bgColorGrey",document.getElementById("bt_Ajout"))
  modale_galerie.removeClass("clickable",document.getElementById("bt_Ajout"))
  modale_galerie.removeEvent([{evt:"click",fct:formAjoutPhoto}],document.getElementById("bt_Ajout"))
  modale_galerie.addEvent([{evt:"click",fct:sendForm}],document.getElementById("bt_Ajout"))
  document.getElementById("PhotoForm").reset()
}


/**
 * Affichage de l'image selectionnée dans formulaire ajout photo
 * @param {{}}} file 
 * @param {HTMLElement} cible 
 */
function imgPreview(file,cible){
  blkImg=[]
  // sauvegarde de la section selfichier
  while (cible.firstChild) {
    blkImg.push(cible.firstChild) 
    cible.removeChild(cible.firstChild);
  }
  let image=document.createElement("img")
  image.src=URL.createObjectURL(file)
  image.classList.add("modAjout__imgPreview")
  cible.appendChild(image)
}



/**
 * 
 * @param {number} val taille de l'image en octet
 * @returns {number} index de l'unité la plus grande pour val
 */
function defUnit(val){
  let idx=0
  while((val / Math.pow(1024,idx)) > 1){idx++}
  return idx-1
}


/**
 * Fonctionn appelée sur event "change" de l'input file du formulaire d'ajout"
 * maxSize est défini dans une constante et correpond a la taille max acceptée pour le ficher 
 * TypeFile est une constante de type tableau qui contient les type mime accepté sous forme de chaine
 * alerte l'utilisateur si le fichier n'est pas conforme en taille ou en type
 * 
 * @param {*} e 
 */
function ctrlFile(e){
const files= e.target.files
//document.getElementById("preview").innerText=''
try{
  if(files.length === 0 || files[0]===null)throw "Aucun Fichier selectionnée"
  //const taille = Math.round((files[0].size*100) / Math.pow(1024,idxUnitMaxSize))/100
  if( files[0].size > ( maxSize * Math.pow(1024,idxUnitMaxSize))){
      const taille = Math.round((files[0].size*100) / Math.pow(1024,idxUnitMaxSize))/100
      let msg=`Fichier trop volumineux : ${taille} ${unit[defUnit(files[0].size)]} > ${maxSize} ${unit[idxUnitMaxSize]}`
      throw msg
  } 
  if(typeFile.findIndex((type)=>files[0].type===type)===-1)throw "Type de fichier incorrect"
}
catch(err){
  document.getElementById("file").focus()
  document.getElementById("msgErr").innerHTML=err
  return
}
  validEng|=1
  EnabledBt(document.getElementById("bt_Ajout"))
  fileEnrg=e.target
  //console.log("preview")
  imgPreview(files[0],document.getElementById("Blk_img"))
}


/**
 * Controle si le titre est renseigné 
 * si ok le bit 2 de validEng est mis à 1
 * sinon le bit 2 de validEng est mis à 0
 * @param {event} e 
 * @returns 
 */
function ctrlEmptyTitle(e){
  let chk=false
    cible=e.target  
    if(cible.value.trim()===""){
      validEng &= 5  // après affectation le bit 2 est à 0 
      chk = false
      }else{
      validEng |= 2 // après affectation le bit 2 est à 1
      chk = true
    }
    EnabledBt(document.getElementById("bt_Ajout"))
    return chk
}


/**
 * bascule le bouton Valider de l'état actif à non actif
 * 
 * @param {HTMLElement} cible bouton 
 */
function toggleBtAjout(cible){
  if(validEng===7){
    cible.classList.remove("bgColorGrey")
    cible.classList.add("clickable")
    cible.addEventListener("click",sendForm)
  }else{
    cible.classList.add("bgColorGrey")
    cible.classList.remove("clickable")
    cible.removeEventListener("click",sendForm)
  }
}

/**
 * Defini l'etat du formulaire et met à jour le message à destination de l'utilisateur
 * @param {HTMLElement} cible message 
 */
function EnabledBt(cible){
  switch (validEng){
  case 0 :
    msg="Tous les champs doient-être renseigné"
    document.getElementById("file").focus()
    break
  case 1 : //image ok
    document.getElementById("title").focus()
    msg="Il vous reste a renseigner Le tire et la catégorie"
    break
  case 2 : //titre ok
    msg="Il vous reste a sélectionner une photo et la catégorie"
    document.getElementById("file").focus()
    break
  case 3 : // image et titre ok
    document.getElementById("category").focus()
    msg="Il vous reste a sélectionner la catégorie"
    break
  case 4 : // catégorie ok
    msg="Il vous reste a sélectionnez une photo et renseignez le titre"
    document.getElementById("file").focus()
    break
  case 5 :  // image et catégorie ok
    msg="Il vous reste a renseignez le titre"
    document.getElementById("title").focus()
    break
  case 6 : // titre et catégorie ok
    msg="Il vous reste a sélectionnez une photo"
    document.getElementById("file").focus()
    break
  case 7 : // formulaire ok le bt valider peut etre activé
    msg=""
    document.getElementById("bt_Ajout").focus()
  }
  document.getElementById("msgErr").innerHTML=msg
  toggleBtAjout(cible)
}

/**
 * Controle si une categorie a bien etait selectionnée
 * si ok le bit 3 de validEng est mis à 1
 * sinon le bit 3 de validEng est mis à 0
 * @param {event} e 
 * @returns 
 */

function ctrlSelct(e){
  let chk=false
  if(parseInt(e.target.selectedIndex) > 0){
    validEng|=4 // après affectation le bit 3 est à 0
    chk=true
  }else{
    validEng&=3 //// après affectation le bit 3 est à 0
    chk=false
  }
  EnabledBt(document.getElementById("bt_Ajout"))
  return chk
}

/**
 * creation de l'objet formaData 
*/
function sendForm(){
  const formdata = new FormData()
  formdata.append("image", fileEnrg.files[0])
  formdata.append("title",document.getElementById("title").value)
  formdata.append("category",document.getElementById("category").value)
  PostApiWorks(formdata)
  alert("Enregistrement réalisé avec succés")
  document.getElementById("modale").setAttribute("style","display:none;")
  document.getElementById("modale").removeEventListener("click",CloseModale)
}
 

/**
 * Mise a jour de la galerie, de lst_works et de storLstWorks après ajout d'un projet
 * @param {{}} res Objet work
 */
function AppendCardLstWork(res){
  let card = new work_card(res)
  lst_works.push(res)
  storLstWorks={
    timeEnrg : Date.now(),
    lst_works : lst_works
  }
  window.localStorage.setItem("storLstWorks", JSON.stringify(storLstWorks))
  card.show(document.getElementById("gallery"))
  card = new work_card(res,"edit")
  document.getElementById("main").appendChild(card._workCard)
  validEng=0
  toggleBtAjout(document.getElementById("bt_Ajout"))
}