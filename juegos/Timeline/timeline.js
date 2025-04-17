// Configuración de Phaser
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'timeline',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 0.5
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

// Variables globales del juego
let nivelActual = 1;
const imagenesPorNivel = 5;
let imagenesConfig = [];
let puntuacionGlobal = 0; // Puntuación que persiste entre niveles
let imagenesBase = [
    { 
        nombre: 'napoleon', 
        ruta: '../../img/napoleon.webp',
        fecha: {
            texto: "1800 A.D",
            x: 300,
            y: 1000
        }
    },
    { 
        nombre: 'revolucion', 
        ruta: '../../img/1.webp',
        fecha: {
            texto: "1820 D.C",
            x: 600,
            y: 1000
        }
    },
    { 
        nombre: 'guerra', 
        ruta: '../../img/2.webp',
        fecha: {
            texto: "1850 D.C",
            x: 900,
            y: 1000
        }
    },
    { 
        nombre: 'exploracion', 
        ruta: '../../img/3.webp',
        fecha: {
            texto: "1880 A.C",
            x: 1150,
            y: 1000
        }
    },
    { 
        nombre: 'tecnologia', 
        ruta: '../../img/4.webp',
        fecha: {
            texto: "1900 A.C",
            x: 1450,
            y: 1000
        }
    }
];

// Precarga de recursos
function preload() {
    this.load.image('fondo', 'img/timeline.jpg');
    this.load.image('boton1', 'img/boton1.png');
    this.load.image('fondo2', 'img/juego1.jpg');
    this.load.image('marco', 'img/juego2.png');
    
    imagenesBase.forEach((img, index) => {
        this.load.image(`imagen_base_${index}`, img.ruta);
    });
}

// Generador de contenido para cada nivel
function generarContenidoNivel(nivel) {
    imagenesConfig = [];
    
    // Generar imágenes para este nivel
    for (let i = 0; i < imagenesPorNivel; i++) {
        const imgIndex = (i + (nivel-1)*imagenesPorNivel) % imagenesBase.length;
        const imgBase = imagenesBase[imgIndex];
        
        imagenesConfig.push({
            key: `imagen_n${nivel}_${i}`,
            textureKey: `imagen_base_${imgIndex}`,
            posInicial: { 
                x: 560 + (i * 200), 
                y: 185, 
                scale: 1 
            },
            posCorrecta: { 
                x: imgBase.fecha.x, // Usar posición X de la fecha
                y: 800, // Posición Y fija para imágenes colocadas
                scale: 0.9 
            },
            fecha: imgBase.fecha, // Incorporar la fecha completa
            visible: i < 3 // Mostrar solo 3 inicialmente
        });
    }
}

// Creación de la escena
function create() {
    generarContenidoNivel(nivelActual);
    
    this.add.image(0, 0, 'fondo')
        .setOrigin(0)
        .setDisplaySize(1920, 1080);

    const boton = this.add.image(960, 940, 'boton1')
        .setInteractive()
        .setScale(0.3);

    boton.on('pointerover', () => animateButton(this, boton, 0.5));
    boton.on('pointerout', () => animateButton(this, boton, 0.3));
    boton.on('pointerdown', () => {
        animateButton(this, boton, 0.6, true, () => iniciarJuego.call(this));
    });
}

function animateButton(scene, button, scale, yoyo = false, callback = null) {
    scene.tweens.add({
        targets: button,
        scale,
        duration: yoyo ? 100 : 120,
        ease: 'Linear',
        yoyo,
        onComplete: callback
    });
}

