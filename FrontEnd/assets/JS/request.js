
/* Liste des travaux */
let lst_works=[]
let Menu_items = new Set()

fetch("http://localhost:5678/api/works")
    .then((res)=>{
        if(res.ok){
            return res.json()
        } 
    }).then((res)=>{
        lst_works=res
        show_gallery()
    })
    .catch((err)=> {
        console.log(err)
    })

    