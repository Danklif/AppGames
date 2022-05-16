import {url} from "./url.js"
const tableUsers = document.querySelector("#tableUsers")
const tableEntries = document.querySelector("#tableEntries")
const lookIdUsr = document.querySelector("#lookIdUsr")
const lookIdGme = document.querySelector("#lookIdGme")
const btnLookUsr = document.querySelector("#btnLookUsr")
const btnLookGme = document.querySelector("#btnLookGme")
const btnReg = document.querySelector("#btnReg")

btnLookUsr.addEventListener("click", (e) => {
    e.preventDefault()
    loadEntry(lookIdUsr.value, 1)
})

btnLookGme.addEventListener("click", (e) => {
    e.preventDefault()
    loadEntry(lookIdGme.value, 2)
})

btnReg.addEventListener("click", (e) => {
    e.preventDefault()
    const username = document.querySelector("#sbUser").value
    const password = document.querySelector("#sbPass").value
    const email = document.querySelector("#sbEmail").value
    if (!sbUser.value || !sbPass.value || !sbEmail.value) {
        alert("Los valores están vacíos")
        return
    }
    const user = JSON.stringify({
        username:username, 
        password:password,
        email:email
    })
    signUp(user)
})

async function loadUsers() {
    const userList = await (await fetch(url + "/users", {mode:"cors"})).json()

    let template = ``

    userList.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.id}</td>
            <td>${e.username}</td>
            <td>${e.email}</td>
        </tr>
        `
    })
    tableUsers.innerHTML = template
}

async function loadEntries() {
    const entriesList = await (await fetch(url + "/entries", {mode:"cors"})).json()

    let template = ``

    entriesList.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.id_user}</td>
            <td>${e.id_game}</td>
            <td>${e.value}</td>
            <td>${e.date}</td>
        </tr>
        `
    })
    tableEntries.innerHTML = template
}

async function loadEntry (id, mode) {
    if (mode == 1) {
        const entriesList = await (await fetch(url + `/entries/user/${id}`, {mode:"cors"})).json()

        let template = ``
    
        entriesList.forEach(e => {
            template += 
            `
            <tr>
                <td>${e.id_user}</td>
                <td>${e.id_game}</td>
                <td>${e.value}</td>
                <td>${e.date}</td>
            </tr>
            `
        })
        tableEntries.innerHTML = template
    } else {
        const entriesList = await (await fetch(url + `/entries/game/${id}`, {mode:"cors"})).json()

        let template = ``
    
        entriesList.forEach(e => {
            template += 
            `
            <tr>
                <td>${e.id_user}</td>
                <td>${e.id_game}</td>
                <td>${e.value}</td>
                <td>${e.date}</td>
            </tr>
            `
        })
        tableEntries.innerHTML = template
    } 
}

async function signUp(user) {
    const userField = document.querySelector("#sbUser")
    const passField = document.querySelector("#sbPass")
    const emailField = document.querySelector("#sbEmail")
    const response = await (await fetch(url+"/users/signup", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    userField.value = ""
    passField.value = ""
    emailField.value = ""
    loadUsers()
}

async function status() {
    const bdAlert = document.querySelector("#bdAlert")
    try {
        await fetch(url+"/")
        bdAlert.textContent = "La base de datos se encuentra en línea."
        bdAlert.classList.add("alert-success")
    } catch {
        bdAlert.textContent = "La base de datos se encuentra fuera de servicio."
        bdAlert.classList.add("alert-danger")
    }
}

status()
loadUsers()
loadEntries()