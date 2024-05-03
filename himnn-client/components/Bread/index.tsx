import { FC } from "react"
import styles from "./style.module.css"

type IBread = {
    link: string
    name: string
}

interface Props {
    array: IBread[]
}

const Bread: FC<Props> = ({ array }) => {
    return (
        <div className={styles.Bread}>
            {array.map((arr, index) => (
                <div key={index}>
                    <a href={arr.link}>{arr.name}</a>
                    <p>-</p>
                </div>
            ))}
        </div>
    )
}

export default Bread
