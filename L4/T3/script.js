/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var game = {
    run: false,
    scores: [
        "0 руб.",
        "500 руб.",
        "1000 руб.",
        "2000 руб.",
        "3000 руб.",
        "5000 руб.",
        "10 000 руб.",
        "15 000 руб.",
        "25 000 руб.",
        "50 000 руб.",
        "100 000 руб.",
        "200 000 руб.",
        "400 000 руб.",
        "800 000 руб.",
        "1 500 000 руб.",
        "3 000 000 руб.",
    ]
}

game.init = function () {
    this.questions = shuffle(questions)

    this.canMistake = false
    this.curScore = 0
    this.fireproofScore = 0
}

game.ask = function(q) {
    var text = "Текущая сумма: "+this.scores[this.curScore]+"\nВопрос на "+this.scores[this.curScore+1] + "\nВопрос:\n" + q.text
    var answers = shuffle(q.answers)
    var codes = ['A', 'B', 'C', 'D']
    var n = ''
    do {
        n = prompt(text + '\n\n' + '\n[A] ' + answers[0].text + '\n[B] ' + answers[1].text + '\n[C] ' + answers[2].text + '\n[D] ' + answers[3].text + '\n\n[-1] Забрать').toUpperCase()
        if (n == -1) return {};
    }while(codes.indexOf(n) === -1)
    return answers[codes.indexOf(n)]
}

game.stop = function() {
    this.run = false
    alert("Вы выйграли "+this.scores[this.curScore])
}

game.start = function() {
    this.run = true
    this.init()
    this.loop()
}

game.loop = function() {
    while(this.run) {
        var answer = this.ask(this.questions[this.curScore])
        if (answer.correct) {
            this.curScore += 1;
            if (this.curScore == (this.scores.length - 1) ) {
                this.stop()
            }
        }else {
            this.stop()
        }
    }
}