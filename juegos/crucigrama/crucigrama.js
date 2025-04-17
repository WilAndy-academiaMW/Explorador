var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'crucigrama',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

// Instancia del juego
var game = new Phaser.Game(config);

// Variables globales
let activeCell = null;
let cells = [];
let currentLevel = 0;

// Niveles con preguntas
let levels = [
    {
        grid: [
            [1, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        words: [
            { 
                word: 'CASA', 
                question: 'Lugar donde vives', 
                questionPosition: { x: -100, y:  0}, // Posición personalizada
                positions: [[0, 0], [0, 1], [0, 2], [0, 3]] // Horizontal
            },
            { 
                word: 'AVIO', 
                question: 'Objeto que vuela', 
                questionPosition: { x: 10, y: -60 }, // Posición personalizada
                positions: [[2, 0], [2, 1], [2, 2], [2, 3]] // Horizontal
            },
            { 
                word: 'OSO', 
                question: 'Animal que come pescado', 
                questionPosition: { x: 0, y: -80 }, // Posición personalizada
                positions: [[3, 3], [3, 4], [3, 5]] // Horizontal
            },
            { 
                word: 'COAO', 
                question: 'Animal que come pescado', 
                questionPosition: { x: 0, y: -80 }, // Posición personalizada
                positions: [[0, 0], [1, 0], [2, 0], [3, 0]] // Vertical
            }
        ]
    },

    {
        grid: [
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0]
        ],
        words: [
            { 
                word: 'CASA', 
                question: 'Lugar donde vives', 
                questionPosition: { x: -20, y: -70 }, // Posición personalizada
                positions: [[0, 0], [0, 1], [0, 2], [0, 3]] // Horizontal
            },
            { 
                word: 'PERRO', 
                question: 'Animal que ladra', 
                questionPosition: { x: 10, y: -60 }, // Posición personalizada
                positions: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]] // Horizontal
            },
            { 
                word: 'GATO', 
                question: 'Animal que maúlla', 
                questionPosition: { x: 0, y: -80 }, // Posición personalizada
                positions: [[4, 0], [4, 1], [4, 2], [4, 3]] // Horizontal
            }
        ]
    }
];

// Función preload (añadir la carga de la música)
function preload() {
    this.load.image('portada', '1.jpg');
    this.load.image('boton', 'boton.png');
    this.load.image('fondoC', 'fondo-crucigrama.jpg');
    this.load.text('text', 'play');
    this.load.audio('musicaFondo', 'fondo.mp3'); // Añade la ruta de tu música aquí
}

