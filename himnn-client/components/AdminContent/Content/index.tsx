"use client"

import { FC } from "react"
import styles from "./style.module.css"
import Filter from "./Modes/Filter"
import Items from "./Modes/Items"
import Categories from "./Modes/Categories"
import Catalog from "./Modes/Catalog"

interface Props {
    state: "Фильтр" | "Категории" | "Подкатегории" | "Товары"
}

const Content: FC<Props> = ({ state }) => {
    function fillContent() {
        switch (state) {
            case "Фильтр": return <Filter />
            case "Категории": return <Catalog />
            case "Подкатегории": return <Categories />
            case "Товары": return <Items />
        }
    }

    return (
        <div className={styles.Content}>
            {fillContent()}
        </div>
    )
}

export default Content