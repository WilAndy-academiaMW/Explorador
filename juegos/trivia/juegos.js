let casa = document.getElementById('casa');
let juego = document.getElementById('juego');
let libreria = document.getElementById('libreria');
let libros = document.getElementById('Libros');
let entrenamiento = document.getElementById('entrenamiento');

//home

casa.addEventListener('click', ()=>{
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
  home.innerHTML = `
  <section class="featured">
       <h1>lo mas recomendado</h1>
       <div class="featured-grid">
        <a href="../articulos/julio cesar.html" class="featured-item" data-album="deafkev">
            <img src="../img/cesar.webp">
            <span>Julio cesar</span>
          </a>
         <div class="featured-item" data-album="ksi">
           <img src="../img/napoleon.webp">
           <span>Napoleón Bonaparte</span>
         </div>
         <div class="featured-item" data-album="weezer_blue">
           <img src="../img/tecnología romana.jpg">
           <span>tecnología romana</span>
         </div>
        
       </div>
     </section>
`

home2.innerHTML =`
<section  class="recently-played">
       <h2>Articulos</h2>
     <!--
         <div class="card" data-audio="Undertale - Megalovania - Game Guard.mp3">
           <div class="card-img-container">
             <img src="Sans_battle_idle.webp" alt="Undertale">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Megalovania</h3>
           <p>Undertale OST</p>
         </div>
       </div>-->
     </section>
`;


});

libreria.addEventListener('click', () => {
carrusel.innerHTML = '';

  home.innerHTML =  `
  
<section  class="recently-played">
        <h2>Articulos</h2>
        <div class="card-grid">
          <div class="card" >
            <div class="card-img-container">
              <img src="../img/cesar.webp">
              <button class="play-button">
               <a href='../articulos/julio cesar.html'><i class="fa-solid fa-newspaper"></i> </a>
              </button>
            </div>
            <h3>Julio Cesar</h3>
            <p>general romano</p>
          </div>
  
          <div class="card" >
            <div class="card-img-container">
              <img src="../img/napoleon.webp">
              <button class="play-button">
               <a href='../articulos/napoleon.html'><i class="fa-solid fa-newspaper"></i> </a>
              </button>
            </div>
            <h3>Napoleón Bonaparte</h3>
            <p>general frances</p>
          </div>

           <div class="card" >
            <div class="card-img-container">
              <img src="../img/tecnología romana.jpg">
              <button class="play-button">
               <a href='../articulos/tecnologiaRomana.html'><i class="fa-solid fa-newspaper"></i> </a>
              </button>
            </div>
            <h3>Tecnología romana</h3>
            <p>Imperio Romano</p>
          </div>
      </section>

  `;
  home2.innerHTML= '';


});

// Añadimos el evento de click al elemento "juego"
juego.addEventListener('click', () => {
  carrusel.innerHTML = '';
  home.innerHTML =  `
  
  <section class="recently-played">
    <h2>Juegos</h2>
    <div class="card-grid">
        <div class="card">
            <div class="card-img-container">
                <img src="../img/cesar.webp" alt="Julio Cesar">
                <a href="../juegos/trivia/trivia.html">
                    <button class="play-button">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                </a>
            </div>
            <h3>sopa de letras</h3>
            <p>Juego</p>
        </div>

        <div class="card">
            <div class="card-img-container">
                <img src="/juegos/crucigrama/crucigrama.jpg" alt="crucigrama">
                <a href="../juegos/crucigrama/crucigrama.html">
                    <button class="play-button">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                </a>
            </div>
            <h3>crucigrama</h3>
            <p>Juego</p>
        </div>
        <div class="card">
            <div class="card-img-container">
                <img src="/juegos/Timeline/img/tiempo.jpeg" alt="crucigrama">
                <a href="../juegos/Timeline/timeline.html">
                    <button class="play-button">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                </a>
            </div>
            <h3>Timeline</h3>
            <p>Juego</p>
        </div>
    </div>
</section>


    `;
    home2.innerHTML= '';
 
});


libros.addEventListener('click', () => {
  carrusel.innerHTML = '';
  home.innerHTML = '';
  home.innerHTML =  `
  
  <section  class="recently-played">
          <h2>Libros</h2>
          <div class="card-grid">
            <div class="card" >
             <div class="card-img-container">
               <img src="../libros/El Arte de La Guerra.jpeg">
               <button class="play-button">
               <a href="../libros/El arte de la guerra.html">
            <i class="fa-solid fa-download"></i>
               </a>
           </button>
           </div>
              <h3>El arte de la guerra</h3>             
              <p>Sun Tzu</p>
            </div>

            
            <div class="card" >
             <div class="card-img-container">
               <img src="../libros/Las_meditaciones_de_Marco_Aurelio-Marco_Aurelio-md.png">
               <button class="play-button">
               <a href="../libros/Marco Aurelio-Meditaciones.pdf" download="LAS MEDITACIONES DE MARCO AURELIO.pdf">
              <i class="fa-solid fa-download"></i>
               </a>
           </button>
           </div>
              <h3>Las Meditaciones de Marco Aurelio</h3>
              <p>Marco Aurelio</p>
            </div>

        </section>
  
    `;
    home2.innerHTML= '';
 
});

entrenamiento.addEventListener('click', () => {
  carrusel.innerHTML = '';
  home.innerHTML = '';
  home.innerHTML =  `
  
  <section  class="recently-played">
          <h2>Libros</h2>
          <div class="card-grid">
            <div class="card" >
             <div class="card-img-container">
               <img src="../libros/El Arte de La Guerra.jpeg">
               <button class="play-button">
               <a href="../libros/El arte de la guerra.html">
            <i class="fa-solid fa-dumbbell"></i>
               </a>
           </button>
           </div>
              <h3>El arte de la guerra</h3>             
              <p>Sun Tzu</p>
            </div>

            
            <div class="card" >
             <div class="card-img-container">
               <img src="../libros/Las_meditaciones_de_Marco_Aurelio-Marco_Aurelio-md.png">
               <button class="play-button">
               <a href="../libros/Marco Aurelio-Meditaciones.pdf" download="LAS MEDITACIONES DE MARCO AURELIO.pdf">
             <i class="fa-solid fa-dumbbell"></i>
               </a>
           </button>
           </div>
              <h3>Las Meditaciones de Marco Aurelio</h3>
              <p>Marco Aurelio</p>
            </div>

        </section>
  
    `;
    home2.innerHTML= '';
 
});


