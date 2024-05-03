"use client"

import { ChangeEvent, FC } from "react"
import InputMask from 'react-input-mask';
import styles from "./style.module.css"

interface Props {
    label: string
    type: "text" | "email" | "tel" | "password" | "number"
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = ({ label, onChange, type, value }) => {
    return (
        <div className={styles.Input}>
            <label>{label}</label>
            {type === 'tel' ? (
                <InputMask mask="+7 (999) 999-99-99" value={value} onChange={onChange}>
                    {/* @ts-ignore */}
                    {(inputProps: any) => <input {...inputProps} />}
                </InputMask>
            ) : (
                <input type={type} onChange={onChange} value={value} />
            )}
        </div>
    )
}

export default Input