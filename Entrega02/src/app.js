import express from 'express' 
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import {Server} from 'socket.io'

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const server = app.listen(8080, () => {
    console.log("El servidor se encuentra escuchando")
})

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use ('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)


app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});


io.on('connection', (socket) =>{
    console.log('Nuevo cliente conectado')

    socket.on('agregarProducto', (data) => {
        const nuevoProducto = {
            id: uuidv4(),
            ...data,
        };
        products.push(nuevoProducto);
        
        io.emit('nuevoProducto', nuevoProducto);
    });
})

export {io}
