import {Router} from 'express'


const router = Router ()

let carts = [] 

router.get('/', (req, res) => {
    res.json(carts)
})

    router.post ('/', (req, res) => {


    const newCart = req.body
    users.push(newCart)
    res.status(201).json(newCart)
} )

export default router;