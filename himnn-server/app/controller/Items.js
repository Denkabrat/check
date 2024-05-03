const ItemsService = require("../service/Items.js")

class ItemsController {
    async create(req, res) {
        try {
            const { data } = req.body
            const result = await ItemsService.create(data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }

    async get(req, res) {
        try {
            const id = req.params["id"]
            const data = await ItemsService.get(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(_, res) {
        try {
            const data = await ItemsService.getAll()
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query
            const data = await ItemsService.delete(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, data } = req.body
            const result = await ItemsService.update(id, data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ItemsController()