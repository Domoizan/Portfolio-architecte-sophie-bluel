
let Menu_items = new Set()

function show_gallery() {
  const galerie= document.getElementById("gallery")
  for ( work of lst_works){
    const fig = new works(work)
    Menu_items.add(work.category.id + "," + work.category.name)
    document.getElementById("gallery").appendChild(fig.show())
  }
}

//window.location.href = "https://www.toutjavascript.com/reference/ref-window.location.href.php"