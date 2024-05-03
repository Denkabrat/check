"use client"

import { FC } from "react"
import { CheckIcon } from "../Icons"
import styles from "./style.module.css"

interface Props {
    state: boolean
}

const Checkbox2: FC<Props> = ({ state }) => {
    return (
        <div className={`${styles.Checkbox2} ${state ? styles.Active : ""}`}>
            <CheckIcon />
        </div>
    )
}

export default Checkbox2