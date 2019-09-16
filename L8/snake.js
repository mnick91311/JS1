function SnakeGame(root, conf) {
    this.conf = Object.assign({},{
        height: 5,
        width: 5,
        KEY_UP: 'ArrowUp',
        KEY_DOWN: 'ArrowDown',
        KEY_RIGHT: 'ArrowRight',
        KEY_LEFT: 'ArrowLeft',
    }, conf || {})
    this.root = root
    this.root.innerHTML = "\
        <div class='score'>Счет: <span class='score-value'></span></div>\
        <div class='field'></div>\
        <div class='controls'>\
            <button class='control' data-fn='pause'>Старт/Пауза</button>\
            <button class='control' data-fn='reset'>Сброс</button>\
        </div>\
    "
    this.fieldNode = this.root.querySelector('.field')
    this.scoreNode = this.root.querySelector('.score-value')

    this.init = function() {
        this.scoreNode.innerHTML = this.score = 0
        this.dir = this.nextDir = -this.conf.width
        this.moveDelta = {
            [this.conf.KEY_UP]: -this.conf.width,
            [this.conf.KEY_DOWN]: this.conf.width,
            [this.conf.KEY_RIGHT]: 1,
            [this.conf.KEY_LEFT]: -1,
        }
        this.snake = []
        this.playing = false
        this.field = new Array(this.conf.width * this.conf.height)
        this.root.style = "--field-width: " + this.conf.width
        this.fieldNode.innerHTML = ""
        for (var i = 0; i < this.field.length; i++) {
            var cell = this.field[i] = document.createElement('span')
            cell.classList.add('cell')
            cell.dataset["i"] = i
            this.fieldNode.appendChild(cell)
        }
        var center = Math.floor(this.field.length / 2 + this.conf.width / 2)
        var head = this.field[center]
        var tail = this.field[center + this.conf.width]
        head.classList.add('cell_snake-body')
        tail.classList.add('cell_snake-body')
        this.snake = [
            head,
            tail,
        ]
    }

    this.handleEvent = function(e) {
        if (e.type == 'click' && e.target.classList.contains('control')){
            this[e.target.dataset['fn']] && this[e.target.dataset['fn']]()
        }else if (e.type == 'keydown') {
            this.nextDir = this.moveDelta[e.code] || this.nextDir
        }
    }

    this.start = function() {
        if (this.playing) return
        this.playing = true
        this.session_id = new Date().toISOString()
        this.timer(this.move.bind(this), 500, this.session_id)
        this.timer(function() {
            this.placeFood()
            this.placeBomb()
        }.bind(this), 3000, this.session_id)
    }

    this.restart = function() {
        this.stop()
        this.reset()
        this.start()
    }

    this.reset = function() {
        this.init()
    }

    this.stop = function() {
        this.playing = false
    }

    this.pause = function() {
        this.playing ? this.stop() : this.start()
    }

    this.timer = function(fn, interval, session_id) {
        setTimeout(() => {
            if (this.playing && this.session_id == session_id) {
                window.requestAnimationFrame(this.timer.bind(this, fn, interval, session_id))
                fn()
            }
        }, interval)
    }

    this.move = function() {
        var head = this.snake[0]
        var i = +head.dataset["i"]
        var d = this.dir = (this.nextDir*-1 == this.dir) ? this.dir : this.nextDir
        var w = this.conf.width
        var h = this.conf.height
        var j = (this.field.length + Math.floor(i / w) * w + (w + i + d) % w + Math.floor(Math.abs(d) / w) * d) % this.field.length
        var next = this.field[j]
        if (isFood(next)) {
            next.classList.add('cell_snake-body')
            this.snake.unshift(next)
            next.classList.remove('cell_food')
            this.score += 100
            this.scoreNode.innerHTML = this.score
        } else if (isBomb(next) || isSnake(next)) {
            this.stop()
            alert("Game Over!\nВаш счет:\n" + this.score)
            this.reset()
        } else {
            next.classList.add('cell_snake-body')
            this.snake.unshift(next)
            this.snake.pop().classList.remove('cell_snake-body')
        }
    }

    // Closure

    function check(value) {
        let className = 'cell_'+value
        return function(target) {
            return target.classList.contains(className)
        }
    }

    const isFood = check('food')
    const isBomb = check('bomb')
    const isSnake = check('snake-body')

    this.randCell = function() {
        return this.field[Math.floor(Math.random() * this.field.length)]
    }

    this.randEmptyCell = function() {
        var cell
        do {
            cell = this.randCell()
        }while(cell.className !== "cell")
        return cell
    }

    // Closure

    function placeSmth(name) {
        return function() {
            this.randEmptyCell().classList.add('cell_'+name)
        }
    }

    this.placeFood = placeSmth('food')
    this.placeBomb = placeSmth('bomb')

    this.init()
    this.root.addEventListener('click', this, true)
    window.addEventListener('keydown', this, true)
}

var snakeGame = new SnakeGame(document.getElementById('snake-game'), {
    height: 8,
    width: 5,
})