import {url} from "./url.js"
const btnProf = document.querySelector("#btnProf")
const btnLogout = document.querySelector("#btnLogout")
const tableGames = document.querySelector("#tableGames")
const idSession = parseInt(window.location.href.split("=")[1])

btnProf.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "profile.html?id=" + idSession;
})

btnLogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "index.html";
})

async function loadGames() {
    const allGames = await (await fetch("https://danklif.github.io/AppGames/public/games.json")).json()
    const ownedIds = await (await fetch(url + "/users/available_games?id=" + idSession, {
        mode:"cors"
    })).json()

    const notOwnedGames = allGames.filter(game => {
        return !ownedIds.map(game => {
            return game.id_game
        }).includes(parseInt(game.id))
    })

    let template = ``
    let usertype = await getUserType(idSession)

    notOwnedGames.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.name}</td>
            <td>${e.launch_date}</td>
            <td>${e.desc}</td>
            <td>${e.value - (e.value * calculateValue(parseInt(usertype[0].user_type)))}</td>
            <td>${e.company}</td>
            <td><button id="btnComprar-${e.id}">Comprar</button></td>
        </tr>
        `
    });

    tableGames.innerHTML = template
}

tableGames.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "btnComprar") {
        buyGames(parseInt(e.target.id.split("-")[1]))
    }
})

async function buyGames(id) {
    const game = JSON.stringify({id, idSession})
    const response = await (await fetch(url+"/users/buy_games", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:game
    })).json()
    console.log(response)
    loadGames()
}

async function getUserType(idSession) {
    return await (await fetch(url + "/users/user_type?id=" + idSession)).json()
}

function calculateValue(op) {
    let disc = 0
    switch (op) {
        case 0:
            disc = 0.05
            break
        case 2:
            disc = 0.1
            break
        case 3:
            disc = 0.15
            break
        case 4:
            disc = 0.2
            break
        default:
            disc = 0
            break
    }
    return disc
}

loadGames()