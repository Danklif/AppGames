const btnLog = document.querySelector("#btnLog")
const url = "https://709b-186-144-129-108.ngrok.io"

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
    login(user)
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
    newUser(user)
})

async function newUser(user) {
    const response = await (await fetch(url+"/users/signup", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    console.log(response)
}

async function login(user) {
    const response = await (await fetch(url+"/users/signin", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:user
    })).json()
    console.log(response)
}

async function readJson() {
    const response = await (await fetch("https://raw.githubusercontent.com/facebook/react/main/package.json", {
        method:"GET", 
        mode:"cors",
    })).json()
    const elementHtml = document.createElement("div")
    elementHtml.innerHTML = `<p>${response.dependencies}</p>`
    document.body.append(elementHtml)
    console.log(response)
}

//newUser()