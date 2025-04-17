let carrusel = document.getElementById('carrusel');

carrusel.innerHTML = `
 <div class="slider">
    <div class="slider-images">
      <img src="../img/abrahan.jpg" alt="Imagen 1" class="active">
      <img src="../img/david.jpg" alt="Imagen 2">
      <img src="../img/tecnología romana.jpg" alt="Imagen 3">
    </div>

    <!-- Cajas de contenido -->
    <div class="content-box active">
      <h2>habranhan</h2>
      <p>Este es el subtítulo para la primera imagen.</p>
      <a href="www.facebook.com">Ver más</a>
    </div>
    <div class="content-box">
      <h2>Título 2</h2>
      <p>Este es el subtítulo para la segunda imagen.</p>
      <a href="#link2">Ver más</a>
    </div>
    <div class="content-box">
      <h2>Título 3</h2>
      <p>Este es el subtítulo para la tercera imagen.</p>
      <a href="#link3">Ver más</a>
    </div>
  </div>
`;

// Ahora seleccionamos los elementos después de que se hayan insertado en el DOM<script>
// Seleccionar todas las imágenes y cajas de contenido
const images = document.querySelectorAll('.slider-images img');
const contentBoxes = document.querySelectorAll('.content-box');
let currentIndex = 0;

// Función para cambiar la imagen y el contenido
function changeSlide() {
  // Ocultar la imagen y caja de contenido actuales
  images[currentIndex].classList.remove('active');
  contentBoxes[currentIndex].classList.remove('active');

  // Calcular el índice de la siguiente imagen y caja de contenido
  currentIndex = (currentIndex + 1) % images.length;

  // Mostrar la siguiente imagen y caja de contenido
  images[currentIndex].classList.add('active');
  contentBoxes[currentIndex].classList.add('active');
}

// Cambiar de diapositiva cada 3 segundos (3000 ms)
//setInterval(changeSlide, 5000);

 