// Función create (añadir la reproducción de la música)
// Función create (añadir la lógica del slider)
// Función create (añadir el slider dentro del canvas)
// Función create (usar capas para el fondo y la UI)
function create() {
    // Crear una capa para el fondo
    const fondoLayer = this.add.layer();

    // Añadir la imagen de fondo a la capa de fondo
    const background = this.add.image(config.width / 2, config.height / 2, 'portada');
    const scaleX = config.width / background.width;
    const scaleY = config.height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
    fondoLayer.add(background); // Añadir la imagen de fondo a la capa de fondo

    // Crear una capa para la interfaz de usuario (UI)
    const uiLayer = this.add.layer();

    const buttonWidth = 150;
    const buttonHeight = 50;
    const buttonX = 20;
    const buttonY = config.height - 70;

    const gradient = this.add.graphics();
    gradient.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
    gradient.fillRoundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    gradient.setInteractive(
        new Phaser.Geom.Rectangle(buttonX, buttonY, buttonWidth, buttonHeight),
        Phaser.Geom.Rectangle.Contains
    );
    uiLayer.add(gradient); // Añadir el botón a la capa de UI

    const play = this.add.text(buttonX + buttonWidth / 2, buttonY + buttonHeight / 2, 'play', {
        font: '24px Arial',
        fill: '#ffffff',
    }).setOrigin(0.5);
    uiLayer.add(play); // Añadir el texto a la capa de UI

    // Variable para almacenar la música de fondo
    let musicaFondo;

    // Crear el slider dentro del canvas
    const sliderWidth = 150; // Ancho de la barra del slider
    const sliderHeight = 10; // Alto de la barra del slider
    const sliderX = config.width - sliderWidth - 20; // Posición X (esquina superior derecha)
    const sliderY = 50; // Posición Y (esquina superior derecha)

    // Barra del slider
    const sliderBar = this.add.rectangle(sliderX, sliderY, sliderWidth, sliderHeight, 0x666666)
        .setOrigin(0, 0.5);
    uiLayer.add(sliderBar); // Añadir la barra del slider a la capa de UI

    // Control deslizante (círculo)
    const sliderHandle = this.add.circle(sliderX, sliderY, 15, 0xffffff)
        .setInteractive()
        .setOrigin(0.5, 0.5);
    uiLayer.add(sliderHandle); // Añadir el control deslizante a la capa de UI

    // Hacer el control deslizante arrastrable
    this.input.setDraggable(sliderHandle);

    // Lógica para ajustar el volumen
    const ajustarVolumen = () => {
        // Calcular el valor del volumen basado en la posición del control deslizante
        const volumen = Phaser.Math.Clamp(
            (sliderHandle.x - sliderX) / sliderWidth, // Valor entre 0 y 1
            0, // Mínimo
            1  // Máximo
        );

        // Ajustar el volumen de la música
        if (musicaFondo) {
            musicaFondo.setVolume(volumen);
        }

        // Mostrar el valor del volumen en la consola (opcional)
        console.log(`Volumen: ${volumen.toFixed(2)}`);
    };

    // Evento cuando el control deslizante es arrastrado
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        // Limitar el movimiento del control deslizante dentro de la barra del slider
        gameObject.x = Phaser.Math.Clamp(dragX, sliderX, sliderX + sliderWidth);

        // Ajustar el volumen
        ajustarVolumen();
    });

    gradient.on('pointerdown', () => {
        console.log('¡Hiciste clic en "play"!');

        // Iniciar la música de fondo
        musicaFondo = this.sound.add('musicaFondo', { loop: true }); // Configurar para que se repita
        musicaFondo.play(); // Reproducir la música

        this.tweens.add({
            targets: [background, gradient, play],
            alpha: 0,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                background.destroy();
                gradient.destroy();
                play.destroy();
                loadLevel.call(this, currentLevel);
            }
        });
    });
}

