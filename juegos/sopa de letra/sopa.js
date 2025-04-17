// Configuración del juego
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'sopa',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Instancia del juego
var game = new Phaser.Game(config);

// Variables globales
var selectedLetters = [];
var gridText = [];
var wordsText;
var currentWordsIndex = 0;

// Listas de palabras
const wordsLists = [
    ['phaser', 'juegp', 'codigo'],
    ['HTML', 'CSS', 'JAVASCRIPT'],
    ['COMPUTADORA', 'MONITOR', 'TECLADO']
];

// Función preload: carga los recursos del juego
function preload ()
{
    this.load.image('fondo', '../../img/cesar.webp');
}

// Función create: crea los objetos del juego
function create ()
{
    // Inicializa la primera lista de palabras
    startNewGame(this);
}

// Función update: actualiza la lógica del juego en cada fotograma
function update ()
{
    // Aquí puedes agregar la lógica para las interacciones y el seguimiento del juego
}

// Inicia un nuevo juego con una lista de palabras y sopa de letras
function startNewGame(scene) {
    // Obtiene las dimensiones del lienzo
    var width = scene.sys.game.config.width;
    var height = scene.sys.game.config.height;

    // Limpia la escena anterior
    scene.children.removeAll();

    // Agrega la imagen de fondo y la escala para cubrir el lienzo
    var fondo = scene.add.image(0, 0, 'fondo');
    fondo.setOrigin(0, 0);
    fondo.setDisplaySize(width, height);

    // Genera la cuadrícula de la sopa de letras
    const grid = generateGrid(10, 10, wordsLists[currentWordsIndex]);

    // Dibuja la cuadrícula en el centro del lienzo
    const gridStartX = (width - grid[0].length * 20) / 2;
    const gridStartY = (height - grid.length * 20) / 2;
    drawGrid(scene, grid, gridStartX, gridStartY);

    // Muestra las palabras que el jugador necesita encontrar en el lateral
    wordsText = scene.add.text(width - 150, 50, 'Palabras a encontrar:\n' + wordsLists[currentWordsIndex].join('\n'), { font: '18px Arial', fill: '#000' });

    // Detecta la selección de letras
    scene.input.on('pointerdown', function (pointer, gameObject) {
        if (gameObject.length > 0 && gameObject[0].text) {
            gameObject[0].setColor('#ff0000');
            selectedLetters.push({text: gameObject[0].text, row: Math.floor((pointer.y - gridStartY) / 20), col: Math.floor((pointer.x - gridStartX) / 20)});
            checkWord(selectedLetters, wordsLists[currentWordsIndex], grid, scene);
        }
    });
}

// Genera la cuadrícula de la sopa de letras
function generateGrid(rows, cols, words) {
    const grid = Array.from(Array(rows), () => Array(cols).fill(''));

    // Lógica para colocar las palabras en la cuadrícula
    words.forEach((word, index) => {
        let placed = false;
        while (!placed) {
            let direction = Math.floor(Math.random() * 3);
            let startRow = Math.floor(Math.random() * rows);
            let startCol = Math.floor(Math.random() * cols);
            placed = placeWord(grid, word, startRow, startCol, direction);
        }
    });

    return grid;
}

// Coloca una palabra en la cuadrícula en la dirección especificada
function placeWord(grid, word, row, col, direction) {
    if (direction === 0) { // Horizontal
        if (col + word.length <= grid[0].length) {
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
            return true;
        }
    } else if (direction === 1) { // Vertical
        if (row + word.length <= grid.length) {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
            return true;
        }
    } else if (direction === 2) { // Diagonal
        if (col + word.length <= grid[0].length && row + word.length <= grid.length) {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col + i] = word[i];
            }
            return true;
        }
    }
    return false;
}

// Dibuja la cuadrícula de la sopa de letras en la escena
function drawGrid(scene, grid, startX, startY) {
    const fontStyle = { font: '18px Arial', fill: '#000' };

    for (let row = 0; row < grid.length; row++) {
        gridText[row] = [];
        for (let col = 0; col < grid[row].length; col++) {
            gridText[row][col] = scene.add.text(startX + col * 20, startY + row * 20, grid[row][col] || getRandomLetter(), fontStyle).setInteractive();
        }
    }
}

// Genera una letra aleatoria
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

// Verifica si la palabra seleccionada está en la lista de palabras
function checkWord(selectedLetters, words, grid, scene) {
    const selectedWord = selectedLetters.map(letter => letter.text).join('');

    if (words.includes(selectedWord)) {
        console.log('¡Encontraste una palabra:', selectedWord, '!');
        words = words.filter(word => word !== selectedWord);
        wordsText.setText('Palabras a encontrar:\n' + words.join('\n'));
        
        // Aquí puedes agregar la lógica para destacar las letras de la palabra encontrada
        highlightWord(selectedLetters);
        
        selectedLetters.length = 0;

        // Si todas las palabras han sido encontradas, inicia una nueva lista de palabras
        if (words.length === 0) {
            currentWordsIndex = (currentWordsIndex + 1) % wordsLists.length;
            startNewGame(scene);
        }
    }
}

// Destaca las letras de la palabra encontrada en la cuadrícula
function highlightWord(selectedLetters) {
    selectedLetters.forEach(letter => {
        gridText[letter.row][letter.col].setColor('#00ff00'); // Cambia el color a verde
    });
}
