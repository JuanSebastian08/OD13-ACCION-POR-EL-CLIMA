/**
 * script: acciones.js
 * Descripción: Manejo de navegación interactiva de acciones ambientales y dinamismo de interfaz.
 * HU: US-TEST-003 - Sección de Acciones Ambientales y Gráfico de Participación
 * Proyecto: Clima Vivo Perú - ODS 13
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // Seleccionamos los tres botones de opción (radio buttons)
  const radioReforestacion = document.getElementById("accion1");
  const radioReciclaje = document.getElementById("accion2");
  const radioAhorro = document.getElementById("accion3");

  // Seleccionamos los paneles con la información de cada iniciativa
  const panelReforestacion = document.querySelector(".respuesta.accion1");
  const panelReciclaje = document.querySelector(".respuesta.accion2");
  const panelAhorro = document.querySelector(".respuesta.accion3");

  // Verificamos si los elementos existen en la página para evitar errores
  if (!radioReforestacion || !radioReciclaje || !radioAhorro) return;

  // 2. FUNCIÓN PARA ACTUALIZAR LA VISIBILIDAD DE LOS PANELES
  function actualizarContenidoAccion() {
    // Ocultamos todos los paneles por defecto
    panelReforestacion.style.display = "none";
    panelReciclaje.style.display = "none";
    panelAhorro.style.display = "none";

    // Mostramos únicamente el panel correspondiente al botón seleccionado
    if (radioReforestacion.checked) {
      panelReforestacion.style.display = "block";
    } else if (radioReciclaje.checked) {
      panelReciclaje.style.display = "block";
    } else if (radioAhorro.checked) {
      panelAhorro.style.display = "block";
    }
  }

  // 3. ASIGNACIÓN DE ESCUCHADORES DE EVENTO "CHANGE"
  // Detectamos cuando el usuario cambia de opción seleccionada
  radioReforestacion.addEventListener("change", actualizarContenidoAccion);
  radioReciclaje.addEventListener("change", actualizarContenidoAccion);
  radioAhorro.addEventListener("change", actualizarContenidoAccion);

  // 4. INICIALIZACIÓN
  // Ejecutamos la función al cargar la página para reflejar el estado inicial del radio marcado
  actualizarContenidoAccion();
});