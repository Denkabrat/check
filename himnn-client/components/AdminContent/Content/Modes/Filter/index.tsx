"use client"

import { useCallback, useEffect, useState } from "react"
import styles from "./style.module.css"
import { AddIcon, DeleteIcon, EditIcon } from "@/ui/Icons"
import useGlobalStore from "@/store"
import { IFilter } from "@/types"
import { FilterAPI } from "@/api"

const Filter = () => {
    const changeModal = useGlobalStore(state => state.changeModal)
    const modal = useGlobalStore(state => state.modal)
    const changeModalMode = useGlobalStore(state => state.changeModalMode)
    const changeFilterData = useGlobalStore(state => state.changeFilterData)
    const [data, setData] = useState<IFilter[]>([])

    const getAllCatalogs = useCallback(async () => {
        const result = await FilterAPI.getAll()
        setData(result)
    }, [modal])

    useEffect(() => {
        getAllCatalogs()
    }, [getAllCatalogs])

    async function deleteItem(id: string) {
        await FilterAPI.delete(id)
        getAllCatalogs()
    }

    function editItem(item: IFilter) {
        changeModal(true)
        changeModalMode("Filter")
        changeFilterData(item)
    }

    function addItem() {
        changeModal(true)
        changeModalMode("AddFilter")
        changeFilterData({ id: "", data: { array: [], title: "", } })
    }

    return (
        <div className={styles.Filter}>
            <div className={styles.TopRow}>
                <h1>Фильтр</h1>
                <button onClick={() => addItem()}><AddIcon /></button>
            </div>

            {data.map((item, index) => (
                <div key={index} className={styles.Item}>
                    <h3>{item.data.title}</h3>

                    <div>
                        <button className={styles.Edit} onClick={() => editItem(item)}><EditIcon /></button>
                        <button className={styles.Delete} onClick={() => deleteItem(item.id)}><DeleteIcon /></button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Filter