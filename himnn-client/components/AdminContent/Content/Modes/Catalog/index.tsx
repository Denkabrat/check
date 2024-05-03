"use client"

import { useCallback, useEffect, useState } from "react"
import styles from "./style.module.css"
import { AddIcon, DeleteIcon, EditIcon } from "@/ui/Icons"
import Image from "next/image"
import { ICatalog } from "@/types"
import { CatalogAPI } from "@/api"
import useGlobalStore from "@/store"

const Catalog = () => {
    const changeModal = useGlobalStore(state => state.changeModal)
    const modal = useGlobalStore(state => state.modal)
    const changeModalMode = useGlobalStore(state => state.changeModalMode)
    const changeCatalogData = useGlobalStore(state => state.changeCatalogData)
    const [data, setData] = useState<ICatalog[]>([])

    const getAllCatalogs = useCallback(async () => {
        const result = await CatalogAPI.getAll()
        setData(result)
    }, [modal])


    useEffect(() => {
        getAllCatalogs()
    }, [getAllCatalogs])

    async function deleteItem(id: string) {
        await CatalogAPI.delete(id)
        getAllCatalogs()
    }

    function editItem(item: ICatalog) {
        changeModal(true)
        changeModalMode("Catalog")
        changeCatalogData(item)
    }

    function addItem() {
        changeModal(true)
        changeModalMode("AddCatalog")
        changeCatalogData({ id: "", data: { image: "/Home_Item_1.png", text: "", title: "", seo: { description: "", title: "" } } })
    }

    return (
        <div className={styles.Filter}>
            <div className={styles.TopRow}>
                <h1>Категории</h1>/
                <button onClick={() => addItem()}><AddIcon /></button>
            </div>

            {data.map((item, index) => (
                <div key={index} className={styles.Item}>
                    <div className={styles.ItemBox}>
                        <img src={item.data.image} width={100} height={100} alt="" />

                        <div className={styles.Data}>
                            <h3>{item.data.title}</h3>
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

export default Catalog
