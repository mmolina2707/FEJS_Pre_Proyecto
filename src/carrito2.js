import data from './data/productos';

const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const btnAgregarAlCarrito = document.getElementById('agregar-al-carrito');
const btnComprar = document.getElementById('carrito__btn-comprar');
const ventanaCarrito = document.getElementById('carrito');
const producto = document.getElementById('producto');
const notificacion = document.getElementById('notificacion');
let carrito = [];

// Formateador de moneda
const formatearMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

// **Funciones para LocalStorage**
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

// **Renderizar el carrito**
const renderCarrito = () => {
    ventanaCarrito.classList.add('carrito--active');

    // Limpiar el contenido anterior
    const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__body .carrito__producto');
    if (productosAnteriores) {
        productosAnteriores.forEach((producto) => producto.remove());
    }

    let total = 0;

    if (carrito.length < 1) {
        ventanaCarrito.classList.add('carrito--vacio');
    } else {
        ventanaCarrito.classList.remove('carrito--vacio');

        carrito.forEach((productoCarrito) => {
            data.productos.forEach((productoBaseDatos) => {
                if (productoCarrito.id === productoBaseDatos.id) {
                    productoCarrito.precio = productoBaseDatos.precio;
                    total += productoCarrito.precio * productoCarrito.cantidad;
                }
            });

            const thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0]?.src || './img/thumbs/default.jpg';
            const plantillaProducto = `
                <div class="carrito__producto-info">
                    <img src="${thumbSrc}" alt="" class="carrito__thumb" />
                    <div>
                        <p class="carrito__producto-nombre">
                            <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                        </p>
                        <p class="carrito__producto-propiedades">
                            Tamaño:<span>${productoCarrito.tamaño}</span> 
                            Color:<span>${productoCarrito.color}</span>
                        </p>
                    </div>
                </div>
                <div class="carrito__producto-contenedor-precio">
                    <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                        Eliminar
                    </button>
                    <p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
                </div>
            `;

            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('carrito__producto');
            itemCarrito.innerHTML = plantillaProducto;

            ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
        });
    }

    ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);

    // **Guardar estado del carrito en LocalStorage**
    guardarCarritoEnLocalStorage();
};

// **Cargar carrito desde LocalStorage al inicio**
carrito = cargarCarritoDesdeLocalStorage();
renderCarrito();

// **Abrir carrito**
botonesAbrirCarrito.forEach((boton) => {
    boton.addEventListener('click', () => renderCarrito());
});

// **Cerrar carrito**
botonesCerrarCarrito.forEach((boton) => {
    boton.addEventListener('click', () => {
        ventanaCarrito.classList.remove('carrito--active');
    });
});

// **Agregar al carrito**
btnAgregarAlCarrito.addEventListener('click', () => {
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

    let productoEnCarrito = false;

    carrito.forEach((item) => {
        if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
            item.cantidad += cantidad;
            productoEnCarrito = true;
        }
    });

    if (!productoEnCarrito) {
        carrito.push({ id, nombre, cantidad, color, tamaño });
    }

    renderCarrito();

    notificacion.querySelector('img').src = producto.querySelectorAll('.producto__thumb-img')[0]?.src || './img/thumbs/default.jpg';
    notificacion.classList.add('notificacion--active');
    setTimeout(() => notificacion.classList.remove('notificacion--active'), 5000);
});

// **Eliminar producto del carrito**
ventanaCarrito.addEventListener('click', (e) => {
    if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);
        carrito = carrito.filter((_, index) => index !== indexProducto);
        renderCarrito();
    }
});

// **Botón comprar**
btnComprar.addEventListener('click', () => {
    console.log('Carrito enviado para compra:', carrito);
    carrito = [];
    renderCarrito();
});
