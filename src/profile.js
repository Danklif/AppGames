import {url} from "./url.js"
const btnShop = document.querySelector("#btnShop")
const btnLogout = document.querySelector("#btnLogout")
const tableGames = document.querySelector("#tableGames")
const idSession = parseInt(window.location.href.split("=")[1])
let allGames = {}

btnShop.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "shop.html?id=" + idSession;
})

btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "index.html";
})

async function loadGames() {
    const ownGames = await (await fetch(url + "/users/ownedgames?id_user=" + idSession, {mode:"cors"})).json()

    const gameList = allGames.filter(game => {
        return ownGames.map(game => {
            return game.id_game
        }).includes(parseInt(game.id))
    })

    let template = ``

    gameList.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.name}</td>
            <td>${e.launch_date}</td>
            <td>${e.desc}</td>
            <td>${e.company}</td>
        </tr>
        `
    });

    tableGames.innerHTML = template
}

async function loadJson() {
    try {
        allGames = await (await fetch("https://danklif.github.io/AppGames/public/games.json")).json()
    } catch {
        alert("Error al cargar los juegos. Compruebe su conexión a internet o intente de nuevo más tarde.")
    }
}

loadJson()
loadGames()