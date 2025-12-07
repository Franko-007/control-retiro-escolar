// Lista de alumnos de ejemplo con sus cursos
const DATOS_ALUMNOS = [
    { id: 1, nombre: "Ana López", curso: "1º B" },
    { id: 2, nombre: "Benito Pérez", curso: "2º A" },
    { id: 3, nombre: "Carla Gómez", curso: "1º B" },
    { id: 4, nombre: "Daniela Ruiz", curso: "3º C" },
    { id: 5, nombre: "Esteban Martín", curso: "2º A" }
];

// Mapeo para rastrear el estado de cada alumno (0: Pendiente, 1: Avisado, 2: Retirado)
const estados = {}; // Guardará { id_alumno: estado_actual }

// Función para renderizar (dibujar) la lista inicial
function renderizarLista() {
    const lista = document.getElementById('lista-alumnos');
    lista.innerHTML = ''; // Limpia la lista

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
    
    // Muestra el nuevo estado en la consola para depuración
    console.log(`Alumno ${id} - Nuevo Estado: ${obtenerNombreEstado(nuevoEstado)}`);
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

// Función auxiliar para obtener el nombre del estado (opcional, solo para consola)
function obtenerNombreEstado(estado) {
    switch (estado) {
        case 1: return 'Avisado';
        case 2: return 'Retirado';
        default: return 'Pendiente';
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', renderizarLista);