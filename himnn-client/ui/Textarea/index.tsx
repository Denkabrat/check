"use client"

import { ChangeEvent, FC } from "react"
import styles from "./style.module.css"

interface Props {
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<Props> = ({ label, onChange, value }) => {
    return (
        <div className={styles.Textarea}>
            <label>{label}</label>
            <textarea onChange={onChange} value={value}></textarea>
        </div>
    )
}

export default Textarea