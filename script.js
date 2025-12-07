// Lista de alumnos V-A-C-Í-A (para que cargues tus propios datos)
const DATOS_ALUMNOS = []; 

// Mapeo para rastrear el estado de cada alumno (0: Pendiente, 1: Avisado, 2: Retirado)
const estados = {}; 

// Función para renderizar (dibujar) la lista inicial
function renderizarLista() {
    const lista = document.getElementById('lista-alumnos');
    lista.innerHTML = ''; // Limpia la lista

    // Verificación de lista vacía
    if (DATOS_ALUMNOS.length === 0) {
        lista.innerHTML = '<li class="no-data">❌ La lista está vacía. Por favor, añada alumnos para comenzar a operar.</li>';
        return; 
    }
    
    DATOS_ALUMNOS.forEach(alumno => {
        // Inicializa el estado si no existe (por defecto: 0 - Pendiente)
        if (!estados[alumno.id]) {
            estados[alumno.id] = 0;
        }

        const item = document.createElement('li');
        item.classList.add('alumno-item');
        item.setAttribute('data-id', alumno.id);

        // Agrega la clase de color según el estado
        aplicarClaseDeEstado(item, estados[alumno.id]);

        item.innerHTML = `
            <h3>${alumno.nombre}</h3>
            <p>Curso: ${alumno.curso} | Estado: <span class="estado-texto">Pendiente</span></p>
        `;

        // Añade el evento de clic para cambiar el estado
        item.addEventListener('click', () => cambiarEstado(alumno.id, item));

        lista.appendChild(item);
    });
}

// Función para cambiar el estado y actualizar la interfaz
function cambiarEstado(id, itemElemento) {
    // El estado avanza cíclicamente: 0 -> 1 -> 2 -> 0 (Pendiente -> Avisado -> Retirado -> Pendiente)
    let nuevoEstado = (estados[id] + 1) % 3;
    estados[id] = nuevoEstado;

    // Actualiza las clases y el texto
    aplicarClaseDeEstado(itemElemento, nuevoEstado);
}

// Función auxiliar para aplicar las clases CSS y el texto de estado
function aplicarClaseDeEstado(item, estado) {
    // Elimina todas las clases de estado previas
    item.classList.remove('estado-avisado', 'estado-retirado');

    const estadoTextoElemento = item.querySelector('.estado-texto');
    
    let nombreEstado = 'Pendiente';

    if (estado === 1) { // 🟡 Avisado
        item.classList.add('estado-avisado');
        nombreEstado = 'AVISADO (Esperando Retiro)';
    } else if (estado === 2) { // 🟢 Retirado
        item.classList.add('estado-retirado');
        nombreEstado = 'RETIRADO (Entregado)';
    }

    if (estadoTextoElemento) {
        estadoTextoElemento.textContent = nombreEstado;
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', renderizarLista);
