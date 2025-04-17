let casa = document.getElementById('casa');
let juego = document.getElementById('juego');
let libreria = document.getElementById('libreria');
let libros = document.getElementById('Libros');
let articulos = document.getElementById('articulos');

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
         <div class="featured-item" data-album="weezer_green">
           <img src="Weezer_-_Green_Album.png" alt="Weezer (Green Album)">
           <span>Weezer (Green Album)</span>
         </div>
         <div class="featured-item" data-album="roblox">
           <img src="IMG_20250119_031320.jpg" alt="Roblox OST">
           <span>Roblox Beats</span>
         </div>
         <div class="featured-item" data-album="pizza">
           <img src="Spr_fakepeppino_intro3loop_0.gif" alt="Pizza Tower OST">
           <span>Pizza Tower OST</span>
         </div>
         <div class="featured-item" data-album="pvz">
           <img src="maxresdefault (1).jpg" alt="Plants vs. Zombies OST">
           <span>PvZ Soundtrack</span>
         </div>
         <div class="featured-item" data-album="undertale">
           <img src="Sans_battle_idle.webp" alt="Undertale">
           <span>Undertale OST</span>
         </div>
       </div>
     </section>
`
  home2.innerHTML =`
<section  class="recently-played">
       <h2>Articulos</h2>
       <div class="card-grid">
         <div class="card" data-audio="DEAF KEV - Invincible [NCS Release].mp3">
           <div class="card-img-container">
             <img src="Screenshot 2025-01-20 3.49.57 PM.png" alt="DEAF KEV">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Invincible</h3>
           <p>DEAF KEV</p>
         </div>
         <div class="card" data-audio="01 - Island in the Sun.mp3">
           <div class="card-img-container">
             <img src="Weezer_-_Green_Album.png" alt="Weezer (Green Album)">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Island in the Sun</h3>
           <p>Weezer</p>
         </div>
         <div class="card" data-audio="KSI - Thick Of It (feat. Trippie Redd) [Official Music Video].mp3">
           <div class="card-img-container">
             <img src="ab67616d0000b27312e5ad29295bd49dd7e45a73.jfif" alt="KSI Album">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Thick Of It</h3>
           <p>KSI feat. Trippie Redd</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 01 - My Name Is Jonas.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>My Name Is Jonas</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 02 - No One Else.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>No One Else</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 03 - The World Has Turned And Left Me Here.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>The World Has Turned And Left Me Here</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Say It Aint So.mp3">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Say It Ain't So</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 05 - Undone - The Sweater Song.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Undone - The Sweater Song</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 06 - Surf Wax America.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Surf Wax America</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 08 - In The Garage.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>In The Garage</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 09 - Holiday.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Holiday</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Weezer - Weezer (Blue Album) - 10 - Only In Dreams.flac">
           <div class="card-img-container">
             <img src="IMG_20250118_004910.jpg" alt="Weezer">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Only In Dreams</h3>
           <p>Weezer</p>
         </div>

         <div class="card" data-audio="Relaxed Scene.mp3">
           <div class="card-img-container">
             <img src="IMG_20250119_031320.jpg" alt="Roblox">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Relaxed Scene</h3>
           <p>Roblox OST</p>
         </div>

         <div class="card" data-audio="Its Pizza Time.mp3">
           <div class="card-img-container">
             <img src="Spr_fakepeppino_intro3loop_0.gif" alt="Pizza Tower">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>It's Pizza Time</h3>
           <p>Pizza Tower OST</p>
         </div>

         <div class="card" data-audio="05. Loonboon.mp3">
           <div class="card-img-container">
             <img src="maxresdefault (1).jpg" alt="PvZ">
             <button class="play-button">
               <i class="fas fa-play"></i>
             </button>
           </div>
           <h3>Loonboon</h3>
           <p>Plants vs. Zombies OST</p>
         </div>

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
       </div>
     </section>
`;


});



libreria.addEventListener('click', () => {
 
articulos.innerHTML = '';
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
      </section>

  `;
  home2.innerHTML= '';


});

// Añadimos el evento de click al elemento "juego"
juego.addEventListener('click', () => {
 
  home.innerHTML =  `
  
  <section class="recently-played">
    <h2>Juegos</h2>
    <div class="card-grid">
        <div class="card">
            <div class="card-img-container">
                <img src="../img/cesar.webp" alt="Julio Cesar">
                <a href="../juegos/sopa de letra/sopa.html">
                    <button class="play-button">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                </a>
            </div>
            <h3>Julio Cesar</h3>
            <p>general romano</p>
        </div>

        <div class="card">
            <div class="card-img-container">
                <img src="../img/cesar.webp" alt="Julio Cesar">
                <a href="../juegos/crucigrama/crucigrama.html">
                    <button class="play-button">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                </a>
            </div>
            <h3>Julio Cesar</h3>
            <p>general romano</p>
        </div>
    </div>
</section>
    `;
    
});


libros.addEventListener('click', () => {

  home.innerHTML =  `
  
  <section  class="recently-played">
          <h2>Libros</h2>
          <div class="card-grid">
            <div class="card" >
             <div class="card-img-container">
               <img src="../libros/El Arte de La Guerra.jpeg">
               <button class="play-button">
               <a href="../libros/El Arte de La Guerra (Sun Tzu).pdf" download="El Arte de La Guerra.pdf">
              <i class="fa-solid fa-book"></i>
               </a>
           </button>
</div>
              <h3>El arte de la guerra</h3>
              
              <p>Sun Tzu</p>
            </div>
  
  
        </section>
  
    `;
    
 
});
