import {response as res , Router} from 'express'
import { request as req } from 'http'
import {v4 as uuidv4} from 'uuid'
import { uploader } from '../utils.js'
import {io} from '../app.js'

const router = Router()

let products = [] 

router.get('/', (req, res) => {
    res.json(products)
})

router.get('/home'), (req, res) => {
    res.render('home', {products})
}

router.get('/:id', (req, res) =>{
    const productoIdBuscado = req.params.id
    const producto = products.find( producto => producto.id === productoIdBuscado)

    if(!producto) {
        return res.status(404).json({error: 'Producto no encontrado'})
    }
    res.json(producto)
})


router.post ('/', uploader.single('thumbnails'), (req, res) => {
    const {tittle, description, code, price, status, stock, category,} = req.body
    if(!tittle || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({error: 'Faltan campos obligatorios en el cuerpo de la solicitud'})

    }    

    if(!req.file){
        return res.status(400).send({status:"error", error: "No se pudo guardar la imagen. Asegurate de subir un archivo valido"})
    }
    
    const nuevoProducto = {
        id: uuidv4(),
        tittle,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails: req.file.path
    }

    products.push(nuevoProducto)

    io.emit('nuevoProducto', nuevoProducto)
    res.status(201).json(nuevoProducto)
})


router.put ('/:id', (req, res) => {
    const productoIdBuscado = req.params.id
    const {tittle, description, code, price, status, stock, category, thumbnails} = req.body
    const productoIndex = products.findIndex(producto => producto.id === productoIdBuscado)

    if (productoIndex === -1) {
        return res.status(400).json({error: 'Producto no encontrado'})
    }

    products[productoIndex] = {
        ...products[productoIndex],
        tittle,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }

    res.json(products[productoIndex])
})

router.delete ('/:id', (req, res) => {
    const productoIdAAEliminar = req.params.id
    const productoIndex = products.findIndex(producto => producto.id === productoIdAAEliminar)

    if (productoIndex === -1){
        return res.status(404).json({error: 'Producto no encontrado'})

    }
    
    products.splice(productoIndex, 1)

    io.emit('productoEliminado', productoIdAAEliminar)
    res.status(204).json({mensaje: 'Producto Eliminado'})

    
})

export default router;