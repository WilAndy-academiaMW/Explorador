

// Banco de preguntas
const preguntas = [
    { 
        question: '¿Fue Napoleón un emperador francés?', 
        respuestas: true, // Verdadero (Napoleón Bonaparte fue emperador de Francia)
    },
    { 
        question: '¿Julio César fue emperador de Roma?', 
        respuestas: false // Falso (Fue dictador vitalicio, pero no emperador)
    },
    { 
        question: '¿La Revolución Francesa comenzó en 1789?', 
        respuestas: true // Verdadero (Toma de la Bastilla, 14 de julio de 1789)
    },
    { 
        question: '¿Cleopatra gobernó Egipto durante la Edad Media?', 
        respuestas: false // Falso (Gobernó en el siglo I a.C., antes de la Edad Media)
    },
    { 
        question: '¿Adolf Hitler fue canciller de Alemania durante la Segunda Guerra Mundial?', 
        respuestas: true // Verdadero (Canciller desde 1933 y líder nazi durante la guerra)
    }
    // (Añade más preguntas si es necesario)
];

// Función principal del juego
function juego(scene, menu, play) {
    // Guardar referencia de la escena para reutilización
    scene = scene;

    // Destruir elementos anteriores del menú
    if (menu) menu.destroy();
    if (play) play.destroy();

    // Objeto para guardar referencias de todos los elementos del juego
    const gameElements = {
        portada2: null,
        textoVidas: null,
        hogar: null,
        trueButton: null,
        falseButton: null,
        textoPregunta: null,
        tweens: [] // Para guardar animaciones y poder detenerlas
    };

    // Crear imagen de fondo
    gameElements.portada2 = scene.add.image(config.width / 2, config.height / 2, 'escena').setAlpha(0);
    
    // Animación de aparición
    gameElements.tweens.push(
        scene.tweens.add({
            targets: gameElements.portada2,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        })
    );

    // Texto de vidas
    gameElements.textoVidas = scene.add.text(900, 50, `${vidas}`, { 
        fontFamily: 'Arial',
        fontSize: 50,
        color: '#000',
        fontWeight: 'bold'
    }).setDepth(1);

    // Botón hogar (para volver al menú)
    gameElements.hogar = scene.add.image(150, 100, 'hogar')
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    
    // Efectos hover para hogar
    gameElements.hogar.on('pointerover', () => {
        scene.game.canvas.style.cursor = 'pointer';
        gameElements.hogar.setScale(0.6);
    });
    
    gameElements.hogar.on('pointerout', () => {
        scene.game.canvas.style.cursor = 'default';
        gameElements.hogar.setScale(0.5);
    });

    // Botón TRUE
    gameElements.trueButton = scene.add.image(config.width / 2, 1200, 'true')
        .setScale(2.5)
        .setInteractive()
        .setDepth(2);
    
    // Efectos hover para TRUE
    gameElements.trueButton.on('pointerover', () => {
        scene.game.canvas.style.cursor = 'pointer';
        gameElements.trueButton.setScale(2.7);
    });
    
    gameElements.trueButton.on('pointerout', () => {
        scene.game.canvas.style.cursor = 'default';
        gameElements.trueButton.setScale(2.5);
    });
    
    // Botón FALSE
    gameElements.falseButton = scene.add.image(config.width / 2, 1500, 'false')
        .setScale(2.5)
        .setInteractive()
        .setDepth(2);
    
    // Efectos hover para FALSE
    gameElements.falseButton.on('pointerover', () => {
        scene.game.canvas.style.cursor = 'pointer';
        gameElements.falseButton.setScale(2.7);
    });
    
    gameElements.falseButton.on('pointerout', () => {
        scene.game.canvas.style.cursor = 'default';
        gameElements.falseButton.setScale(2.5);
    });

    // Texto de la pregunta actual
    let preguntaActual = 0;
    gameElements.textoPregunta = scene.add.text(
        config.width / 2,
        500, 
        preguntas[preguntaActual].question, 
        { 
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '60px',
            color: '#3a2417',
            fontWeight: 'bold',
            align: 'center',
            stroke: '#ffffff',
            strokeThickness: 5,
            wordWrap: { width: config.width - 150 }
        }
    ).setOrigin(0.5, 0.5).setDepth(1);

    // Función para verificar la respuesta
    const verificarRespuesta = (respuestaUsuario) => {
        const respuestaCorrecta = preguntas[preguntaActual].respuestas;
        
        if (respuestaUsuario === respuestaCorrecta) {
            console.log("¡Correcto! ✔️");
        } else {
            vidas -= 30;
            gameElements.textoVidas.setText(`${vidas}`);
            console.log(`Incorrecto ❌. Vidas restantes: ${vidas}`);
            
            // Efecto visual al perder vida
            scene.cameras.main.shake(300, 0.02);
        }

        // Verificar Game Over
        if (vidas <= 0) {
            gameElements.textoPregunta.setText("¡Game Over!\nVidas insuficientes")
                .setFontSize(80)
                .setColor('#ff0000');
            return;
        }

        // Avanzar a la siguiente pregunta
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
            gameElements.textoPregunta.setText(preguntas[preguntaActual].question);
        } else {
            // Si no hay más preguntas, pasar a la siguiente pantalla
            cleanUpGame();
            juegoDOS(scene); // Llamar a la segunda pantalla
        }
    };

    // Asignar eventos a los botones
    gameElements.trueButton.on('pointerdown', () => verificarRespuesta(true));
    gameElements.falseButton.on('pointerdown', () => verificarRespuesta(false));

    // Función para limpiar todos los elementos del juego
    const cleanUpGame = () => {
        // Detener todas las animaciones
        gameElements.tweens.forEach(tween => tween.stop());
        
        // Eliminar todos los elementos
        Object.values(gameElements).forEach(element => {
            if (element && element.destroy) {
                if (element.removeAllListeners) element.removeAllListeners();
                element.destroy();
            }
        });
    };

    // Al presionar "hogar", limpiar y regresar al menú
    gameElements.hogar.on('pointerdown', () => {
        cleanUpGame();
        startGame(scene); // Asegúrate de que `startGame` esté definida
    });
}

