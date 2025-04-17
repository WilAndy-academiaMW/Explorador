const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    parent: 'trivia',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Variables de escena (las declararemos dentro de create() usando this)
let portada, playButton, portada2; // Opcional: puedes eliminarlas completamente

var vidas = 100;

function preload() {
    this.load.image('portada', 'img/1.jpg');
    this.load.image('menu', 'img/2.jpg');
    this.load.image('escena', 'img/3.jpg');
    this.load.image('play', 'img/play.png');
    this.load.image('iniciar', 'img/iniciar.png');
    this.load.image('true', 'img/true.png');
    this.load.image('false', 'img/false.png');
    this.load.image('hogar', 'img/hogar.png');
    this.load.image('ganarvida', 'img/GANARVIDA.png');

    
}

function create() {
    // Variables locales en lugar de propiedades de escena
    const scene = this;
    const portada = scene.add.image(config.width / 2, config.height / 2, 'portada');
    
    const playButton = scene.add.image(config.width / 2, config.height / 1.1, 'play')
        .setScale(1.3)
        .setInteractive();

    // Animación hover
    playButton.on('pointerover', () => {
        scene.game.canvas.style.cursor = "pointer";
        scene.tweens.add({
            targets: playButton,
            scale: 1.5,
            duration: 200,
            ease: 'Quad.easeOut'
        });
    });

    playButton.on('pointerout', () => {
        scene.game.canvas.style.cursor = "default";
        scene.tweens.add({
            targets: playButton,
            scale: 1.3,
            duration: 200,
            ease: 'Quad.easeOut'
        });
    });

    playButton.on('pointerdown', () => {
        startGame(scene, portada, playButton);
    });
}

