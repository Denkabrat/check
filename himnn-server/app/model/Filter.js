const { db, timestamp } = require("../../firebase.js")

async function getFilterById(id) {
    const filterRef = db.collection("filter").doc(id)
    const filterData = await filterRef.get()
    return {
        id: filterData.id,
        data: filterData.data()
    }
}

async function getAllFilters() {
    const filterRef = db.collection("filter");
    const filterData = await filterRef.get();
    const filters = filterData.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return filters
}

async function createFilter(data) {
    const filterRef = db.collection("filter")
    const filterData = await filterRef.add({ ...data, timestamp })

    return { id: filterData.id }
}

async function deleteFilter(id) {
    const docRef = db.collection("filter").doc(id)
    await docRef.delete();
}

async function updateFilter(id, data) {
    const docRef = db.collection("filter").doc(id)
    await docRef.update({ ...data });
}

module.exports = { getFilterById, createFilter, deleteFilter, getAllFilters, updateFilter }