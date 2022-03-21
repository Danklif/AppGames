import {url} from "./url.js"
const btnLog = document.querySelector("#btnLog")

btnLog.addEventListener("click", (e) => {
    e.preventDefault()
    const inUser = document.querySelector("#inUser")
    const inPass = document.querySelector("#inPass")
    if (!inUser.value || !inPass.value) {
        alert("Los valores están vacíos")
        return
    }
    const user = JSON.stringify({
        name:inUser.value, 
        pass:inPass.value
    })
    signIn(user)
})

btnReg.addEventListener("click", (e) => {
    e.preventDefault()
    const inUser = document.querySelector("#sbUser")
    const inPass = document.querySelector("#sbPass")
    if (!inUser.value || !inPass.value) {
        alert("Los valores están vacíos")
        return
    }
    const user = JSON.stringify({
        name:inUser.value, 
        pass:inPass.value
    })
    signUp(user)
})

async function signUp(user) {
    const response = await (await fetch(url+"/users/signup", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
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

/*async function readJson() {
    const response = await (await fetch("https://raw.githubusercontent.com/facebook/react/main/package.json", {
        method:"GET", 
        mode:"cors",
    })).json()
    const elementHtml = document.createElement("div")
    elementHtml.innerHTML = `<p>${response.dependencies}</p>`
    document.body.append(elementHtml)
    console.log(response)
}*/