// Función independiente que recibe lo que necesita como parámetros
function startGame(scene, portada, playButton) {
    // Limpieza inicial de elementos anteriores
    if (portada) portada.destroy();
    if (playButton) playButton.destroy();

    // =============================================
    // PANTALLA DE CARGA
    // =============================================
    const loadingContainer = scene.add.container(0, 0).setDepth(1000);
    
    // Fondo oscuro semitransparente
    const loadingBg = scene.add.rectangle(
        config.width / 2, 
        config.height / 2, 
        config.width + 100,  // Un poco más grande para evitar bordes
        config.height + 100, 
        0x121212,            // Color oscuro
        0.9                  // Opacidad
    ).setOrigin(0.5);
    
    // Texto de carga
    const loadingText = scene.add.text(
        config.width / 2, 
        config.height / 2 - 100, 
        'CARGANDO', 
        { 
            fontFamily: 'Arial',
            fontSize: '72px',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 5,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 3,
                stroke: true
            }
        }
    ).setOrigin(0.5);
    
    // Barra de progreso (fondo)
    const progressBarBg = scene.add.rectangle(
        config.width / 2, 
        config.height / 2 + 50, 
        600, 
        30, 
        0x333333
    ).setOrigin(0.5);
    
    // Barra de progreso (relleno)
    const progressBar = scene.add.rectangle(
        config.width / 2 - 300,  // Posición inicial (izquierda)
        config.height / 2 + 50, 
        0,                       // Ancho inicial (0)
        30, 
        0x4CAF50                 // Color verde
    ).setOrigin(0, 0.5);         // Origen en el lado izquierdo
    
    // Añadir todos los elementos al contenedor
    loadingContainer.add([loadingBg, loadingText, progressBarBg, progressBar]);
    
    // Animación de puntos suspensivos
    let dots = 0;
    const dotsInterval = scene.time.addEvent({
        delay: 500,
        callback: () => {
            dots = (dots + 1) % 4;
            loadingText.setText('CARGANDO' + '.'.repeat(dots));
        },
        loop: true
    });
    
    // =============================================
    // SIMULACIÓN DE CARGA (o carga real de assets)
    // =============================================
    let progress = 0;
    const loadInterval = scene.time.addEvent({
        delay: 100,  // Actualizar cada 100ms
        callback: () => {
            progress += 0.05;
            progressBar.width = 600 * Math.min(progress, 1);
            
            if (progress >= 1) {
                // Cuando la carga está completa:
                dotsInterval.destroy();
                loadInterval.destroy();
                
                // Efecto de desvanecimiento
                scene.tweens.add({
                    targets: loadingContainer,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        loadingContainer.destroy();
                        initMainMenu(scene);  // Iniciar el menú principal
                    }
                });
            }
        },
        loop: true
    });

    // =============================================
    // FUNCIÓN PARA INICIAR EL MENÚ PRINCIPAL
    // =============================================
    function initMainMenu(scene) {
        // Objeto para gestionar todos los elementos del menú
        const menuElements = {
            menu: null,
            ganarV: null,
            play: null,
            vidaText: null,
            tweens: [],
            audio: null,
            hogar: null
        };

        // Fondo del menú principal
        menuElements.menu = scene.add.image(config.width / 2, config.height / 2, 'menu')
            .setAlpha(0);

        // Animación de aparición suave
        const menuFadeIn = scene.tweens.add({
            targets: menuElements.menu,
            alpha: 1,
            duration: 800,
            ease: 'Quad.easeOut'
        });
        menuElements.tweens.push(menuFadeIn);

        // Botón para ganar vidas (publicidad)
        menuElements.ganarV = scene.add.image(config.width / 2, config.height / 1.6, 'ganarvida')
            .setAlpha(0)
            .setScale(1.4)
            .setInteractive()
            .setDepth(1);

        // Animación del botón ganarV
        const buttonFadeIn = scene.tweens.add({
            targets: menuElements.ganarV,
            alpha: 1,
            duration: 1000,
            delay: 300
        });
        menuElements.tweens.push(buttonFadeIn);

        // Efectos hover para ganarV
        menuElements.ganarV.on('pointerover', () => {
            scene.game.canvas.style.cursor = 'pointer';
            scene.tweens.add({
                targets: menuElements.ganarV,
                scale: 1.6,
                duration: 200
            });
        });

        menuElements.ganarV.on('pointerout', () => {
            scene.game.canvas.style.cursor = 'default';
            scene.tweens.add({
                targets: menuElements.ganarV,
                scale: 1.4,
                duration: 200
            });
        });

        // Sistema de publicidad para ganar vidas
        menuElements.ganarV.on('pointerdown', () => {
            // Deshabilitar interacción temporalmente
            menuElements.ganarV.disableInteractive();
            
            // 1. Fondo oscuro semitransparente
            const adOverlay = scene.add.rectangle(
                config.width / 2, 
                config.height / 2, 
                config.width + 100, 
                config.height + 100, 
                0x000000, 
                0.85
            )
                .setDepth(20)
                .setInteractive();

            // 2. Contenedor del video (simulado)
            const videoContainer = scene.add.container(config.width / 2, config.height / 2)
                .setDepth(21);
            
            // Fondo del reproductor
            const videoBackground = scene.add.rectangle(
                0, 0, 
                700, 
                400, 
                0x222222
            )
                .setStrokeStyle(3, 0xFFFFFF);
            
            // Icono de video (placeholder)
            const videoIcon = scene.add.text(
                0, -30, 
                '🎬', 
                { fontSize: '80px' }
            ).setOrigin(0.5);
            
            // Texto de publicidad
            const adText = scene.add.text(
                0, 50, 
                'VIDEO PUBLICITARIO', 
                { 
                    fontSize: '32px', 
                    color: '#FFFFFF',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);
            
            // Contador regresivo
            const countdownText = scene.add.text(
                0, 120, 
                '5', 
                { 
                    fontSize: '72px', 
                    color: '#FFD700',
                    fontStyle: 'bold',
                    stroke: '#000000',
                    strokeThickness: 5
                }
            ).setOrigin(0.5);
            
            videoContainer.add([videoBackground, videoIcon, adText, countdownText]);
            videoContainer.setScale(0.8);

            // 3. Temporizador de publicidad
            let secondsRemaining = 5;
            const countdownTimer = scene.time.addEvent({
                delay: 1000,
                repeat: 5,
                callback: () => {
                    secondsRemaining--;
                    countdownText.setText(secondsRemaining);
                    
                    if (secondsRemaining <= 0) {
                        // Recompensa al completar
                        vidas += 60;
                        menuElements.vidaText.setText(vidas);
                        
                        // Efecto visual de recompensa
                        const rewardEffect = scene.add.text(
                            config.width / 2,
                            config.height / 2,
                            '+60 VIDAS',
                            { 
                                fontSize: '64px', 
                                color: '#00FF00',
                                stroke: '#000000',
                                strokeThickness: 4
                            }
                        )
                            .setOrigin(0.5)
                            .setDepth(25);
                        
                        // Animación de recompensa
                        scene.tweens.add({
                            targets: rewardEffect,
                            y: rewardEffect.y - 100,
                            alpha: 0,
                            duration: 1500,
                            onComplete: () => rewardEffect.destroy()
                        });
                        
                        // Limpieza
                        adOverlay.destroy();
                        videoContainer.destroy();
                        countdownTimer.destroy();
                        
                        // Reactivar botón
                        menuElements.ganarV.setInteractive();
                    }
                }
            });
        });

        // Botón principal de juego
        menuElements.play = scene.add.image(config.width / 2, config.height / 1.1, 'iniciar')
            .setScale(1.3)
            .setInteractive()
            .setDepth(1);

        // Efectos hover para el botón play
        menuElements.play.on('pointerover', () => {
            scene.game.canvas.style.cursor = 'pointer';
            scene.tweens.add({
                targets: menuElements.play,
                scale: 1.5,
                duration: 200
            });
        });

        menuElements.play.on('pointerout', () => {
            scene.game.canvas.style.cursor = 'default';
            scene.tweens.add({
                targets: menuElements.play,
                scale: 1.3,
                duration: 200
            });
        });

        // Texto de vidas con estilo mejorado
        menuElements.vidaText = scene.add.text(880, 50, vidas.toString(), {
            fontFamily: 'Arial',
            fontSize: '60px',
            color: '#000',
            fontWeight: 'bold'
        }).setDepth(2);

        // Botón hogar (para volver al menú)
        menuElements.hogar = scene.add.image(150, 100, 'hogar')
            .setScale(0.5)
            .setInteractive()
            .setDepth(2);

        // Efectos hover para hogar
        menuElements.hogar.on('pointerover', () => {
            scene.game.canvas.style.cursor = 'pointer';
            menuElements.hogar.setScale(0.6);
        });

        menuElements.hogar.on('pointerout', () => {
            scene.game.canvas.style.cursor = 'default';
            menuElements.hogar.setScale(0.5);
        });

        menuElements.hogar.on('pointerdown', () => {
            // Redirigir a index.html
            window.location.href = '../../index.html';
        });

        // Función para limpiar el menú
        const cleanUpMenu = () => {
            // Detener animaciones
            menuElements.tweens.forEach(tween => tween.stop());
            
            // Detener sonidos si existen
            if (menuElements.audio) {
                menuElements.audio.stop();
            }
            
            // Destruir elementos
            Object.values(menuElements).forEach(element => {
                if (element && typeof element.destroy === 'function') {
                    if (element.removeAllListeners) element.removeAllListeners();
                    element.destroy();
                }
            });
        };

        // Evento para iniciar el juego
        menuElements.play.on('pointerdown', () => {
            cleanUpMenu();
            juego(scene);  // Esta es tu función juego() original
        });

        // Hacer accesible la función de limpieza
        scene.cleanUpMenu = cleanUpMenu;
    }
}
function update() {}