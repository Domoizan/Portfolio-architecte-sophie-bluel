
function GetApiWorks(){
fetch("http://localhost:5678/api/works")
    .then((res)=>{
        if(res.ok){
            return res.json()
        } 
    }).then((res)=>{
        lst_works=res
        window.localStorage.setItem("lst_works", JSON.stringify(res))
        show_gallery()
        show_filtre()
    })
    .catch((err)=> {
        console.log(err)
    })
}

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
            res = res.json()
            window.localStorage.setItem("user", JSON.stringify(res))
            window.location.href="./index.html"
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
 