// Banco de preguntas para la segunda pantalla (opción múltiple)
const preguntasTWO = [
    { 
        question: '¿Quién fue emperador de Francia?', 
        respuestas1: 'Napoleón Bonaparte',
        respuestas2: 'Simón Bolívar',
        respuestas3: 'Julio César',
        respuestas4: 'César Augusto',
        correcto: 'respuestas1' // Key de la respuesta correcta
    },
    { 
        question: '¿Quién pintó la Mona Lisa?', 
        respuestas1: 'Pablo Picasso',
        respuestas2: 'Vincent van Gogh',
        respuestas3: 'Leonardo da Vinci',
        respuestas4: 'Miguel Ángel',
        correcto: 'respuestas3'
    },
    { 
        question: '¿En qué año llegó Colón a América?', 
        respuestas1: '1492',
        respuestas2: '1521',
        respuestas3: '1607',
        respuestas4: '1776',
        correcto: 'respuestas1'
    }
];

// Segunda pantalla del juego (opción múltiple)
function juegoDOS(scene) {
    const gameElements = {
        portada3: null,
        textoVidas: null,
        hogar: null,
        textoPregunta: null,
        botonesRespuestas: [], // Guardar los 4 botones de respuestas
        tweens: [],
        preguntaActual: 0 // Índice de la pregunta actual
    };

    // Crear imagen de fondo
    gameElements.portada3 = scene.add.image(config.width / 2, config.height / 2, 'escena').setAlpha(0);
    
    // Animación de entrada
    gameElements.tweens.push(
        scene.tweens.add({
            targets: gameElements.portada3,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        })
    );

    // Texto de vidas
    gameElements.textoVidas = scene.add.text(900, 50, `${vidas}`, { 
        fontFamily: 'Arial',
        fontSize: 50,
        color: '#000',
        fontWeight: 'bold'
    }).setDepth(1);

    // Botón hogar (para volver al menú)
    gameElements.hogar = scene.add.image(150, 100, 'hogar')
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);
    
    // Efectos hover para hogar
    gameElements.hogar.on('pointerover', () => gameElements.hogar.setScale(0.6));
    gameElements.hogar.on('pointerout', () => gameElements.hogar.setScale(0.5));

    // Texto de la pregunta
    gameElements.textoPregunta = scene.add.text(
        config.width / 2,
        500,
        preguntasTWO[gameElements.preguntaActual].question,
        { 
            fontFamily: 'Impact, Arial Black, sans-serif',
            fontSize: '60px',
            color: '#3a2417',
            align: 'center',
            wordWrap: { width: config.width - 150 }
        }
    ).setOrigin(0.5, 0.5).setDepth(1);

    // Crear botones de respuestas (4 opciones)
    const opcionesY = [900, 900, 1200, 1200]; // Posiciones Y para cada botón
    const opcionesw = [300, 900, 300, 900]; // Posiciones X para cada botón
    
    for (let i = 0; i < 4; i++) {
        const key = `respuestas${i + 1}`;
        const textoRespuesta = preguntasTWO[gameElements.preguntaActual][key];
        
        const boton = scene.add.text(
            opcionesw[i], // Usar posición X personalizada
            opcionesY[i], // Usar posición Y personalizada
            textoRespuesta,
            { 
                fontFamily: 'Arial',
                fontSize: '40px',
                color: '#ffffff',
               
                padding: { x: 20, y: 10 },
                align: 'center'
            }
        )
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .setDepth(1);

        // Efectos hover
        boton.on('pointerover', () => {
            boton.setBackgroundColor('#6a8ec7');
            scene.game.canvas.style.cursor = 'pointer';
        });
        boton.on('pointerout', () => {
            boton.setBackgroundColor('#4a6ea9');
            scene.game.canvas.style.cursor = 'default';
        });

        // Guardar botón en el array
        gameElements.botonesRespuestas.push(boton);
    }

    // Función para verificar la respuesta
    const verificarRespuesta = (indiceBoton) => {
        const keySeleccionada = `respuestas${indiceBoton + 1}`;
        const keyCorrecta = preguntasTWO[gameElements.preguntaActual].correcto;
        
        if (keySeleccionada === keyCorrecta) {
            // Efecto de acierto (verde + animación)
            gameElements.botonesRespuestas[indiceBoton].setBackgroundColor('#2ecc71');
            scene.tweens.add({
                targets: gameElements.botonesRespuestas[indiceBoton],
                scale: 1.1,
                duration: 300,
                yoyo: true
            });
            
            // Pasar a la siguiente pregunta después de un delay
            scene.time.delayedCall(1000, () => {
                siguientePregunta();
            });
        } else {
            // Efecto de error (rojo + shake)
            gameElements.botonesRespuestas[indiceBoton].setBackgroundColor('#e74c3c');
            scene.cameras.main.shake(300, 0.02);
            
            // Restar vida
            vidas -= 30;
            gameElements.textoVidas.setText(`${vidas}`);
            
            if (vidas <= 0) {
                gameOver();
            }
        }
    };

    // Asignar eventos a los botones
    gameElements.botonesRespuestas.forEach((boton, index) => {
        boton.on('pointerdown', () => verificarRespuesta(index));
    });

    // Función para pasar a la siguiente pregunta
    const siguientePregunta = () => {
        gameElements.preguntaActual++;
        
        if (gameElements.preguntaActual < preguntasTWO.length) {
            // Actualizar pregunta y respuestas
            gameElements.textoPregunta.setText(preguntasTWO[gameElements.preguntaActual].question);
            
            for (let i = 0; i < 4; i++) {
                const key = `respuestas${i + 1}`;
                gameElements.botonesRespuestas[i].setText(preguntasTWO[gameElements.preguntaActual][key]);
                gameElements.botonesRespuestas[i].setBackgroundColor('#4a6ea9'); // Resetear color
            }
        } else {
            // Fin del juego (no hay más preguntas)
            gameOver();
        }
    };

    // Función Game Over
    const gameOver = () => {
        gameElements.textoPregunta.setText("¡Fin del Juego!\n¿Volver al menú?")
            .setFontSize(70)
            .setColor('#ff0000');
        
        // Ocultar botones de respuestas
        gameElements.botonesRespuestas.forEach(boton => boton.setVisible(false));
    };

    // Limpieza de elementos
    const cleanUpGame = () => {
        // Detener todos los tweens
        gameElements.tweens.forEach(tween => {
            if (tween && tween.stop) tween.stop();
        });
        
        // Destruir todos los elementos del juego
        if (gameElements.portada3 && gameElements.portada3.destroy) gameElements.portada3.destroy();
        if (gameElements.textoVidas && gameElements.textoVidas.destroy) gameElements.textoVidas.destroy();
        if (gameElements.hogar && gameElements.hogar.destroy) gameElements.hogar.destroy();
        if (gameElements.textoPregunta && gameElements.textoPregunta.destroy) gameElements.textoPregunta.destroy();
        
        // Destruir todos los botones de respuestas
        gameElements.botonesRespuestas.forEach(boton => {
            if (boton && boton.destroy) {
                // Remover listeners primero para evitar fugas de memoria
                boton.removeAllListeners();
                boton.destroy();
            }
        });
        gameElements.botonesRespuestas = []; // Vaciar el array
        
        // Resetear otros estados si es necesario
        gameElements.preguntaActual = 0;
        gameElements.tweens = [];
    };

    // Evento para volver al menú
    gameElements.hogar.on('pointerdown', () => {
        cleanUpGame();
        startGame(scene);
    });
}