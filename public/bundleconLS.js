'use strict';class Tabs {
	constructor(idElemento) {
		this.tabs = document.getElementById(idElemento);
		this.nav = this.tabs.querySelector('.tabs');

		this.nav.addEventListener('click', (e) => {
			e.preventDefault();

			// Comprobamos que el elemento que clickeamos tenga la clase de tabs__link.
			if ([...e.target.classList].includes('tabs__button')) {
				// Obtenemos la tab que queremos mostrar.
				const tab = e.target.dataset.tab;

				// Quitamos la clase active de alguna otras tabs que la tengan.
				if (this.tabs.querySelector('.tab--active')) {
					this.tabs.querySelector('.tab--active').classList.remove('tab--active');
				}

				// Quitamos la clase active del boton.
				if (this.tabs.querySelector('.tabs__button--active')) {
					this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
				}

				// Agregamos la clase active al tab.
				this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

				// Agregamos la clase active al boton.
				e.target.classList.add('tabs__button--active');
			}
		});
	}
}const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');

// Color
const propiedadColor = producto$1.querySelector('#propiedad-color');

// Cantidad
const btnIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
const btnDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const inputCantidad = producto$1.querySelector('#cantidad');

// Funcionalidad de las thumbnails
thumbs.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		const imagenSrc = e.target.src;

		// Obtenemos la posicion del ultimo /
		const lastIndex = imagenSrc.lastIndexOf('/');

		// Cortamos la cadena de texto para obtener solamente una parte.
		const nombreImagen = imagenSrc.substring(lastIndex + 1);

		// Cambiamos la ruta de la imagen del producto.
		productoImagen.src = `./img/tennis/${nombreImagen}`;
	}
});

// Cambiamos la imagen del producto dependiendo de la propiedad que seleccionen
propiedadColor.addEventListener('click', (e) => {
	if (e.target.tagName === 'INPUT') {
		// Cambiamos la ruta de la imagen del producto.
		productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
	}
});

// Cambiamos la cantidad a agregar al carrito
btnIncrementarCantidad.addEventListener('click', (e) => {
	inputCantidad.value = parseInt(inputCantidad.value) + 1;
});
btnDisminuirCantidad.addEventListener('click', (e) => {
	if (parseInt(inputCantidad.value) > 1) {
		inputCantidad.value = parseInt(inputCantidad.value) - 1;
	}
});

var data = {
	productos: [
		{
			id: '1',
			nombre: 'Tennis Converse Standard',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 500.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['1,5', '2', '2,5', '3', '4'],
		},
		{
			id: '2',
			nombre: 'Tennis Converse 2000',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 450.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['1,5', '2', '2,5', '3', '4'],
		},
	],
};

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

    // Comprobamos si hay productos
    if (carrito.length < 1) {
        // Ponemos la clase de carrito vacio
        ventanaCarrito.classList.add('carrito--vacio');
    } else {
        // Eliminamos la clase de carrito vacio
        ventanaCarrito.classList.remove('carrito--vacio');

        // Iteramos sobre cada producto del carrito
        carrito.forEach((productoCarrito) => {
            // Iteramos sobre la lista de productos.
            data.productos.forEach((productoBaseDatos) => {
                // Cuando el id del item del carrito sea el mismo que alguno de la lista.
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

    //renderCarrito();

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
    //carrito = [];
    //renderCarrito();
});