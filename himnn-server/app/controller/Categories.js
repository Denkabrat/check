const CategoriesService = require("../service/Categories.js")

class CategoriesController {
    async create(req, res) {
        try {
            const {data} = req.body; // Получаем данные из тела запроса
            const result = await CategoriesService.create(data); // Передаем данные в сервис для создания категории

            res.json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Internal Server Error' }); // Возвращаем ошибку сервера в случае исключения
        }
    }

    async get(req, res) {
        try {
            const id = req.params["id"]
            const data = await CategoriesService.get(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(_, res) {
        try {
            const data = await CategoriesService.getAll()
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.query
            const data = await CategoriesService.delete(id)

            res.json(data)
        } catch (e) {
            console.log(e)
        }
    }

    async update(req, res) {
        try {
            const { id, data } = req.body
            const result = await CategoriesService.update(id, data)

            res.json(result)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CategoriesController()