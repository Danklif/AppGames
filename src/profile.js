import {url} from "./url.js"
const btnShop = document.querySelector("#btnShop")
const idSession = parseInt(window.location.href.split("=")[1])
console.log(idSession)

btnShop.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "shop.html?id=" + idSession;
})

async function loadGames() {
    const response = await (await fetch(url+"/users/owned_games?id="+idSession, {
        mode:"cors"
    })).json()
}

/*async function readJson() {
    const response = await (await fetch("", {
        method:"GET", 
        mode:"cors",
    })).json()
    const elementHtml = document.createElement("div")
    elementHtml.innerHTML = `<p>${response.dependencies}</p>`
    document.body.append(elementHtml)
    console.log(response)
}*/

loadGames()