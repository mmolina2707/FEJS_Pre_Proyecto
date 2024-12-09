document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contacto form');

    form.addEventListener('submit', (event) => {
        // Seleccionamos los campos del formulario
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Validamos que todos los campos estén completos
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            // Evitamos que el formulario se envíe
            event.preventDefault();
            
            // Mostramos un mensaje en la consola
            console.error('Por favor, complete todos los campos antes de enviar el formulario.');
        } else {
            // Mostramos un mensaje en la consola indicando que se enviará
            console.log('Formulario completado correctamente. Enviando...');
        }
    });
});
