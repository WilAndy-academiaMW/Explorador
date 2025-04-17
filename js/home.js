// Seleccionamos los elementos por su ID
let home = document.getElementById('home');
let home2 = document.getElementById('home2');



home.innerHTML = `
   <section class="featured">
        <h1>lo mas recomendado</h1>
        <div class="featured-grid">
          <a href="../articulos/julio cesar.html" class="featured-item" data-album="deafkev">
            <img src="../img/cesar.webp">
            <span>Julio cesar</span>
          </a>
          <a href="../articulos/napoleon.html" class="featured-item" data-album="deafkev">
            <img src="../img/napoleon.webp">
            <span>Napoleón Bonaparte</span>
          </a>
          <div class="featured-item" data-album="weezer_blue">
            <img src="../img/tecnología romana.jpg">
            <span>tecnología romana</span>
          </div>
        
      </section>
`

home2.innerHTML =`
<section  class="recently-played">
        <h2>Articulos</h2>
       
      </section>
`;









