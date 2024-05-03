"use client"

import Image from "next/image"
import { FC } from "react"
import styles from "./style.module.css"
import { ICartItem } from "@/types"

interface Props {
    item: ICartItem
}

const CheckoutItem: FC<Props> = ({ item }) => {
    return (
        <>
            <div className={styles.Item}>
                <div className={styles.Fill}>
                    <img src={item.image} width={220} height={150} alt="" />
                    <p>{item.title}</p>
                </div>

                <div className={styles.Fill}>
                    <div className={styles.Fill}>
                        <p>{item.count}</p>
                    </div>

                    <div className={styles.Fill}>
                        <p>{item.price} руб./кг</p>
                    </div>

                    <div className={styles.Fill}>
                        {(item.price * Number(item.count)).toFixed(2)} руб.
                    </div>
                </div>
            </div>

            <div className={styles.MobileItem}>
                <div className={styles.Left}>
                    <Image src={item.image} width={220} height={150} alt="" />
                </div>

                <div className={styles.Right}>
                    <p>{item.title}</p>

                    <div>
                        <h3>Цена</h3>
                        <p>{item.price} руб./кг</p>
                    </div>

                    <div>
                        <h3>Сумма</h3>
                        {(item.price * Number(item.count)).toFixed(2)} руб.
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutItem
