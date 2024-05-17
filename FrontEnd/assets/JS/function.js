
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
  
/**
 * construction du tableau des categories
 * @returns {string[]}
 */
  function convSetOnTab(){
    let lst=[]
    Menu_items.add("0;Tous")
    for ( work of lst_works){
      Menu_items.add(`${work.category.id};${work.category.name}`)
    }
    const lst_filtre = Array.from(Menu_items)
    lst_filtre.forEach(element => { 
      lst.push(element.split(';'))
    })
    return lst
  }
  

  /* creation et affichage des boutons de filtrage */
  function show_filtre(){
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
    alert("nouveau projet")
  }

  function DelProjet(e){
    const id = parseInt(e.target.getAttribute("data-value"))
    alert(`suppression projet ${id}`)
  }

  function CloseModale(e){
    console.log(e.target)
    modale_galerie._modale.setAttribute("style","display:none;")
  }