const { db, timestamp } = require("../../firebase.js")

async function getCategoriesById(id) {
    const CategoriesRef = db.collection("categories").doc(id)
    const CategoriesData = await CategoriesRef.get()
    return {
        id: CategoriesData.id,
        data: CategoriesData.data()
    }
}

async function getAllCategoriess() {
    const CategoriesRef = db.collection("categories");
    const CategoriesData = await CategoriesRef.get();
    const Categoriess = CategoriesData.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    return Categoriess
}

async function createCategories(data) {
    const CategoriesRef = db.collection("categories");
    
    const categoriesDoc = await CategoriesRef.add({...data, timestamp});

    // Возвращаем ID созданного документа
    return { id: categoriesDoc.id };
}

async function deleteCategories(id) {
    const docRef = db.collection("categories").doc(id)
    await docRef.delete();
}

async function updateCategories(id, data) {
    const docRef = db.collection("categories").doc(id)
    await docRef.update(data.data);
}

module.exports = { getCategoriesById, createCategories, deleteCategories, getAllCategoriess, updateCategories }