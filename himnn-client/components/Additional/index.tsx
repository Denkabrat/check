"use client"

import { FC } from "react";
import styles from "./style.module.css"
import { IAddArray } from "@/types";

interface Props {
    data: IAddArray[]
}

const Additional: FC<Props> = ({ data }) => {
    return (
        <div className={styles.Additional} id="Additional">
            <h2>Характеристики</h2>

            <div className={styles.Box}>
                {data.map((item, index) => (
                    <div key={index} className={styles.Item}>
                        <p>{item.name}</p>
                        <div />
                        <p>{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Additional