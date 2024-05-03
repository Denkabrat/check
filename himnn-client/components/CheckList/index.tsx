"use client"

import Checkbox from "@/ui/Checkbox"
import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    array: string[]
    value: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
}

const CheckList: FC<Props> = ({ array, setValue, value }) => {
    function handleSelect(item: string) {
        if (value.includes(item)) {
            const newValue = value.filter(i => i !== item)
            setValue(newValue)
        } else {
            setValue(prev => [...prev, item])
        }
    }

    return (
        <div className={styles.CheckList}>
            {array.map((item, index) => (
                <div key={index} className={styles.Item} onClick={() => handleSelect(item)}>
                    <Checkbox state={value.includes(item)} />
                    {item}
                </div>
            ))}
        </div>
    )
}

export default CheckList