function Pieces() {
    var availablePieces = [
        "rock", "knight", "bishop", "queen", "king", "bishop", "knight", "rock",
        "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    ]
    this.pieces = new Array(8 * 8)
    this.dom = document.createElement('div')
    this.dom.classList.add("pices")

    for (var i = 0; i < 16; i++) {
        this.pieces[i] = new Piece(availablePieces[i], "black")
        this.pieces[63 - i] = new Piece(availablePieces[i], "white")
        this.dom.appendChild(this.pieces[i].dom)
        this.dom.appendChild(this.pieces[63 - i].dom)
    }
    [this.pieces[60], this.pieces[59]] = [this.pieces[59], this.pieces[60]]

    this.render = function () {
        for (var i in this.pieces) {
            var piece = this.pieces[i]
            var col = i % 8
            var row = Math.floor(i / 8)
            piece.dom.style.top = row * 3 + "rem"
            piece.dom.style.left = col * 3 + "rem"
            piece.dom.dataset["i"] = i
        }
    }
}

function Piece(type, side) {
    this.type = type
    this.side = side
    this.dom = document.createElement('span')
    this.dom.classList.add("piece")
    this.dom.classList.add("piece_" + this.type)
    this.dom.classList.add("piece_" + this.side)
}

function Cells() {
    this.cells = []
    this.dom = document.createElement("div")
    this.dom.classList.add("cells")

    for (var i = 0; i < 8 * 8; i++) {
        var col = i % 8
        var row = 8 - Math.floor(i / 8) - 1
        var cell = new Cell(row, col)
        this.cells.push(cell)
        this.dom.appendChild(cell.dom)
    }
}

function Cell(row, col) {
    var colLabels = ["A", "B", "C", "D", "E", "F", "G", "H"]
    var rowLabels = ["1", "2", "3", "4", "5", "6", "7", "8"]
    this.row = row
    this.col = col
    this.color = row % 2 ^ col % 2 ? "black" : "white"
    this.label = colLabels[col] + rowLabels[row]
    this.dom = document.createElement('div')
    this.dom.classList.add("cell")
    this.dom.classList.add("cell_" + this.color)
    this.dom.innerHTML = "<span class='cell__label'>"+this.label+"</span>"
}

function Game(root) {
    this.dom = root
    this.board = new Cells()
    this.pieces = new Pieces()
    this.dom.appendChild(this.board.dom)
    this.dom.appendChild(this.pieces.dom)

    this.render = function() {
        this.pieces.render()
    }
}

function Themes(root, target) {
    this.dom = root
    this.target = target

    this.themes = [
        {
            '--cell_light': 'hsl(100, 30%, 80%)',
            '--cell_dark': 'hsl(100, 20%, 50%)',
            '--cell_label': 'hsl(100, 20%, 20%)',
        }, {
            '--cell_light': '#fff',
            '--cell_dark': '#333',
            '--cell_label': '#777',
        }, {
            '--cell_light': 'hsl(28, 40%, 80%)',
            '--cell_dark': 'hsl(28, 30%, 50%)',
            '--cell_label': 'hsl(28, 40%, 25%)',
        }
    ]

    this.dom.innerHTML = ""

    for(var i in this.themes) {
        var theme = this.themes[i]
        var styles = ""
        for(var style in theme) {
            styles += style + ':' + theme[style] + ';'
        }
        this.dom.innerHTML += "<span class='theme_button' style='" + styles + "' onclick='themes.select(" + i +")'></span>"
    }

    this.select = function(i) {
        var theme = this.themes[i]
        var styles = ""
        for (var style in theme) {
            styles += style + ':' + theme[style] + ';'
        }
        this.target.style.cssText = styles
    }
}

var themes = new Themes(
    document.querySelector('#themes'),
    document.querySelector('#field')
)
themes.select(0)

var game = new Game(document.querySelector('#field'))
game.render()