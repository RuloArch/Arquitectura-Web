// =========================
// GUARDAR & CARGAR PRODUCTOS
// =========================

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// =========================
// MOSTRAR PRODUCTOS
// =========================
function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    if (!listaProductos) return;

    listaProductos.innerHTML = "";

    const isAdmin = localStorage.getItem("role") === "admin";

    productos.forEach((prod, index) => {
        listaProductos.innerHTML += `
            <div class="product-card">
                <img src="${prod.img}">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>

                <button class="btn btn-success" onclick="agregarAlCarrito(${index})">
                    Agregar al carrito
                </button>

                ${isAdmin ? `
                <button class="btn btn-danger delete-btn" onclick="eliminarProducto(${index})">
                    Eliminar
                </button>` : ""}
            </div>
        `;
    });
}


// =========================
// SUBIR PRODUCTO
// =========================
function subirProducto(e){
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let imagen = document.getElementById("imagen").files[0];

    let lector = new FileReader();
    lector.onload = (event) => {

        productos.push({
            nombre,
            precio,
            img: event.target.result
        });

        localStorage.setItem("productos", JSON.stringify(productos));

        alert("Producto subido con éxito");
        mostrarProductos();
    };

    lector.readAsDataURL(imagen);
    document.getElementById("formProducto").reset();
}

// =========================
// ELIMINAR PRODUCTO
// =========================
function eliminarProducto(i) {
    productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
}

// =========================
// CARRITO — AGREGAR
// =========================
function agregarAlCarrito(i) {
    carrito.push(productos[i]);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// =========================
// CARRITO — MOSTRAR
// =========================
function mostrarCarrito() {
    const carritoLista = document.getElementById("carrito-lista");
    const total = document.getElementById("total");

    if (!carritoLista) return;

    carritoLista.innerHTML = "";
    let suma = 0;

    carrito.forEach(p => {
        carritoLista.innerHTML += `<div>${p.nombre} — $${p.precio}</div>`;
        suma += Number(p.precio);
    });

    total.innerText = "TOTAL: $" + suma;
}

// =========================
// CARRITO — VACIAR
// =========================
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    mostrarCarrito();
});

document.addEventListener("DOMContentLoaded", actualizarNavbarSegunRol);
