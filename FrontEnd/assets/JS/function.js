


function show_gallery(lst=lst_works) {
  const cible=document.getElementById("gallery")
  cible.innerHTML=""
    //console.log(lst)
  for ( work of lst){
    const fig = new work_card(work)
    fig.show(document.getElementById("gallery"))
  }
}
  
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
  
  function show_filtre(){
    const fltr = new filtres( document.getElementById("blk_filtre"), convSetOnTab())
    fltr.showFiltre()
  }
  
  function toggleFiltreActif(e){
    console.log(`filtre_${filtre_actif}`)
    const btOld=document.getElementById(`filtre_${filtre_actif}`)
    e.target.classList.add("actif")
    btOld.classList.remove("actif")
    e.target.removeEventListener("click",appFiltre)
    btOld.addEventListener("click",appFiltre)
  
  }
  
  function appFiltre(e){
    const cat=e.target.getAttribute("data-value")*1
    const tab = lst_works.filter((elt) => elt.categoryId===cat)
    toggleFiltreActif(e)
    filtre_actif=cat
    if(tab==0){
      console.log(lst_works)
      show_gallery(lst_works)
    }else{
      show_gallery(tab)
    }
  }