const btnProf = document.querySelector("#btnProf")
const idSession = parseInt(window.location.href.split("=")[1])
console.log(idSession)

btnProf.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "profile.html?id=" + idSession;
})