let nav = document.getElementById('nav');
let header = document.getElementById('header');

nav.innerHTML = `
  
        <a class="logos" href="${inicio}">
           <img   src=${img} alt="" style="width: 100%; height: 120px;" >
       </a>
      
      
      <ul class="nav-links">
        <li  id="casa" class="active">
          <i class="fas fa-home"></i>
          Home
        </li>
       
        <li id="libreria">
         <i class="fa-solid fa-newspaper"></i>
          Articulos
        </li>
         <li id="juego">
          <i class="fa-solid fa-gamepad"></i>
          juegos
        </li>
        <li id="Libros">
          <i class="fa-solid fa-book"></i></i>
          Libros
        </li>
        <li id="entrenamiento">
          <i class="fa-solid fa-dumbbell"></i>
          Entrenamiento
        </li>
      </ul>
      <!--
      <div class="playlists">
        <div class="create-playlist">
          <div class="plus-icon">+</div>
          Create Playlist
        </div>
        <div class="liked-songs">
          <div class="heart-gradient">
            <i class="fas fa-heart"></i>
          </div>
          Liked Songs
        </div>
      </div>--> 
`;

header.innerHTML = `
<div class="header-buttons">
       <div style="display: flex; align-items:center;" >
            <img src="img/perfil.png" alt="perfil" >
       </div>
       <div class="redes" >  
           <button class="nav-btn"><i class="fa-brands fa-tiktok"></i></button>
          <button class="nav-btn"><i class="fa-brands fa-youtube"></i></button>
        </div>
          </div>
       
`;

// insertH1.js
function insertH1(text) {
  const container = document.getElementById('container');
  const h1 = document.createElement('h1');
  h1.textContent = text;
  container.appendChild(h1);
}
