import {url} from "./url.js"
const btnProf = document.querySelector("#btnProf")
const btnLogout = document.querySelector("#btnLogout")
const tableGames = document.querySelector("#tableGames")
const idSession = parseInt(window.location.href.split("=")[1])
const maxPolicy = 10
let allDiscounts = {}
let allGames = {}

btnProf.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "profile.html?id=" + idSession;
})

btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "index.html";
})

tableGames.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "btnComprar") {
        buyGame(idSession, parseInt(e.target.id.split("-")[1]), document.querySelector(`#val-${e.target.id.split("-")[1]}`).textContent, getDate())
    }
})

async function loadGames() {
    const ownGames = await (await fetch(url + "/users/ownedgames?id_user=" + idSession, {mode:"cors"})).json()

    const gameList = allGames.filter(game => {
        return !ownGames.map(game => {
            return game.id_game
        }).includes(parseInt(game.id))
    })

    let template = ``
    let discount = 0

    gameList.forEach(e => {
        discount = allDiscounts[Math.floor(Math.random() * (maxPolicy - 1)) + 1].value
        template += 
        `
        <tr id="row-${e.id}">
            <td>${e.name}</td>
            <td>${e.launch_date}</td>
            <td>${e.desc}</td>
            <td><p id="val-${e.id}">${e.value - (e.value * discount)}</p></td>
            <td>${e.company}</td>
            <td>Descuento: ${discount * 100}%</td>
            <td><button id="btnComprar-${e.id}" class="btn btn-warning">Comprar</button></td>
        </tr>
        `
    });

    tableGames.innerHTML = template
}

async function buyGame(id_user, id_game, value, date) {
    document.querySelector(`#row-${id_game}`).remove()
    const game = JSON.stringify({id_user, id_game, value, date})
    const response = await (await fetch(url+"/users/buy_games", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:game
    })).json()
    console.log(response)
    loadGames()
}

function getDate() {
    const date = new Date()
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
}

async function loadJson() {
    try {
        allGames = await (await fetch("https://danklif.github.io/AppGames/public/games.json")).json()
        allDiscounts = await (await fetch("https://danklif.github.io/AppGames/public/discounts.json")).json()
    } catch {
        alert("Error al cargar los juegos. Compruebe su conexión a internet o intente de nuevo más tarde.")
    }
}

loadJson()
loadGames()