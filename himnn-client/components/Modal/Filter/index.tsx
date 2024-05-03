import useGlobalStore from "@/store"
import styles from "./style.module.css"
import { AddIcon, CheckIcon, DeleteIcon } from "@/ui/Icons"
import { useState } from "react"
import { FilterAPI } from "@/api"
import ButtonDefault from "@/ui/Buttons/Default"

const Filter = () => {
    const filterData = useGlobalStore(state => state.filterData)
    const modalMode = useGlobalStore(state => state.modalMode)
    const changeFilterData = useGlobalStore(state => state.changeFilterData)
    const changeModal = useGlobalStore(state => state.changeModal)
    const [create, setCreate] = useState("")
    const [active, setActive] = useState(false)

    async function addItem() {
        if (filterData !== null) {
            const newArray = [...filterData?.data.array, create]
            if (modalMode !== "AddFilter") await FilterAPI.update(filterData.id, newArray)
            changeFilterData({ id: filterData.id, data: { ...filterData.data, array: newArray } })
            setCreate("")
        }
    }

    async function deleteItem(index: number) {
        if (filterData !== null) {
            const newArray = filterData?.data.array.filter((_, id) => id !== index)
            if (modalMode !== "AddFilter") await FilterAPI.update(filterData.id, newArray)
            changeFilterData({ id: filterData.id, data: { ...filterData.data, array: newArray } })
        }
    }

    function handleTitle(value: string) {
        if (filterData !== null) {
            changeFilterData({ id: filterData.id, data: { ...filterData.data, title: value } })
        }
    }

    async function CreateItem() {
        if (filterData !== null) {
            await FilterAPI.create(filterData)
            changeModal(false)
        }
    }

    return (
        <div className={styles.Box} onClick={e => e.stopPropagation()}>
            <div className={styles.Row}>
                {modalMode === "AddFilter"
                    ? <input className={styles.Input} value={filterData?.data.title} onChange={e => handleTitle(e.target.value)} placeholder="Название" />
                    : <h2>{filterData?.data.title}</h2>
                }
                <AddIcon onClick={() => setActive(!active)} />
            </div>

            {active && <div className={styles.Creation}>
                <input value={create} onChange={e => setCreate(e.target.value)} placeholder="Введите параметр" />
                <div>
                    <CheckIcon onClick={() => addItem()} />
                </div>
            </div>}

            <div className={styles.List}>
                {filterData?.data.array.length !== 0 && filterData?.data.array.length !== undefined
                    ? <>
                        {filterData?.data.array.map((item, index) => (
                            <div className={styles.Item} key={index}>
                                {item}
                                <DeleteIcon onClick={() => deleteItem(index)} />
                            </div>
                        ))}
                    </>
                    : <p>Нет параметров</p>
                }
            </div>

            {modalMode === "AddFilter" && <ButtonDefault onClick={() => CreateItem()}>Создать</ButtonDefault>}
        </div>
    )
}

export default Filter