let Articulos = document.getElementById('articulos')

Articulos.innerHTML = 
 `
  <div class="header">
             <img style="width: 100%; height: 100%;" src="${imgHeader}" alt="Abrahan">
      </div>

    <div class="main-content" style="max-width: 1200px; margin: auto;">
      <article>
       <h1>"${titulos}"</h1>
       <h2>${subtitulo}</h2>
       <p>${parrafo}</p>
       <h2>${subtitulo2}</h2>
       <p>${parrafo2}</p>
       <h2>${subtitulo3}</h2>
        <p>${parrafo3}</p>  
        <h2>${subtitulo4}</h2>
        <p>${parrafo4}</p>  
        <h2>${subtitulo5}</h2>
        <p>${parrafo5}</p>  
        <h2>${subtitulo6}</h2>   
        <p>${parrafo6}</p>  
      
       
    </article>

        <aside>
            <div class="aside-image">
                <img style="width: 100%; height: 
                100%;" src="${imgaside}" alt="">
            </div>
            <h3>Artículos Relacionados</h3>
            <a href="${urlaside}" class="btn-link">Leer más artículos</a>
        </aside>
        
      
    </div>
  
`;