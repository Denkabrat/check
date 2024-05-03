"use client"

import { Dispatch, FC, SetStateAction } from "react"
import styles from "./style.module.css"

interface Props {
    tab: string
    setTab: Dispatch<SetStateAction<"Описание" | "Наличие" | "Доставка" | "Оплата">>
}

const Tabs: FC<Props> = ({ tab, setTab }) => {
    const tabs = ["Описание", "Наличие", "Доставка", "Оплата"]

    return (
        <div className={styles.Tabs}>
            {tabs.map((t, index) => (
                <div onClick={() => setTab(t as "Описание" | "Наличие" | "Доставка" | "Оплата")} className={tab === t ? styles.Active : ""} key={index}>{t}</div>
            ))}
        </div>
    )
}

export default Tabs