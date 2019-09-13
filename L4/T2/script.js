var game = {
    run: false
}

game.init = function() {
    this.scenes = scenes
    this.curScene = scenes[1]
    this.history = []
    this.commonActions = [
        { text: "Exit", code: -1, fn: function(game) { game.stop() } }
    ]
}

game.ask = function(text, actions) {
    var options = '';
    var codes = []
    for(var action of actions) {
        options += '['+action.code+'] ' + action.text + '\n'
        codes.push(action.code)
    }
    var input = ''
    do {
        input = +prompt(text + '\n\n' + options)
    } while (codes.indexOf(input) === -1)
    return actions[codes.indexOf(input)]
}

game.start = function() {
    this.run = true
    this.init()
    this.loop()
}

game.stop = function() {
    this.run = false
    var n = 0
    do {
        n = +prompt("Номер шага (в интервале [0, " + (this.history.length-1) + ']):') || 0
    } while (n < 0 || n >= this.history.length)
    alert(this.history[n].text + '\n\n' + this.history[n].answer.text)
    this.init()
}

game.goto = function(scene) {
    this.curScene = this.scenes[scene]
}

game.loop = function() {
    while(this.run) {
        var text = this.curScene.text
        var actions = [].concat(this.curScene.actions, this.commonActions)
        var answer = this.ask(text, actions)
        this.history.push({text, answer})
        answer.fn(this)
    }
}
