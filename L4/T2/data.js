var scenes = {
    1: {
        text: 'Сцена №1',
        actions: [
            { text: 'К сцене №2', code: 1, fn: function(game){ game.goto(2) } },
            { text: 'К сцене №3', code: 2, fn: function(game){ game.goto(3) } },
        ]
    },
    2: {
        text: 'Сцена №2',
        actions: [
            { text: 'К сцене №4', code: 1, fn: function (game) { game.goto(4) } },
            { text: 'К сцене №5', code: 2, fn: function (game) { game.goto(5) } },
            { text: 'К сцене №1', code: 3, fn: function (game) { game.goto(1) } },
        ]
    },
    3: {
        text: 'Сцена №3',
        actions: [
            { text: 'К сцене №5', code: 1, fn: function (game) { game.goto(5) } },
            { text: 'К сцене №1', code: 2, fn: function (game) { game.goto(1) } },
        ]
    },
    4: {
        text: 'Сцена №4',
        actions: [
            { text: 'К сцене №5', code: 1, fn: function (game) { game.goto(5) } },
            { text: 'К сцене №2', code: 2, fn: function (game) { game.goto(2) } },
        ]
    },
    5: {
        text: 'Сцена №5',
        actions: [
            { text: 'К сцене №1', code: 1, fn: function (game) { game.goto(1) } },
        ]
    },
}
