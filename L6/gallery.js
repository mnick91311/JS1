var fileNames = [
    'p1.jpeg',
    'p2.jpeg',
    'p3.jpeg',
    'p4.jpeg',
    'p5.jpeg',
]

function Gallery(root, files) {
    this.root = root
    this.files = files
    this.selected = undefined
    this.thumbs = document.createElement('div')
    this.thumbs.classList.add('thumbs')
    this.view = document.createElement('div')
    this.view.classList.add('view')
    this.controls = document.createElement('div')
    this.controls.classList.add('controls')
    this.controls.innerHTML = "<button class='control' data-dir='prev'>&#8249;</button><button class='control' data-dir='next'>&#8250;</button>"

    this.next = function() {
        this.select((this.selected + 1) % this.files.length)
    }

    this.prev = function() {
        this.select((this.files.length + this.selected - 1) % this.files.length)
    }

    this.select = function(idx) {
        this.view.innerHTML = "<img src=img\\" + this.files[idx] + ">"
        this.selected = idx
    }

    this.handleEvent = function (e, ...args) {
        return this[e.type + 'Event'] && this[e.type + 'Event'](e, ...args)
    }

    this.clickEvent = function(e) {
        if(e.target.classList.contains('thumb')) {
            this.select(e.target.dataset['idx'])
        }else if(e.target.classList.contains('control')) {
            e.target.dataset["dir"] == "next" ? this.next() : this.prev()
        }
    }

    this.errorEvent = function(e) {
        this.view.innerHTML = "<h2>Изображение не найдено</h2>"
    }

    for(var idx in this.files) {
        var img = document.createElement('img')
        var fileName = this.files[idx]
        img.src = 'thumbs\\' + fileName
        img.classList.add('thumb')
        img.dataset['idx'] = idx
        this.thumbs.appendChild(img)
    }

    this.root.addEventListener("error", this, true)
    this.root.addEventListener('click', this, true)

    this.select(0)
    this.root.appendChild(this.thumbs)
    this.root.appendChild(this.view)
    this.root.appendChild(this.controls)
}

var g1 = new Gallery(document.getElementById('gallery'), fileNames)