document.querySelectorAll('.comprar-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Producto añadido al carrito!');
    });
});
document.querySelectorAll('.comprar-btn').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = button.textContent;
        button.textContent = 'Añadido al carrito'; // Texto después de clic
        button.classList.add('success'); // Clase para cambiar el estilo durante la "animación"
        
        setTimeout(() => {
            button.textContent = originalText; // Restaurar texto original
            button.classList.remove('success'); // Remover la clase de éxito
        }, 2000); // Tiempo de la "animación"
    });
});
