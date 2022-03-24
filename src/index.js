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
    btnReg.disable = true;
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
    btnReg.disable = false
    signUp(user)
})

async function signUp(user) {
    const userField = document.querySelector("#sbUser")
    const passField = document.querySelector("#sbPass")
    const response = await (await fetch(url+"/users/signup", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    console.log(response.register)
    userField.value = ""
    passField.value = ""
    if (parseInt(response.register) == 1) {
        alert("Usuario registrado")
    } else {
        alert("Error al registrar")
    }
}

async function signIn(user) {
    const passField = document.querySelector("#inPass")
    const response = await (await fetch(url+"/users/signin", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    console.log(response)
    if (parseInt(response.auth)) {
        window.location.href = "profile.html?id=" + response.id;
    } else {
        alert("Usuario o contraseña incorrecta. Verifique los datos e intente nuevamente.")
        passField.value = ""
    }
}