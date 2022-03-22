import {url} from "./url.js"
const btnLog = document.querySelector("#btnLog")
const btnReg = document.querySelector("#btnReg")

btnLog.addEventListener("click", (e) => {
    e.preventDefault()
    const username = document.querySelector("#inUser").value
    const password = document.querySelector("#inPass").value
    if (!inUser.value || !inPass.value) {
        alert("Los valores están vacíos")
        return
    }
    const user = JSON.stringify({
        username:username, 
        password:password
    })
    signIn(user)
})

btnReg.addEventListener("click", (e) => {
    e.preventDefault()
    const username = document.querySelector("#sbUser").value
    const password = document.querySelector("#sbPass").value
    if (!inUser || !inPass) {
        alert("Los valores están vacíos")
        return
    }
    const user = JSON.stringify({
        username:username, 
        password:password
    })
    signUp(user)
})

async function signUp(user) {
    const username = document.querySelector("#sbUser").value
    const password = document.querySelector("#sbPass").value
    const response = await (await fetch(url+"/users/signup", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    if (parseInt(response.auth) == 1) {
        alert("Usuario registrado")
        username.value = ""
        password.value = ""
    }
    console.log(response)
}

async function signIn(user) {
    const response = await (await fetch(url+"/users/signin", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    console.log(response)
    if (parseInt(response.auth)) {
        window.location.href = "profile.html?id=" + response.id;
    }
}