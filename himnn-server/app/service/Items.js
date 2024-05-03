const { getItemsById, createItems, deleteItems, getAllItemss, updateItems } = require("../model/Items")

class ItemsService {
    async create(data) {
        const ItemsData = await createItems(data)
        return { id: ItemsData.id }
    }

    async get(id) {
        const ItemsData = await getItemsById(id)
        return ItemsData
    }

    async getAll() {
        const ItemsData = await getAllItemss()
        return ItemsData
    }

    async delete(id) {
        await deleteItems(id)
        return { ok: true, message: "Фильтр успешно удален" }
    }

    async update(id, data) {
        await updateItems(id, data)
        return { ok: true, message: "Фильтр успешно обновлен" }
    }
}

module.exports = new ItemsService()