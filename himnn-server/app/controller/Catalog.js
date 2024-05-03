const CatalogService = require("../service/Catalog.js")

class CatalogController {
    async create(req, res) {
        try {
            const { data } = req.body
            const result = await CatalogService.create(data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }

    async get(req, res) {
        try {
            const id = req.params["id"]
            const data = await CatalogService.get(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(_, res) {
        try {
            const data = await CatalogService.getAll()
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query
            const data = await CatalogService.delete(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, data } = req.body
            const result = await CatalogService.update(id, data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CatalogController()