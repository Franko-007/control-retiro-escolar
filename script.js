// Usamos let para que el array de alumnos pueda ser modificado
let DATOS_ALUMNOS = []; 

// Mapeo para rastrear el estado de cada alumno (0: Pendiente, 1: Avisado, 2: Retirado)
const estados = {}; 

// Función para guardar los alumnos en el almacenamiento local del navegador
function guardarAlumnos() {
    localStorage.setItem('alumnos', JSON.stringify(DATOS_ALUMNOS));
}

// Función para cargar los alumnos del almacenamiento local del navegador
function cargarAlumnos() {
    const alumnosGuardados = localStorage.getItem('alumnos');
    if (alumnosGuardados) {
        DATOS_ALUMNOS = JSON.parse(alumnosGuardados);
    }
}

// Función para agregar un nuevo alumno
function agregarAlumno(event) {
    event.preventDefault(); // Evita que la página se recargue

    const inputNombre = document.getElementById('input-nombre');
    const inputCurso = document.getElementById('input-curso');

    const nombre = inputNombre.value.trim();
    const curso = inputCurso.value.trim();

    if (nombre === "" || curso === "") {
        alert("Por favor, ingrese el nombre y el curso.");
        return;
    }

    // Crea un ID único (usando la fecha actual como un ID simple)
    const nuevoId = Date.now(); 

    const nuevoAlumno = { 
        id: nuevoId, 
        nombre: nombre, 
        curso: curso 
    };

    DATOS_ALUMNOS.push(nuevoAlumno);
    guardarAlumnos(); // Guarda la lista actualizada
    renderizarLista(); // Vuelve a dibujar la lista

    // Limpia el formulario
    inputNombre.value = '';
    inputCurso.value = '';
}


// --------------------------------------------------------------------------
// LAS FUNCIONES DE ESTADO Y RENDERIZACIÓN DEBEN PERMANECER IGUAL
// --------------------------------------------------------------------------

function renderizarLista() {
    const lista = document.getElementById('lista-alumnos');
    lista.innerHTML = ''; 

    // Verificación de lista vacía
    if (DATOS_ALUMNOS.length === 0) {
        lista.innerHTML = '<li class="no-data">❌ La lista está vacía. Use el formulario para añadir alumnos.</li>';
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

        aplicarClaseDeEstado(item, estados[alumno.id]);

        item.innerHTML = `
            <h3>${alumno.nombre}</h3>
            <p>Curso: ${alumno.curso} | Estado: <span class="estado-texto">Pendiente</span></p>
        `;

        item.addEventListener('click', () => cambiarEstado(alumno.id, item));

        lista.appendChild(item);
    });
}

function cambiarEstado(id, itemElemento) {
    let nuevoEstado = (estados[id] + 1) % 3;
    estados[id] = nuevoEstado;
    aplicarClaseDeEstado(itemElemento, nuevoEstado);
}

function aplicarClaseDeEstado(item, estado) {
    item.classList.remove('estado-avisado', 'estado-retirado');
    const estadoTextoElemento = item.querySelector('.estado-texto');
    let nombreEstado = 'Pendiente';

    if (estado === 1) { 
        item.classList.add('estado-avisado');
        nombreEstado = 'AVISADO (Esperando Retiro)';
    } else if (estado === 2) { 
        item.classList.add('estado-retirado');
        nombreEstado = 'RETIRADO (Entregado)';
    }

    if (estadoTextoElemento) {
        estadoTextoElemento.textContent = nombreEstado;
    }
}

// --------------------------------------------------------------------------
// INICIALIZACIÓN
// --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Carga los alumnos guardados antes de renderizar
    cargarAlumnos(); 
    
    // 2. Vincula la función 'agregarAlumno' al evento 'submit' del formulario
    const form = document.getElementById('form-agregar-alumno');
    form.addEventListener('submit', agregarAlumno);
    
    // 3. Renderiza la lista
    renderizarLista();
});
