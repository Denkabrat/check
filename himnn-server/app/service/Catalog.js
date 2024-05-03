const { getCatalogById, createCatalog, deleteCatalog, getAllCatalogs, updateCatalog } = require("../model/Catalog")

class CatalogService {
    async create(data) {
        const CatalogData = await createCatalog(data)
        return { id: CatalogData.id }
    }

    async get(id) {
        const CatalogData = await getCatalogById(id)
        return CatalogData
    }

    async getAll() {
        const CatalogData = await getAllCatalogs()
        return CatalogData
    }

    async delete(id) {
        await deleteCatalog(id)
        return { ok: true, message: "Фильтр успешно удален" }
    }

    async update(id, data) {
        await updateCatalog(id, data)
        return { ok: true, message: "Фильтр успешно обновлен" }
    }
}

module.exports = new CatalogService()