import express from 'express' 
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const server = app.listen(8080, () => {
    console.log("El servidor se encuentra escuchando")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use ('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)


