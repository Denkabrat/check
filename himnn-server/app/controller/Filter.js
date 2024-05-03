const FilterService = require("../service/Filter.js")

class FilterController {
    async create(req, res) {
        try {
            const { data } = req.body
            const result = await FilterService.create(data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }

    async get(req, res) {
        try {
            const id = req.params["id"]
            const data = await FilterService.get(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(_, res) {
        try {
            const data = await FilterService.getAll()
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query
            const data = await FilterService.delete(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, data } = req.body
            const result = await FilterService.update(id, data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new FilterController()