"use client"

import { FC } from "react"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import styles from "./style.module.css"

interface Props {
    min: string;
    max: string;
    setMin: React.Dispatch<React.SetStateAction<string>>
    setMax: React.Dispatch<React.SetStateAction<string>>
    maxPrice: string
}

const Calculator: FC<Props> = ({ max, min, setMax, setMin, maxPrice }) => {
    const handleInput = (e: ChangeResult) => {
        setMin(String(e.minValue));
        setMax(String(e.maxValue));
    };

    return (
        <div className={styles.Calculator}>
            <div className={styles.Inputs}>
                <input type="number" value={min} onChange={e => setMin(e.target.value)} />
                <div />
                <input type="number" value={max} onChange={e => setMax(e.target.value)} />
            </div>

            <MultiRangeSlider
                min={10}
                max={maxPrice}
                step={10}
                minValue={min}
                maxValue={max}
                onInput={(e) => {
                    handleInput(e);
                }}
                className={styles.Range}
                label={false}
                ruler={false}
                barLeftColor="rgba(0,0,0,0.2)"
                barInnerColor="#00B302"
                barRightColor="rgba(0,0,0,0.2)"
                thumbLeftColor="#fff"
                thumbRightColor="#fff"
            />
        </div>
    )
}

export default Calculator