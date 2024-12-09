// Ruta al archivo JSON
const jsonPath = './src/data/productos.json';

// Leer y mostrar los productos
fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
    })
    .then(products => {
        console.log("Lista de productos disponibles:");
        products.forEach(product => {
            console.log(`
            ID: ${product.id}
            Nombre: ${product.name}
            Descripción: ${product.descripcion}
            Cantidad: ${product.cantidad}
            Precio: $${product.precio}
            `);
        });
    })
    .catch(error => {
        console.error('Error al leer el archivo JSON:', error);
    });

//***************************************************************** */
// Lista de productos
const products = [
    {
        id: 1,
        name: "Tennis Converse_1",
        descripcion: "Tennis Converse Standard Color Amarillo",
        img: "img/tennis/amarillo.gif",
        cantidad: "24",
        precio: "125000"
    },
    {
        id: 2,
        name: "Tennis Converse_2",
        descripcion: "Tennis Converse Standard Color Negro",
        img: "img/tennis/negro.gif",
        cantidad: "24",
        precio: "125000"
    },
    {
        id: 3,
        name: "Tennis Converse_3",
        descripcion: "Tennis Converse Standard Color Rojo",
        img: "img/tennis/rojo.gif",
        cantidad: "24",
        precio: "125000"
    },
    {
        id: 4,
        name: "Remera Converse_1",
        descripcion: "Remera Converse Standard Color Blanca",
        img: "img/tennis/converse_franela.png",
        cantidad: "36",
        precio: "65000"
    },
    {
        id: 5,
        name: "Remera Converse_2",
        descripcion: "Remera Converse Standard Color Verde",
        img: "img/tennis/converse_franela_verde.png",
        cantidad: "36",
        precio: "65000"
    },
    {
        id: 6,
        name: "Remera Converse_3",
        descripcion: "Remera Converse Standard Color Amarilla",
        img: "img/tennis/converse_franela_naranja.png",
        cantidad: "36",
        precio: "65000"
    }
];

// Seleccionamos el contenedor principal donde se agregarán las tarjetas
const productosContainer = document.querySelector("#productos .productos-container");
// Verifica si el contenedor fue seleccionado correctamente
console.log(productosContainer);
// Función para generar dinámicamente las tarjetas de productos

/*function renderProducts(products) {
    productosContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos productos
    products.forEach(product => {
        // Creamos el elemento de tarjeta
        const productCard = document.createElement("div");
        productCard.classList.add("producto-card");

        // Agregamos el contenido de la tarjeta
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.img}" alt="${product.name}">
            <!--<h4>${product.cantidad}</h4>
            <h5>${product.precio}</h5>-->
        `;

        // Agregamos el evento click para mostrar la descripción ampliada
        productCard.addEventListener("click", () => {
            alert(`Descripción: ${product.descripcion}`);
        });

        // Añadimos la tarjeta al contenedor
        productosContainer.appendChild(productCard);
    });
}*/
/*
function renderProducts(products) {
    productosContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos productos
    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("producto-card");

        // Agregamos el contenido de la tarjeta
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.img}" alt="${product.name}">
            <div class="product-tooltip">
                <p><strong>Descripción:</strong> ${product.descripcion}</p>
                <p><strong>Cantidad:</strong> ${product.cantidad}</p>
                <p><strong>Precio:</strong> $${product.precio}</p>
            </div>
        `;
    
        // Añadimos la tarjeta al contenedor
        productosContainer.appendChild(productCard);

        // Aplicamos animación con un pequeño retardo para cada producto
        setTimeout(() => {
            productCard.classList.add("animacion-entrada");
        }, index * 200); // Retardo de 200ms entre tarjetas

        // Agregamos el evento click para mostrar la descripción ampliada
        productCard.addEventListener("click", () => {
            alert(`Descripción: ${product.descripcion}`);
        });
    });
}*/
/*
function renderProducts(products) {
    productosContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos productos
    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("producto-card");

        // Agregamos el contenido de la tarjeta
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.img}" alt="${product.name}">
            <div class="product-tooltip">
                <p><strong>Descripción:</strong> ${product.descripcion}</p>
                <p><strong>Cantidad:</strong> ${product.cantidad}</p>
                <p><strong>Precio:</strong> $${product.precio}</p>
            </div>
        `;

        // Añadimos la tarjeta al contenedor
        productosContainer.appendChild(productCard);

        // Aplicamos animación con un pequeño retardo para cada producto
        setTimeout(() => {
            productCard.classList.add("animacion-entrada");
        }, index * 200); // Retardo de 200ms entre tarjetas

        // Tooltip: Ocultar antes de mostrar el alert
        const tooltip = productCard.querySelector(".product-tooltip");

        productCard.addEventListener("click", () => {
            // Ocultar el tooltip temporalmente
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";

            // Mostrar el alert después de un breve retardo
            setTimeout(() => {
                alert(`Descripción: ${product.descripcion}`);
                // Restaurar visibilidad del tooltip tras el alert
                tooltip.style.visibility = "visible";
                tooltip.style.opacity = "1";
            }, 100); // Retardo breve antes de mostrar el alert
        });
    });
}
*/
function renderProducts(products) {
    productosContainer.innerHTML = ""; // Limpiamos el contenedor antes de agregar nuevos productos
    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("producto-card");

        // Agregamos el contenido de la tarjeta
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <div class="product-tooltip">
                <p><strong>Descripción:</strong> ${product.descripcion}</p>
                <!--<p><strong>Cantidad:</strong> ${product.cantidad}</p>
                <p><strong>Precio:</strong> $${product.precio}</p>-->
            </div>
        `;

        // Añadimos la tarjeta al contenedor
        productosContainer.appendChild(productCard);

        // Aplicamos animación con un pequeño retardo para cada producto
        setTimeout(() => {
            productCard.classList.add("animacion-entrada");
        }, index * 200); // Retardo de 200ms entre tarjetas

        // Tooltip activado por hover (para la imagen)
        const tooltip = productCard.querySelector(".product-tooltip");
        const productImage = productCard.querySelector(".product-image");

        productImage.addEventListener("mouseover", () => {
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
        });

        productImage.addEventListener("mouseout", () => {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        });

        // Alert activado por click en toda la tarjeta
        productCard.addEventListener("click", () => {
            alert(`Descripción: ${product.descripcion}`);
        });
    });
}


// Llamamos a la función para generar las tarjetas al cargar la página
renderProducts(products);

