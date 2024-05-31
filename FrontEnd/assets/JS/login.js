
const bt_submit=document.getElementById("submit")
const regexp= new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
const mail=document.getElementById("email")
const pwd=document.getElementById("pwd")
/*
mail.addEventListener("blur",(elt)=>{
    if(!regexp.test(elt.target.value.trim())){  
        elt.target.focus()
        elt.target.value=""
        console.log(`Email ${elt.target.value} non valid`)
    } 
})
*/

window.localStorage.clear("user")

mail.addEventListener("change",(elt)=>{
    if(!regexp.test(elt.target.value.trim())){  
        document.getElementById("err").innerHTML=`Email ${elt.target.value} non valid`
        elt.target.value=""
        elt.target.focus()
    } 
})




pwd.addEventListener("change",(elt)=>{
    if(elt.target.value.trim()===""){
        document.getElementById("err").innerHTML="Saisie Password obligatoire"
        elt.target.value=""
        elt.target.focus()
    }
})

bt_submit.addEventListener("click", (elt)=>{
    elt.preventDefault()
    let msg=""

    if(document.getElementById("email").value.trim()===""){
        msg = "Saisie Email obligatoire"
        document.getElementById("email").focus()
    }
    if(document.getElementById("pwd").value.trim()===""){
        if(msg===""){
            msg="Saisie Pasword obligatoire"
            document.getElementById("pwd").focus()
        }else{
            msg=`${msg}\rSaisie Password obligatoire`
        }
    }
    console.log(`message = ${msg}`)
    if(msg!==""){
        document.getElementById("err").innerHTML=msg
    }else{
        console.log("appel api")
        PostApiUser(document.getElementById("email").value,document.getElementById("pwd").value)
        document.getElementById("email").value=""
        document.getElementById("pwd").value=""
        document.getElementById("email").focus()
    }
})


//PostApiUser("sophie.bluel@test.tld","S0phie")
//PostApiUser("sophie.bluel@test.tld","S0phie")