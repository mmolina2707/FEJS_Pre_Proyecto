// Función para generar el array de productos.
function generateProducts() {
    const products = [
        {
            id: 1,
            name: "Tennis Converse_1",
            descripcion: "Tennis Converse Standard Color Negro",
            cantidad: 24,
            precio: 125000
        },
        {
            id: 2,
            name: "Tennis Converse_2",
            descripcion: "Tennis Converse Standard Color Rojo",
            cantidad: 24,
            precio: 125000
        },
        {
            id: 3,
            name: "Tennis Converse_3",
            descripcion: "Tennis Converse Standard Color Amarillo",
            cantidad: 24,
            precio: 125000
        },
        {
            id: 4,
            name: "4Remera Converse_1",
            descripcion: "4Remera Converse Standard Color Blanca",
            cantidad: 36,
            precio: 65000
        },
        {
            id: 5,
            name: "5Remera Converse_2",
            descripcion: "Remera Converse Standard Color Verde",
            cantidad: 36,
            precio: 65000
        },
        {
            id: 6,
            name: "6Remera Converse_3",
            descripcion: "Remera Converse Standard Color Amarilla",
            cantidad: 36,
            precio: 65000
        }
    ];
    return products;
}

// Función para mostrar los productos en la consola
function displayProducts() {
    const products = generateProducts();
    console.log("Lista de productos disponibles:");
    
    // Usamos un ciclo para recorrer los productos y mostrarlos en la consola
    products.forEach(product => {
        console.log(`
        ID: ${product.id}
        Nombre: ${product.name}
        Descripción: ${product.descripcion}
        Cantidad: ${product.cantidad}
        Precio: $${product.precio}
        `);
    });
}

// Llamamos a la función para que muestre los productos
displayProducts();
