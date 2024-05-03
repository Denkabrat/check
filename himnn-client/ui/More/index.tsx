"use client"

import { FC } from "react"
import { ArrowDownIcon } from "../Icons"
import styles from "./styles.module.css"

interface Props {
    state: boolean
}

const More: FC<Props> = ({ state }) => {
    return (
        <div className={`${styles.More} ${state ? styles.Active : ""}`}>
            Подробнее
            <ArrowDownIcon />
        </div>
    )
}

export default More