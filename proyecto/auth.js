// --- LISTA DE ADMINS ---
const admins = {
    "Raul": "permelabe09",
    "Diego": "Detoneyabandone",
    "Cesar": "mai"
};

function login(event) {
    event.preventDefault();

    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();

    if (admins[user] && admins[user] === pass) {
        localStorage.setItem("role", "admin");
    } else {
        localStorage.setItem("role", "user");
    }

    window.location.href = "index.html";
}

function actualizarNavbarSegunRol() {
    const role = localStorage.getItem("role");
    const subirLink = document.getElementById("nav-subir");

    if (!subirLink) return;

    if (role === "admin") subirLink.style.display = "block";
    else subirLink.style.display = "none";
}
