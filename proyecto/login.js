// ------------------------------
// LISTA DE ADMINS (editable)
// ------------------------------
const admins = {
    "Raul": "permelabe09",
    "Diego": "Detoneyabandone",
    "Cesar": "mai"
};

// ------------------------------
// FUNCIÓN LOGIN
// ------------------------------
function login(event) {
    event.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    // Limpiar mensaje
    errorMsg.textContent = "";

    // Validar admin
    if (admins[user] && admins[user] === pass) {
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", user);
        window.location.href = "index.html"; // <-- cambia si tu inicio es otro archivo
        return;
    }

    // Validación usuario normal (SIN admins)
    if (user !== "" && pass !== "") {
        localStorage.setItem("role", "user");
        localStorage.setItem("username", user);
        window.location.href = "index.html";
        return;
    }

    errorMsg.textContent = "Usuario o contraseña incorrectos";
}
