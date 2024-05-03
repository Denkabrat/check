"use client"

import { FC } from "react"
import { CheckIcon } from "../Icons"
import styles from "./style.module.css"

interface Props {
    state: boolean
}

const Checkbox: FC<Props> = ({ state }) => {
    return (
        <div className={`${styles.Checkbox} ${state ? styles.Active : ""}`}>
            <CheckIcon />
        </div>
    )
}

export default Checkbox