// Función loadLevel
function loadLevel(levelIndex) {
    const level = levels[levelIndex];
    if (!level) {
        console.log('¡Has completado todos los niveles!');
        return;
    }

    // Limpiar celdas anteriores
    cells = [];
    this.children.each((child) => child.destroy()); // Eliminar todos los objetos de la escena

    // Añadir fondo del crucigrama
    let background = this.add.image(config.width / 2, config.height / 2, 'fondoC');

    // Escalar la imagen proporcionalmente para cubrir todo el canvas
    let scaleX = config.width / background.width;
    let scaleY = config.height / background.height;
    let scale = Math.max(scaleX, scaleY); // Escalar según la dimensión más grande
    background.setScale(scale).setScrollFactor(0);

    // Tamaño de cada celda
    const cellSize = 100; // Tamaño de cada celda (ancho y alto)
    const grid = level.grid;

    // Calcular el tamaño total de la cuadrícula
    const gridWidth = grid[0].length * cellSize;
    const gridHeight = grid.length * cellSize;

    // Calcular el offset para centrar la cuadrícula
    const offsetX = (config.width - gridWidth) / 2; // Centrar horizontalmente
    const offsetY = (config.height - gridHeight) / 2; // Centrar verticalmente

    // Dibujar la cuadrícula
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const x = offsetX + j * cellSize; // Posición X de la celda
            const y = offsetY + i * cellSize; // Posición Y de la celda

            if (grid[i][j] === 1) {
                // Dibujar una celda activa (parte de la senda)
                const cell = this.add.rectangle(x, y, cellSize, cellSize, 0xffffff).setStrokeStyle(2, 0x000000);
                cell.setInteractive(); // Hacer la celda interactiva
                cell.row = i; // Guardar la fila de la celda
                cell.col = j; // Guardar la columna de la celda
                cell.isLocked = false; // Estado de la celda (bloqueada o no)

                // Añadir texto vacío a la celda
                const text = this.add.text(x, y, '', {
                    font: '50px Impact', // Fuente grande y llamativa
                    fill: '#ff0000', // Color rojo
                    stroke: '#000000', // Borde negro
                    strokeThickness: 2 // Grosor del borde
                }).setOrigin(0.5); // Centrar el texto
                cell.text = text; // Guardar referencia al texto

                // Guardar la celda en el array
                cells.push(cell);

                // Evento al hacer clic en la celda
                cell.on('pointerdown', () => {
                    if (!cell.isLocked) { // Solo interactuar si la celda no está bloqueada
                        activeCell = cell; // Establecer como celda activa
                    }
                });
            } else {
                // Dibujar una celda inactiva (vacía)
                this.add.rectangle(x, y, cellSize, cellSize, 0x000000).setStrokeStyle(2, 0x000000);
            }
        }
    }

    // Mostrar las preguntas en las posiciones especificadas
    level.words.forEach((word) => {
        const firstCell = word.positions[0]; // Primera celda de la palabra
        const x = offsetX + firstCell[1] * cellSize; // Posición X de la primera celda
        const y = offsetY + firstCell[0] * cellSize; // Posición Y de la primera celda

        // Posición de la pregunta (relativa a la primera celda)
        const questionX = x + (word.questionPosition?.x || 0); // Usar la posición personalizada o 0 por defecto
        const questionY = y + (word.questionPosition?.y || -50); // Usar la posición personalizada o -50 por defecto

        // Mostrar la pregunta
        const questionText = this.add.text(questionX, questionY, word.question, {
            font: '30px Impact', // Fuente grande y llamativa
            fill: '#ff0000', // Color inicial (rojo)
            stroke: '#000000', // Borde negro
            strokeThickness: 2, // Grosor del borde
            align: 'center' // Alinear al centro
        }).setOrigin(0.5); // Centrar el texto

        // Efecto de cambio de color (solo para la pregunta)
        this.tweens.add({
            targets: questionText,
            fill: [0xff0000, 0xff6600, 0xffff00], // Colores: rojo, naranja, amarillo
            duration: 2000, // Duración de la animación (2 segundos)
            yoyo: true, // Repetir la animación en reversa
            repeat: -1 // Repetir indefinidamente
        });

        // Efecto de aumento de tamaño (solo para la pregunta)
        this.tweens.add({
            targets: questionText,
            scale: { from: 1, to: 1.2 }, // Aumentar el tamaño al 120%
            duration: 1000, // Duración de la animación (1 segundo)
            yoyo: true, // Repetir la animación en reversa
            repeat: -1 // Repetir indefinidamente
        });
    });

    // Habilitar la escritura de texto
    this.input.keyboard.on('keydown', (event) => {
        if (activeCell && event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
            // Limitar a una letra por celda
            activeCell.text.setText(event.key.toUpperCase());
            activeCell = null; // Desactivar la celda después de escribir

            // Verificar si todas las palabras están completas
            if (checkWords(level.words)) {
                currentLevel++; // Pasar al siguiente nivel
                loadLevel.call(this, currentLevel); // Cargar el nuevo nivel
            }
        }
    });
}

// Función checkWords
function checkWords(words) {
    let allWordsComplete = true; // Variable para verificar si todas las palabras están completas

    for (const word of words) {
        let isComplete = true; // Verificar si la palabra actual está completa

        // Verificar cada celda de la palabra
        for (let i = 0; i < word.positions.length; i++) {
            const pos = word.positions[i];
            const cell = cells.find(cell => cell.row === pos[0] && cell.col === pos[1]);
            console.log(`Verificando celda [${pos[0]},${pos[1]}]: Texto = "${cell?.text?.text}", Esperado = "${word.word[i]}"`);

            // Si la celda no coincide con la letra esperada, la palabra no está completa
            if (!cell || cell.text.text !== word.word[i]) {
                isComplete = false;
                break;
            }
        }

        // Si la palabra está completa, marcarla como correcta
        if (isComplete) {
            console.log(`¡Palabra "${word.word}" adivinada correctamente!`);
            for (const pos of word.positions) {
                const cell = cells.find(cell => cell.row === pos[0] && cell.col === pos[1]);
                cell.fillColor = 0x00ff00; // Marcar la celda en verde
                cell.text.setColor('#ffffff'); // Cambiar el color del texto
                cell.isLocked = true; // Bloquear la celda
                cell.disableInteractive(); // Deshabilitar la interacción
            }
        } else {
            console.log(`La palabra "${word.word}" no está completa.`);
            allWordsComplete = false; // Si alguna palabra no está completa, no todas están completas
        }
    }

    // Retornar true solo si todas las palabras están completas
    return allWordsComplete;
}

// Función update
function update() {
    // Lógica de actualización (si es necesaria)
}