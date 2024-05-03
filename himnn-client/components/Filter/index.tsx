"use client"

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import CheckList from "../CheckList"
import Calculator from "../Calculator"
import styles from "./style.module.css"
import ButtonSmall from "@/ui/Buttons/Small"
import { CloseIcon, FilterIcon } from "@/ui/Icons"
import { IFilter, IItems } from "@/types"
import { FilterAPI, ItemsAPI } from "@/api"

interface Props {
    filterData: string[]
    setFilterData: Dispatch<SetStateAction<string[]>>
    setMin: Dispatch<SetStateAction<string>>
    setMax: Dispatch<SetStateAction<string>>
    max: string
    min: string
    setItems: Dispatch<SetStateAction<string[]>>
    items: string[]
    inStockCount: number

}

const Filter: FC<Props> = ({ filterData, setFilterData, max, min, setMax, setMin, setItems, items, inStockCount }) => {
    const itemsArray = [`В наличии (${inStockCount})`]
    const [active, setActive] = useState(false)
    const [data, setData] = useState<IFilter[]>([])
    const [maxPrice, setMaxPrice] = useState("1000000")

    async function getAllCatalogs() {
        const result = await FilterAPI.getAll()
        const itemsData: IItems[] = await ItemsAPI.getAll()
        const maxPrice = itemsData.reduce((max, item) => {
            return item.data.price > max ? item.data.price : max;
        }, -Infinity);

        setMaxPrice(String(maxPrice))
        setMax(String(maxPrice) || "1000")
        setData(result)
    }

    useEffect(() => {
        getAllCatalogs()
    }, [])

    return (
        <>
            <div className={styles.FilterButton} onClick={() => setActive(!active)}>
                <FilterIcon />
                Фильтр
            </div>

            <div className={`${styles.Filter} ${active ? styles.Active : ""}`}>
                <div className={styles.Row}>
                    <h4>Цена</h4>
                    <Calculator max={max} min={min} maxPrice={maxPrice} setMax={setMax} setMin={setMin} />
                </div>

                <div className={styles.Row}>
                    <CheckList array={itemsArray} setValue={setItems} value={items} />
                </div>

                {data.map((item, index) => (
                    <div className={styles.Row} key={index}>
                        <h4>{item.data.title}</h4>
                        <CheckList array={item.data.array} setValue={setFilterData} value={filterData} />
                    </div>
                ))}

                <div className={styles.Buttons}>
                    <ButtonSmall onClick={() => ({})}>Показать</ButtonSmall>
                    <button className={styles.ClearButton} onClick={() => setFilterData([])}>
                        <CloseIcon />
                        <p>Сбросить</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Filter