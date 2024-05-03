"use client"

import { MinusIcon, PlusIcon } from "@/ui/Icons"
import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    value: string
    setValue: any
}

const Counter: FC<Props> = ({ setValue, value }) => {
    return (
        <div className={styles.Counter}>
            <button onClick={() => Number(value) > 1 && setValue(String(Number(value) - 1))}>
                <MinusIcon />
            </button>

            <input type="text" value={value} onChange={e => setValue(e.target.value)} />

            <button onClick={() => setValue(String(Number(value) + 1))}>
                <PlusIcon />
            </button>
        </div>
    )
}

export default Counter