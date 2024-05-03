import React, { FC, useState } from "react"
import styles from "./style.module.css"
import { ArrowDownIcon, CheckIcon } from "../Icons"

interface Props {
    array: any
    value: string
    setValue: (value: any, index?: any) => void
    index?: number
}

const Select: FC<Props> = ({ array, setValue, value, index }) => {
    const [active, setActive] = useState(false)

    function selectItem(item: string) {
        setValue(item, index)
        setActive(false)
    }

    return (
        <div className={`${styles.Module} ${active ? styles.Active : ''}`}>
            <div className={styles.Select} onClick={() => setActive(!active)}>
                <p>{value || 'Ничего не выбрано'}</p>
                <ArrowDownIcon className={styles.Icon} />
            </div>

            {active && <div className={styles.DropDown}>
                {array.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                        <div
                            className={styles.Item}
                            onClick={() => selectItem(typeof item !== "string" ? item.data.title : item)}
                        >
                            {typeof item !== "string" ? item.data.title : item || ""}

                            <div className={`${styles.Checked} ${typeof item !== "string" ? item.data.title : item === value ? styles.ActiveIcon : ''}`}>
                                <CheckIcon className={styles.CheckIcon} />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>}
        </div>
    )
}

export default Select