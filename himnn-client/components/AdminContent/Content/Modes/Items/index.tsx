"use client"

import { useCallback, useEffect, useState } from "react"
import styles from "./style.module.css"
import { AddIcon, DeleteIcon, EditIcon } from "@/ui/Icons"
import Image from "next/image"
import { IFilter, IItemFilter, IItems } from "@/types"
import { FilterAPI, ItemsAPI } from "@/api"
import useGlobalStore from "@/store"

const Items = () => {
    const changeModal = useGlobalStore(state => state.changeModal)
    const modal = useGlobalStore(state => state.modal)
    const changeModalMode = useGlobalStore(state => state.changeModalMode)
    const changeItemData = useGlobalStore(state => state.changeItemData)
    const [data, setData] = useState<IItems[]>([])
    const [filter, setFilter] = useState<IItemFilter[]>([])

    const getAllCatalogs = useCallback(async () => {
        const result = await ItemsAPI.getAll()
        const filterResult: IFilter[] = await FilterAPI.getAll()
        const filterData: IItemFilter[] = filterResult.map((item) => ({
            name: item.data.title,
            value: ""
        }))
        setData(result)
        setFilter(filterData)
    }, [modal])

    useEffect(() => {
        getAllCatalogs()
    }, [getAllCatalogs])

    async function deleteItem(id: string) {
        await ItemsAPI.delete(id)
        getAllCatalogs()
    }

    function editItem(item: IItems) {
        changeModal(true)
        changeModalMode("Items")
        if (item.data.filterData.length !== filter.length) {
            const newItems = filter.filter(filterItem => !item.data.filterData.some(existingItem => existingItem.name === filterItem.name));

            if (newItems.length > 0) {
                changeItemData({ id: item.id, data: { ...item.data, filterData: [...item.data.filterData, ...newItems] } });
            } else {
                changeItemData(item);
            }
        } else {
            changeItemData(item);
        }
    }

    function addItem() {
        changeModal(true)
        changeModalMode("AddItems")
        changeItemData({ id: "", data: { image: "/Item.png", text: "", title: "", additional: { creator: "", height: 0, mark: "", standart: "", thickness: 0, weight: 0, width: 0 }, gost: { file: "", title: "" }, additionalArray: [], artikul: "", category: "", inStock: true, price: 0, seo: { description: "", title: "" }, subcategory: "", filterData: filter } })
    }

    return (
        <div className={styles.Filter}>
            <div className={styles.TopRow}>
                <h1>Товары</h1>
                <button onClick={() => addItem()}><AddIcon /></button>
            </div>

            {data.map((item, index) => (
                <div key={index} className={styles.Item}>
                    <div className={styles.ItemBox}>
                        <img src={item.data.image} width={100} height={100} alt="" />

                        <div className={styles.Data}>
                            <h3>{item.data.title} · <span>{item.data.artikul}</span></h3>
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

export default Items
