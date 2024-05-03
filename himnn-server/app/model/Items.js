const { db, timestamp } = require("../../firebase.js")

async function getItemsById(id) {
    const ItemsRef = db.collection("items").doc(id)
    const ItemsData = await ItemsRef.get()
    return {
        id: ItemsData.id,
        data: ItemsData.data()
    }
}

async function getAllItemss() {
    const ItemsRef = db.collection("items");
    const ItemsData = await ItemsRef.get();
    const Itemss = ItemsData.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return Itemss
}

async function createItems(data) {
    const ItemsRef = db.collection("items")
    const ItemsData = await ItemsRef.add({ ...data, timestamp })

    return { id: ItemsData.id }
}

async function deleteItems(id) {
    const docRef = db.collection("items").doc(id)
    await docRef.delete();
}

async function updateItems(id, data) {
    const docRef = db.collection("items").doc(id)
    await docRef.update(data.data);
}

module.exports = { getItemsById, createItems, deleteItems, getAllItemss, updateItems }