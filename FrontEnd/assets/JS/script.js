
function show_gallery() {
  const galerie= document.getElementById("gallery")
  for ( work of lst_works){
    const fig = new work_card(work)
    Menu_items.add(`${work.category.id} ${work.category.name}`)
    document.getElementById("gallery").appendChild(fig.show())
  }

}








//window.location.href = "https://www.toutjavascript.com/reference/ref-window.location.href.php"