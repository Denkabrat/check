const {
    Router
} = require("express")
const Filter = require("./app/controller/Filter.js")
const Catalog = require("./app/controller/Catalog.js")
const Categories = require("./app/controller/Categories.js")
const Items = require("./app/controller/Items.js")
const {
    CreateOrder,
    Call
} = require("./app/controller/Checkout.js")
const {
    SendMail
} = require("./app/controller/Mail.js")

const router = new Router()

router.post('/filter', Filter.create)
router.get('/filter/:id', Filter.get)
router.get('/filter', Filter.getAll)
router.delete('/filter', Filter.delete)
router.put('/filter', Filter.update)

router.post('/catalog', Catalog.create)
router.get('/catalog/:id', Catalog.get)
router.get('/catalog', Catalog.getAll)
router.delete('/catalog', Catalog.delete)
router.put('/catalog', Catalog.update)

router.post('/categories', Categories.create)
router.get('/categories/:id', Categories.get)
router.get('/categories', Categories.getAll)
router.delete('/categories', Categories.delete)
router.put('/categories', Categories.update)

router.post('/items', Items.create)
router.get('/items/:id', Items.get)
router.get('/items', Items.getAll)
router.delete('/items', Items.delete)
router.put('/items', Items.update)

router.post('/checkout', CreateOrder)
router.post('/call', Call)
router.post('/mail', SendMail)

module.exports = router
