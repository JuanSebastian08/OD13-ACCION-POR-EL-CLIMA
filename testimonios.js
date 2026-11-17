/**
 * script: testimonios.js
 * Descripción: Manejo interactivo de creación y validación de testimonios dinámicos
 * Proyecto: Clima Vivo Perú - ODS 13
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // Seleccionamos el contenedor donde se insertarán las nuevas tarjetas
  const testimonialsContainer = document.getElementById("testimonialsContainer");

  // Seleccionamos el formulario y sus campos
  const formTestimonio = document.getElementById("form-testimonio");
  const inputNombre = document.getElementById("testimonio-nombre");
  const inputRol = document.getElementById("testimonio-rol");
  const selectPuntuacion = document.getElementById("testimonio-puntuacion");
  const textareaComentario = document.getElementById("testimonio-comentario");

  // Elementos de aviso y contador
  const aviso = document.getElementById("aviso-testimonio");
  const contadorCaracteres = document.getElementById("contador-caracteres");

  // Si el formulario no existe en la página actual, finalizamos la ejecución para evitar errores
  if (!formTestimonio) return;

  // 2. FUNCIÓN DE CONTEO EN TIEMPO REAL DE CARACTERES
  textareaComentario.addEventListener("input", function () {
    const longitud = textareaComentario.value.length;
    contadorCaracteres.textContent = longitud;

    // Si supera los 500 caracteres, cambiamos la clase para advertir visualmente
    if (longitud >= 500) {
      contadorCaracteres.style.color = "#b00020";
      contadorCaracteres.style.fontWeight = "bold";
    } else {
      contadorCaracteres.style.color = "";
      contadorCaracteres.style.fontWeight = "normal";
    }
  });

  // 3. FUNCIÓN AUXILIAR PARA MOSTRAR MENSAJES DE ESTADO
  function mostrarNotificacion(mensaje, esError) {
    aviso.textContent = mensaje;
    if (esError) {
      aviso.className = "aviso error-texto";
    } else {
      aviso.className = "aviso ok";
    }
  }

  // 4. ESCUCHADOR DE EVENTO "SUBMIT" DEL FORMULARIO
  formTestimonio.addEventListener("submit", function (event) {
    // Evitamos la recarga predeterminada de la página
    event.preventDefault();

    // Obtenemos los valores limpios de espacios
    const nombre = inputNombre.value.trim();
    const rol = inputRol.value.trim();
    const puntuacion = selectPuntuacion.value;
    const comentario = textareaComentario.value.trim();

    // Limpiamos estilos de error previos de los inputs
    [inputNombre, inputRol, selectPuntuacion, textareaComentario].forEach(elem => {
      elem.classList.remove("error");
    });

    // 5. VALIDACIÓN DE ENTRADAS (Campos vacíos y límite de 500 caracteres)
    let camposInvalidos = false;

    if (!nombre) {
      inputNombre.classList.add("error");
      camposInvalidos = true;
    }
    if (!rol) {
      inputRol.classList.add("error");
      camposInvalidos = true;
    }
    if (!puntuacion) {
      selectPuntuacion.classList.add("error");
      camposInvalidos = true;
    }
    if (!comentario) {
      textareaComentario.classList.add("error");
      camposInvalidos = true;
    }

    if (camposInvalidos) {
      mostrarNotificacion("Por favor, completa todos los campos requeridos.", true);
      return;
    }

    if (comentario.length > 500) {
      textareaComentario.classList.add("error");
      mostrarNotificacion("El comentario no debe exceder los 500 caracteres.", true);
      return;
    }

    // 6. CREACIÓN DINÁMICA DE LA TARJETA DE TESTIMONIO
    // Convertimos la puntuación numérica en representación visual de estrellas
    const estrellas = "⭐".repeat(parseInt(puntuacion));

    // Creamos la etiqueta <article> para la tarjeta
    const nuevaTarjeta = document.createElement("article");
    nuevaTarjeta.className = "tarjeta tarjeta-nueva";

    // Insertamos la estructura HTML interna utilizando template literals (plantillas de texto)
    nuevaTarjeta.innerHTML = `
      <div class="estrellas" aria-label="Calificación: ${puntuacion} de 5 estrellas">${estrellas}</div>
      <blockquote>“${comentario}”</blockquote>
      <p><strong>— ${nombre}</strong>, ${rol}</p>
    `;

    // 7. INSERCIÓN EN EL DOM
    // Añadimos la nueva tarjeta al contenedor principal testimonialsContainer
    testimonialsContainer.appendChild(nuevaTarjeta);

    // 8. NOTIFICACIÓN DE ÉXITO Y LIMPIEZA
    mostrarNotificacion("¡Gracias! Tu testimonio se ha publicado correctamente.", false);

    // Reiniciamos los campos del formulario y el contador
    formTestimonio.reset();
    contadorCaracteres.textContent = "0";

    // Ocultar la notificación automáticamente tras 5 segundos
    setTimeout(() => {
      aviso.textContent = "";
      aviso.className = "aviso";
    }, 5000);
  });
});