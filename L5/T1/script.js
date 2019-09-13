/*
1. Создать функцию, генерирующую шахматную доску. При этом можно
   использовать любые html-теги по своему желанию. Доска должна быть
   разлинована соответствующим образом, т.е. чередовать черные и белые
   ячейки. Строки должны нумероваться числами от 1 до 8, столбцы –
   латинскими буквами A, B, C, D, E, F, G, H.
*/

var board = []
var colLabels = ["A", "B", "C", "D", "E", "F", "G", "H"]
var rowLabels = ["1", "2", "3", "4", "5", "6", "7", "8"]
for (var i = 0; i < 8 * 8; i++) {
    var col = i % 8
    var row = 8 - Math.floor(i / 8) - 1
    var label = colLabels[col] + rowLabels[row]
    var color = row % 2 ^ col % 2 ? "black" : "white"
    var cell = {
        row,
        col,
        label,
        color,
    }
    board.push(cell)
}

function render(board, root) {
    for (var cell of board) {
        var elCell = document.createElement('div')
        var elLabel = document.createElement('span')
        elCell.classList.add("cell")
        elCell.classList.add("cell_" + cell.color)
        elLabel.innerText = cell.label
        elLabel.classList.add("cell__label")
        elCell.appendChild(elLabel)
        root.appendChild(elCell)
    }
}

render(board, document.querySelector('#field'))