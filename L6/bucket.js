function Bucket(root) {
    this.root = root

    this.root.innerHTML += "<table>\
        <tbody class='list'></tbody>\
        <thead>\
            <tr>\
                <td>Название продукта</td>\
                <td>Количество</td>\
                <td>Цена</td>\
                <td></td>\
            </tr>\
        </thead>\
        <tfoot>\
            <tr>\
                <td colspan=2>Итог</td>\
                <td class='total'>0</td>\
            </tr>\
        </trfoot>\
    </table>\
    <div class='empty'><h2>Корзина пуста</h2></div>"

    this.list = this.root.querySelector('.list')
    this.total = this.root.querySelector('.total')

    this.clear = function() {
        this.products = {}
        this.count = 0
        this.root.classList.add('empty')
    }

    this.renderProduct = function(product) {
        product.dom.innerHTML = "<td class='cell title'>" + product.name + "</td>\
                <td class='cell'>" + product.quantity + "</td>\
                <td class='cell cost'>"+ product.quantity * product.cost + "</td>\
                <td class='cell'><button data-id='"+product.id+"' class='remove'>X</button></td>"
    }

    this.renderTotal = function() {
        var total = 0
        for(var idx in this.products) {
            total += this.products[idx].quantity * this.products[idx].cost
        }
        this.total.innerHTML = total
    }

    this.handleEvent = function (e) {
        if (e.type == 'click')
            if(e.target.classList.contains('remove'))
                this.remove(e.target.dataset['id'])
    }

    this.add = function(p) {
        if (this.products[p.id]) {
            this.products[p.id].quantity += 1
            this.renderProduct(this.products[p.id])
        }else {
            var product = this.products[p.id] = Object.assign({}, p)
            product.quantity = 1
            var elProduct = this.products[product.id].dom = document.createElement('tr')
            elProduct.classList.add('product')
            elProduct.addEventListener("click", this)
            this.list.appendChild(elProduct)
            this.renderProduct(product)
            if (this.count == 0)
                this.root.classList.remove('empty')
            this.count += 1
        }
        this.renderTotal()
    }

    this.remove = function(id) {
        this.list.removeChild(this.products[id].dom)
        delete this.products[id]
        this.count -= 1
        if (this.count == 0 )
            this.root.classList.add('empty')
        this.renderTotal()
    }

    this.clear()
}

function Catalog(root, products, bucket) {
    this.root = root
    this.bucket = bucket

    this.handleBuy = function(e) {
        var {product, bucket} = this
        bucket.add(product)
    }

    for(var product of products) {
        var elProduct = document.createElement('div')
        elProduct.innerHTML = "<h2>"+product.name+"</h2><img src="+product.thumb+">"
        elProduct.classList.add('product')
        var elBuyButton = document.createElement('button')
        elBuyButton.innerHTML = 'Buy'
        elBuyButton.addEventListener("click", {
            product,
            bucket: this.bucket,
            handleEvent: this.handleBuy
        })
        elProduct.appendChild(elBuyButton)
        this.root.appendChild(elProduct)
    }
}

var products = [
    {
        id: 1,
        name: 'Product 1',
        thumb: 'thumbs\\p1.jpeg',
        img: 'img\\p1.jpeg',
        cost: 300
    }, {
        id: 2,
        name: 'Product 2',
        thumb: 'thumbs\\p2.jpeg',
        img: 'img\\p2.jpeg',
        cost: 100
    }, {
        id: 3,
        name: 'Product 3',
        thumb: 'thumbs\\p3.jpeg',
        img: 'img\\p3.jpeg',
        cost: 250
    }, {
        id: 4,
        name: 'Product 4',
        thumb: 'thumbs\\p4.jpeg',
        img: 'img\\p4.jpeg',
        cost: 25
    }, {
        id: 5,
        name: 'Product 5',
        thumb: 'thumbs\\p5.jpeg',
        img: 'img\\p5.jpeg',
        cost: 25
    }
]

var bucket = new Bucket(document.getElementById('bucket'))

var catalog = new Catalog(document.getElementById('catalog'), products, bucket)