//import data from './data/productos';

'use strict';

class Tabs {
	constructor(idElemento) {
		this.tabs = document.getElementById(idElemento);
		this.nav = this.tabs.querySelector('.tabs');

		this.nav.addEventListener('click', (e) => {
			e.preventDefault();

			if ([...e.target.classList].includes('tabs__button')) {
				const tab = e.target.dataset.tab;

				if (this.tabs.querySelector('.tab--active')) {
					this.tabs.querySelector('.tab--active').classList.remove('tab--active');
				}

				if (this.tabs.querySelector('.tabs__button--active')) {
					this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
				}

				this.tabs.querySelector(`#${tab}`).classList.add('tab--active');
				e.target.classList.add('tabs__button--active');
			}
		});
	}
}

var data = {
	productos: [
		{
			id: '1',
			nombre: 'Tennis Converse Standard',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 125000.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['39', '40', '41', '42', '43','44'],
		},
		{
			id: '2',
			nombre: 'Remera Converse Standard',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 65000.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['S', 'M', 'L', 'XL', 'XXL'],
		},
	],
};

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');
const propiedadColor = producto$1.querySelector('#propiedad-color');
const btnIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
const btnDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const inputCantidad = producto$1.querySelector('#cantidad');
const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const btnAgregarAlCarrito = document.getElementById('agregar-al-carrito');
const btnComprar = document.getElementById('carrito__btn-comprar');
const ventanaCarrito = document.getElementById('carrito');
const notificacion = document.getElementById('notificacion');
const formatearMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const guardarCarrito = () => {
	localStorage.setItem('carrito', JSON.stringify(carrito));
};

const renderCarrito = () => {
	ventanaCarrito.classList.add('carrito--active');

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
			data.productos.forEach((productoLista) => {
				if (productoCarrito.id === productoLista.id) {
					productoCarrito.precio = productoLista.precio;
					total += productoCarrito.precio * productoCarrito.cantidad;
				}
			});

			let thumbSrc = `./img/thumbs/${productoCarrito.color}.jpg`;

			const plantillaProducto = `
				<div class="carrito__producto-info">
					<img src="${thumbSrc}" alt="" class="carrito__thumb" />
					<div>
						<p class="carrito__producto-nombre">
							<span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
						</p>
						<p class="carrito__producto-propiedades">Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span></p>
					</div>
				</div>
				<div class="carrito__producto-contenedor-precio">
					<button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
						</svg>
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
	guardarCarrito();
};

thumbs.addEventListener('click', (e) => {
	if (e.target.tagName === 'IMG') {
		const imagenSrc = e.target.src;
		const lastIndex = imagenSrc.lastIndexOf('/');
		const nombreImagen = imagenSrc.substring(lastIndex + 1);
		productoImagen.src = `./img/tennis/${nombreImagen}`;
	}
});

propiedadColor.addEventListener('click', (e) => {
	if (e.target.tagName === 'INPUT') {
		productoImagen.src = `./img/tennis/${e.target.value}.jpg`;
	}
});

btnIncrementarCantidad.addEventListener('click', () => {
	inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

btnDisminuirCantidad.addEventListener('click', () => {
	if (parseInt(inputCantidad.value) > 1) {
		inputCantidad.value = parseInt(inputCantidad.value) - 1;
	}
});

botonesAbrirCarrito.forEach((boton) => {
	boton.addEventListener('click', renderCarrito);
});

botonesCerrarCarrito.forEach((boton) => {
	boton.addEventListener('click', () => {
		ventanaCarrito.classList.remove('carrito--active');
	});
});

btnAgregarAlCarrito.addEventListener('click', () => {
	const id = producto.dataset.productoId;
	const nombre = producto.querySelector('.producto__nombre').innerText;
	const cantidad = parseInt(inputCantidad.value);
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

	notificacion.querySelector('img').src = `./img/thumbs/${color}.jpg`;
	notificacion.classList.add('notificacion--active');
	setTimeout(() => notificacion.classList.remove('notificacion--active'), 5000);
	guardarCarrito();
});

/*ventanaCarrito.addEventListener('click', (e) => {
	if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
		const producto = e.target.closest('.carrito__producto');
		const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

		carrito = carrito.filter((item, index) => index !== indexProducto);
		renderCarrito();
	}
});*/

// **Eliminar producto del carrito**
ventanaCarrito.addEventListener('click', (e) => {
    if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);
        carrito = carrito.filter((_, index) => index !== indexProducto);
        renderCarrito();
    }
});

btnComprar.addEventListener('click', () => {
	console.log('Enviado petición de compra:', carrito);
	carrito = [];
	renderCarrito();
});
