const { db, timestamp } = require("../../firebase.js")

async function getCatalogById(id) {
    const CatalogRef = db.collection("catalog").doc(id)
    const CatalogData = await CatalogRef.get()
    return {
        id: CatalogData.id,
        data: CatalogData.data()
    }
}

async function getAllCatalogs() {
    const CatalogRef = db.collection("catalog");
    const CatalogData = await CatalogRef.get();
    const Catalogs = CatalogData.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return Catalogs
}

async function createCatalog(data) {
    const CatalogRef = db.collection("catalog")
    const CatalogData = await CatalogRef.add({ ...data, timestamp })

    return { id: CatalogData.id }
}

async function deleteCatalog(id) {
    const docRef = db.collection("catalog").doc(id)
    await docRef.delete();
}

async function updateCatalog(id, data) {
    const docRef = db.collection("catalog").doc(id)
    await docRef.update(data.data);
}

module.exports = { getCatalogById, createCatalog, deleteCatalog, getAllCatalogs, updateCatalog }