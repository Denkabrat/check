"use client"

import { FC } from "react";
import styles from "./style.module.css"

interface Props {
    data: boolean
}

const InStock: FC<Props> = ({ data }) => {
    return (
        <div className={styles.Additional} id="Additional">
            <div className={styles.Box}>
                <div className={styles.Item}>
                    <p className={styles.Param}>Склад: г. Нижний Новгород, ул. Кузбасская, 17В</p>
                    <div />
                    <p>{data ? "В наличии" : "Нет в наличии"}</p>
                </div>
            </div>
        </div>
    )
}

export default InStock