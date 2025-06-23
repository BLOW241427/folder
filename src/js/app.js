// Lógica principal de la aplicación
console.log('App de tienda de móviles iniciada');

// Función para mostrar productos
function displayProducts() {
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) {
        console.error('El contenedor de la lista de productos no fue encontrado.');
        return;
    }
    // Ensure products is defined and not empty
    if (typeof products === 'undefined' || products.length === 0) {
        productListContainer.innerHTML = '<p>No hay productos para mostrar en este momento.</p>';
        return;
    }

    let productsHTML = '';
    products.forEach(product => {
        productsHTML += `
            <div class="product-card">
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p>${product.description_corta}</p>
                <button>Ver Detalles</button>
            </div>
        `;
    });
    productListContainer.innerHTML = productsHTML;
}

// Llamar a la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', displayProducts);

// Lógica para el Modal de Login
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeButton = document.querySelector('.modal .close-button'); // Made selector more specific
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const userActionsDiv = document.querySelector('header .user-actions');

    if (loginButton && loginModal && closeButton && loginForm && userActionsDiv) {
        loginButton.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });

        closeButton.addEventListener('click', () => {
            loginModal.style.display = 'none';
            loginMessage.style.display = 'none'; // Ocultar mensaje al cerrar
            loginMessage.textContent = '';
            loginMessage.className = 'login-message'; // Resetear clases
        });

        // Cerrar modal si se hace clic fuera del contenido del modal
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
                loginMessage.style.display = 'none';
                loginMessage.textContent = '';
                loginMessage.className = 'login-message';
            }
        });

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar envío real del formulario
            const email = event.target.email.value;
            const password = event.target.password.value;

            // Simulación de login
            if (email === 'user@example.com' && password === 'password123') {
                loginMessage.textContent = '¡Login exitoso!';
                loginMessage.className = 'login-message success';
                loginMessage.style.display = 'block';

                // Actualizar UI para reflejar login
                userActionsDiv.innerHTML = `<p>Bienvenido, ${email.split('@')[0]}!</p>`;

                setTimeout(() => {
                    loginModal.style.display = 'none';
                    loginMessage.style.display = 'none';
                    loginMessage.textContent = '';
                    loginMessage.className = 'login-message';
                    loginForm.reset();
                }, 2000); // Cerrar modal después de 2 segundos
            } else {
                loginMessage.textContent = 'Email o contraseña incorrectos.';
                loginMessage.className = 'login-message error';
                loginMessage.style.display = 'block';
            }
        });
    } else {
        console.error('Algunos elementos del modal de login no fueron encontrados para configurar los listeners.');
        if (!loginButton) console.error('login-button no encontrado');
        if (!loginModal) console.error('login-modal no encontrado');
        if (!closeButton) console.error('modal .close-button no encontrado');
        if (!loginForm) console.error('login-form no encontrado');
        if (!userActionsDiv) console.error('header .user-actions no encontrado');
    }
});

// Lógica para Desplazamiento Suave (Smooth Scrolling)
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('header nav ul li a[href^="#"]');

    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href'); // e.g., "#top-section"

                // Asegurarse de que no es solo "#"
                if (targetId.length > 1) {
                    const targetElement = document.querySelector(targetId); // Usa querySelector para IDs

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    } else {
                        console.warn('Elemento de destino para smooth scroll no encontrado:', targetId);
                    }
                }
            });
        });
    } else {
        console.warn('No se encontraron enlaces de ancla para smooth scrolling en el header.');
    }
});

// Lógica para Animaciones al Hacer Scroll (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    if (productCards.length > 0) {
        // Inicialmente ocultar todas las tarjetas que se animarán
        productCards.forEach(card => {
            card.classList.add('hidden-scroll');
        });

        const observerOptions = {
            root: null, // Relativo al viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger cuando al menos 10% de la tarjeta es visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden-scroll');
                    entry.target.classList.add('visible-scroll');
                    observer.unobserve(entry.target); // Dejar de observar una vez que es visible
                }
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

        productCards.forEach(card => {
            scrollObserver.observe(card);
        });

    } else {
        console.warn('No se encontraron tarjetas de producto para animar con Intersection Observer.');
    }
});
