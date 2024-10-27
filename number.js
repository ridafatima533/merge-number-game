let currentLevel = 1;
const totalLevels = 10;


const levels = [
    [4, 4, 8, 16, 32, 64, 128, 256, 512, 32, 32, 64, 128, 512, 256],
    [4, 4, 8, 16, 32, 64, 128, 512, 64, 32, 32, 32, 32, 512, 512, 64],
    [16, 32, 64, 128, 512, 256, 128, 64, 4, 8, 4, 16, 2, 32, 32, 128, 8, 2, 4, 32, 512, 64],
    [4, 8, 4, 16, 2, 32, 32, 128, 8, 2, 4, 32, 512, 64, 16, 32, 64, 128, 512, 256, 128, 64,],
    [16, 32, 64, 128, 512, 256, 128, 64, 4, 8, 4, 16, 2, 32, 32, 128, 8, 2, 4, 32, 512, 64, 4, 8, 4, 16, 2, 32, 32, 128, 8, 2, 4, 32, 512, 64, 16, 32, 64, 128, 512, 256, 128, 64,],
    [4, 4, 8, 16, 32, 64, 128, 512, 64, 32, 32, 32, 32, 512, 512, 64,4, 4, 8, 16, 32, 64, 128, 256, 512, 32, 32, 64, 128, 512, 256]

];

let selectedTiles = [];

function generateGrid(level) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const grid = levels[level - 1];

    grid.forEach((num, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = num;
        tile.dataset.value = num;
        tile.dataset.index = index;
        tile.draggable = true;
        tile.addEventListener('dragstart', (e) => handleDragStart(e, tile));
        tile.addEventListener('dragover', handleDragOver);
        tile.addEventListener('drop', (e) => handleDrop(e, tile));
        gameContainer.appendChild(tile);
    });
}

function handleDragStart(event, tile) {
    selectedTiles = [tile];
    event.dataTransfer.setData('text/plain', tile.dataset.value);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event, targetTile) {
    event.preventDefault();
    const draggedTile = selectedTiles[0];


    if (draggedTile.dataset.value === targetTile.dataset.value) {
        const newValue = parseInt(draggedTile.dataset.value) * 2;

        targetTile.textContent = newValue;
        targetTile.dataset.value = newValue;

        draggedTile.parentElement.removeChild(draggedTile);

        checkForLevelCompletion();
    }
}

function checkForLevelCompletion() {
    const remainingTiles = document.querySelectorAll('.tile');
    const values = [...remainingTiles].map(tile => parseInt(tile.dataset.value));

    if (values.length === 1) {
        alert('Level completed!');
        nextLevel();
    }
}

function nextLevel() {
    if (currentLevel < totalLevels) {
        currentLevel++;
        document.getElementById('level').textContent = currentLevel;
        generateGrid(currentLevel);
    } else {
        alert('Congratulations! You completed all levels!');
    }
}

generateGrid(currentLevel);