

/**
 * obtenir tous les projets
 */
async function GetApiWorks(){
fetch("http://localhost:5678/api/works")
    .then((res)=>{
        if(res.ok){
            return res.json()
        } 
    }).then((res)=>{
        lst_works=res
        storLstWorks={
            timeEnrg : Date.now(),
            lst_works : res
        }
        window.localStorage.setItem("storLstWorks", JSON.stringify(storLstWorks))
        //window.localStorage.setItem("lst_works", JSON.stringify(res))
        show_gallery()
        if(user===null)show_filtre()
        return res
    })
    .catch((err)=> {
        console.log(err)
        return err
    })
}

/*
curl -X 'POST' \
  'http://localhost:5678/api/works' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjUzMjg5NywiZXhwIjoxNzE2NjE5Mjk3fQ.r4WoSOALD2JETh-j5rsfr1xhRNNipUOAOWr6XDWOays' \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@cookie.jpg;type=image/jpeg' \
  -F 'title=titre' \
  -F 'category=1
*/

/**
 * 
 * @param {{"FormData"}} data 
 * @return {[
                {
                    "id": number,
                    "title": "string",
                    "imageUrl": "string",
                    "categoryId": number,
                    "userId": number,
                    "category": {
                    "id": number,
                    "name": "string"
                    }
                }
            ]} 
 */
function PostApiWorks(data){
    const auth=`Bearer ${user.token}`
    const head={
        "accept" :"application/json",
        "Authorization" : auth,
    }
    fetch("http://localhost:5678/api/works",{
     method: "POST",
     headers: head,
     body: data
    }).then((res)=>{
        if(res.ok){
            return res.json().then((res)=>{
                AppendCardLstWork(res)
                return res
            })
        } else {
            switch (res.status){
                case 401 : 
                    alert("Utilisateur non autorisé.")
                    break;  
                case 500 : 
                    alert(`Utilisateur "${userMail}" non reconnu.`)
                    break;
                default:
                    alert(`Erreur inatendu ${res.status}.`)
            }
        }
    })
    .catch((err)=> {
        console.log(err)
    })
}



/**
 * obtenir toutes les categories 
 * non utilisée pour le moment

async function GetApiCategories(){
    fetch("http://localhost:5678/api/categories")
        .then((res)=>{
            if(res.ok){
                return res.json()
            } 
        }).then((res)=>{
            lstCat=res
            window.localStorage.setItem("LstCat", JSON.stringify(res))
            ExtractCategories()
            console.log("liste des categorie : " + lstCat)
        })
        .catch((err)=> {
            console.log(err)
        })
    }
 */

/**
 * 
 * @param {string} userMail mail utilisateur
 * @param {string} userPwd pasword utilisateur
 */
function PostApiUser(userMail,userPwd){
    const body = JSON.stringify({ 
     email : userMail,
     password : userPwd
     })
    const head={
         "accept":"application/json",
         "Content-Type": "application/json"
    }
    fetch("http://localhost:5678/api/users/login",{
     method: "POST",
     headers: head,
     body: body
    })
     .then((res)=>{
         if(res.ok){
            return res.json().then(res =>{
                window.localStorage.setItem("user", JSON.stringify(res))
                window.location.href="./index.html"
            })
         } else {
            switch (res.status){
                case 401 : 
                    document.getElementById("err").innerHTML="Utilisateur non autorisé."
                    break;  
                case 404 : 
                    document.getElementById("err").innerHTML=`Utilisateur "${userMail}" non reconnu.`
                    break; 
                case 405 : 
                    document.getElementById("err").innerHTML="Page ne fonctionne pas."
                    break;
                default:
                    document.getElementById("err").innerHTML=`Erreur inatendu ${res.status}.`
            }
            return (res)
         }
     })
     .catch((err)=> {
         console.log(err)
     })
 }
/**
 * Suppression d'un projet
 * 
 */ 
/**
 * 
 * @param {number} id => projet à supprimer
 * @param {HTMLElement} e => event 
 */


/*
curl -X 'DELETE' 
  'http://localhost:5678/api/works/3' 
  -H 'accept: *\/*' 
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjUzMjg5NywiZXhwIjoxNzE2NjE5Mjk3fQ.r4WoSOALD2JETh-j5rsfr1xhRNNipUOAOWr6XDWOays'
*/
function ApiDelWork(id, elt){
    const auth=`Bearer ${user.token}`
    const head={
        "accept" :"*/*",
        "Authorization" : auth
    }
    console.log(head)
    fetch(`http://localhost:5678/api/works/${id}`,{
    method: "DELETE",
    headers: head,
    })
    .then((res)=>{
        
        if(res.ok){
            console.log(res)
            MajAfterdel(id, elt)
        } else {
            switch (res.status){
                case 401 : 
                    alert("Utilisateur non autorisé.")
                    break;  
                case 500 : 
                    alert(`Utilisateur "${userMail}" non reconnu.`)
                    break;
                default:
                    alert(`Erreur inatendu ${res.status}.`)
            }
        }
    })
    .catch((err)=> {
        console.log(err)
    })
}