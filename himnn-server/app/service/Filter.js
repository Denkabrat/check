const { getFilterById, createFilter, deleteFilter, getAllFilters, updateFilter } = require("../model/Filter")

class FilterService {
    async create(data) {
        const filterData = await createFilter(data)
        return { id: filterData.id }
    }

    async get(id) {
        const filterData = await getFilterById(id)
        return filterData
    }

    async getAll() {
        const filterData = await getAllFilters()
        return filterData
    }

    async delete(id) {
        await deleteFilter(id)
        return { ok: true, message: "Фильтр успешно удален" }
    }

    async update(id, data) {
        await updateFilter(id, data)
        return { ok: true, message: "Фильтр успешно обновлен" }
    }
}

module.exports = new FilterService()