// Función principal del juego
function iniciarJuego() {
    // Limpiar escena completamente
    this.children.each(child => child.destroy());

    // Inicializar sistemas
    this.imagenesActivas = [];
    this.textosFecha = []; // Array para guardar textos de fecha

    // Configurar métodos
    this.agregarImagenActiva = function(imagenConfig) {
        const sprite = this.add.image(
            imagenConfig.posInicial.x,
            imagenConfig.posInicial.y,
            imagenConfig.textureKey
        )
        .setInteractive({ cursor: 'pointer' })
        .setScale(imagenConfig.posInicial.scale)
        .setDepth(1)
        .setAlpha(0);

        sprite.setData({
            posInicial: imagenConfig.posInicial,
            posCorrecta: imagenConfig.posCorrecta,
            fecha: imagenConfig.fecha,
            colocada: false,
            configKey: imagenConfig.key
        });

        this.input.setDraggable(sprite);
        sprite.on('dragstart', () => onDragStart(this, sprite));
        sprite.on('drag', (pointer, x, y) => onDrag(sprite, x, y));
        sprite.on('dragend', () => onDragEnd(this, sprite));

        this.tweens.add({
            targets: sprite,
            alpha: 1,
            duration: 800,
            ease: 'Cubic.easeOut'
        });

        this.imagenesActivas.push(sprite);
        return sprite;
    }.bind(this);

    this.reemplazarImagenColocada = function(spriteColocado) {
        const posicionLibre = spriteColocado.getData('posInicial');
        
        // Buscar siguiente imagen no mostrada
        const siguienteImagen = imagenesConfig.find(img => 
            !this.imagenesActivas.some(activa => activa.getData('configKey') === img.key) &&
            !img.visible
        );

        if (siguienteImagen) {
            siguienteImagen.posInicial = { ...posicionLibre };
            siguienteImagen.visible = true;
            
            this.time.delayedCall(500, () => {
                this.agregarImagenActiva(siguienteImagen);
            });
        } else {
            // Verificar si todas están colocadas
            const todasColocadas = imagenesConfig.every(img => 
                this.imagenesActivas.some(activa => 
                    activa.getData('configKey') === img.key && 
                    activa.getData('colocada')
                )
            );
            
            if (todasColocadas) {
                // Limpiar imágenes actuales
                this.imagenesActivas.forEach(img => img.destroy());
                this.imagenesActivas = [];
                
                // Limpiar textos de fecha
                this.textosFecha.forEach(texto => texto.destroy());
                this.textosFecha = [];
                
                // Avanzar al siguiente nivel
                nivelActual++;
                generarContenidoNivel(nivelActual);
                
                // Mostrar mensaje de nivel completado
                const mensaje = this.add.text(960, 540, `¡Nivel ${nivelActual-1} completado!`, {
                    fontFamily: 'Arial',
                    fontSize: '72px',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 5
                }).setOrigin(0.5).setDepth(5);
                
                // Iniciar nuevo nivel después de 2 segundos
                this.time.delayedCall(2000, () => {
                    mensaje.destroy();
                    iniciarJuego.call(this);
                });
            }
        }
    }.bind(this);

    this.actualizarPuntuacion = function(puntos) {
        puntuacionGlobal += puntos; // Modificar la variable global
        this.textoPuntuacion.setText(puntuacionGlobal);
        
        this.tweens.add({
            targets: this.textoPuntuacion,
            scale: 1.2,
            duration: 200,
            yoyo: true,
            ease: 'Power2'
        });
    }.bind(this);

    // --- Crear elementos del juego ---
    // 1. Fondo
    this.add.image(0, 0, 'fondo2')
        .setOrigin(0)
        .setDisplaySize(1920, 1080)
        .setDepth(0);

    // 2. Imágenes iniciales
    imagenesConfig.filter(img => img.visible).forEach(imagen => {
        this.agregarImagenActiva(imagen);
    });

    // 3. Marcos de posición y textos de fecha
    imagenesConfig.forEach(imagen => {
        // Marco de posición
        this.add.rectangle(
            imagen.posCorrecta.x,
            imagen.posCorrecta.y,
            180,
            180,
            0xFFFFFF,
            0
        )
        .setStrokeStyle(3, 0xFF0000)
        .setDepth(1)
        .setAlpha(0.3);
        
        // Texto de fecha (solo para imágenes visibles)
        if (imagen.visible) {
            const textoFecha = this.add.text(
                imagen.fecha.x,
                imagen.fecha.y,
                imagen.fecha.texto,
                {
                    fontFamily: 'Arial',
                    fontSize: '48px',
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 3
                }
            ).setDepth(3);
            
            this.textosFecha.push(textoFecha);
        }
    });

    // 4. Marco de interfaz
    this.add.image(0, 0, 'marco')
        .setOrigin(0)
        .setDisplaySize(1920, 1080)
        .setDepth(2);

    // 5. UI (puntuación y nivel)
    this.textoPuntuacion = this.add.text(1650, 250, puntuacionGlobal.toString(), {
        fontFamily: 'Arial',
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3
    }).setDepth(4);
    
    this.textoNivel = this.add.text(1650, 320, `Nivel: ${nivelActual}`, {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 3
    }).setDepth(4);
}

// Funciones de arrastre
function onDragStart(scene, sprite) {
    if (sprite.getData('colocada')) return;
    
    sprite.setDepth(5);
    scene.tweens.add({
        targets: sprite,
        scale: 0.8,
        duration: 200,
        ease: 'Back.easeOut'
    });
}

function onDrag(sprite, x, y) {
    if (sprite.getData('colocada')) return;
    sprite.setPosition(x, y);
}

function onDragEnd(scene, sprite) {
    if (sprite.getData('colocada')) return;

    const posCorrecta = sprite.getData('posCorrecta');
    const distancia = Phaser.Math.Distance.Between(
        sprite.x, sprite.y,
        posCorrecta.x, posCorrecta.y
    );

    if (distancia < 100) {
        scene.tweens.add({
            targets: sprite,
            x: posCorrecta.x,
            y: posCorrecta.y,
            scale: posCorrecta.scale,
            duration: 300,
            ease: 'Back.easeOut',
            onComplete: () => {
                sprite.setData('colocada', true);
                scene.actualizarPuntuacion(100);
                scene.reemplazarImagenColocada(sprite);
            }
        });
    } else {
        const posInicial = sprite.getData('posInicial');
        scene.tweens.add({
            targets: sprite,
            x: posInicial.x,
            y: posInicial.y,
            scale: posInicial.scale,
            duration: 500,
            ease: 'Bounce.easeOut'
        });
    }
}