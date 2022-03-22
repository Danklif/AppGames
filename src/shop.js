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

tableGames.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "btnComprar") {
        buyGame(idSession, parseInt(e.target.id.split("-")[1]))
    }
})

async function loadGames() {
    const allGames = await (await fetch("https://danklif.github.io/AppGames/public/games.json")).json()
    const ownGames = await (await fetch(url + "/users/ownedgames?id_user=" + idSession, {mode:"cors"})).json()

    const gameList = allGames.filter(game => {
        return !ownGames.map(game => {
            return game.id_game
        }).includes(parseInt(game.id))
    })

    let template = ``
    let user_type = parseInt((await getUserType(idSession))[0].user_type)
    let discount = calculateValue(user_type)

    gameList.forEach(e => {
        template += 
        `
        <tr>
            <td>${e.name}</td>
            <td>${e.launch_date}</td>
            <td>${e.desc}</td>
            <td>${e.value - (e.value * discount)}</td>
            <td>${e.company}</td>
            <td>Descuento: ${discount * 100}%</td>
            <td><button id="btnComprar-${e.id}" class="btn btn-warning">Comprar</button></td>
        </tr>
        `
    });

    tableGames.innerHTML = template
}

async function buyGame(id_user, id_game) {
    const game = JSON.stringify({id_user, id_game})
    const response = await (await fetch(url+"/users/buy_games", {
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        mode:"cors",
        body:game
    })).json()
    console.log(response)
    loadGames()
}

async function getUserType(id_user) {
    return await (await fetch(url + "/users/usertype?id_user=" + id_user)).json()
}

function calculateValue(user_type) {
    let disc = 0
    switch (user_type) {
        case 1:
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
            disc = 0.1
            break
    }
    return disc
}

loadGames()