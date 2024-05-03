"use client"

import { useCallback, useEffect, useState } from "react"
import styles from "./style.module.css"
import { AddIcon, DeleteIcon, EditIcon } from "@/ui/Icons"
import Image from "next/image"
import { ICatalog, ICategory } from "@/types"
import { CatalogAPI, CategoriesAPI } from "@/api"
import useGlobalStore from "@/store"

const Categories = () => {
    const changeModal = useGlobalStore(state => state.changeModal)
    const modal = useGlobalStore(state => state.modal)
    const changeModalMode = useGlobalStore(state => state.changeModalMode)
    const changeCategoryData = useGlobalStore(state => state.changeCategoryData)
    const [data, setData] = useState<ICategory[]>([])

    const getAllCatalogs = useCallback(async () => {
        const result = await CategoriesAPI.getAll()
        setData(result)
    }, [modal])

    useEffect(() => {
        getAllCatalogs()
    }, [getAllCatalogs])

    async function deleteItem(id: string) {
        await CategoriesAPI.delete(id)
        getAllCatalogs()
    }

    function editItem(item: ICategory) {
        changeModal(true)
        changeModalMode("Catagories")
        changeCategoryData(item)
    }

    function addItem() {
        changeModal(true)
        changeModalMode("AddCatagories")
        changeCategoryData({ id: "", data: { image: "/Home_Item_4.png", text: "", title: "", category: "", seo: { description: "", title: "" } } })
    }

    return (
        <div className={styles.Filter}>
            <div className={styles.TopRow}>
                <h1>Подкатегории</h1>
                <button onClick={() => addItem()}><AddIcon /></button>
            </div>

            {data.map((item, index) => (
                <div key={index} className={styles.Item}>
                    <div className={styles.ItemBox}>
                        <img src={item.data.image} width={100} height={100} alt="" />

                        <div className={styles.Data}>
                            <h3>{item.data.title} · <span>{item.data.category}</span></h3>
                            <p>{item.data.text}</p>
                        </div>
                    </div>

                    <div>
                        <button className={styles.Edit} onClick={() => editItem(item)}><EditIcon /></button>
                        <button className={styles.Delete} onClick={() => deleteItem(item.id)}><DeleteIcon /></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Categories
