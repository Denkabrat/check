"use client"

import { ICartItem } from "@/types";
import styles from "./style.module.css"
import CheckoutItem from "@/ui/CheckoutItem"
import { useEffect, useState } from "react";

const CheckoutItems = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartItems(JSON.parse(localStorage.getItem('cartItems') as string) || [])
        }
    }, [])

    return (
        <div className={styles.CheckoutItems}>
            <div className={styles.Top}>
                <div>Наименование</div>
                <div>
                    <div>Количество</div>
                    <div>Цена</div>
                    <div>Сумма</div>
                </div>
            </div>

            <div className={styles.List}>
                {cartItems.map((item, index) => (
                    <CheckoutItem key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

export default CheckoutItems