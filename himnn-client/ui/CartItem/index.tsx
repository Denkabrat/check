"use client"

import Counter from "@/components/Counter"
import Image from "next/image"
import { FC, useState } from "react"
import { CloseIcon } from "../Icons"
import styles from "./style.module.css"
import { ICartItem } from "@/types"
import useGlobalStore from "@/store"
import { useRouter } from "next/navigation"

interface Props {
    item: ICartItem
}

const CartItem: FC<Props> = ({ item }) => {
    const cartItems = useGlobalStore(state => state.cartData)
    const changeCartData = useGlobalStore(state => state.changeCartData)
    const router = useRouter()

    function removeFromCart() {
        changeCartData(cartItems.filter(i => i.id !== item.id))
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(i => i.id !== item.id)))
    }

    function CountChanges(count: string) {
        const newCount = Number(count);
        const updatedCartItems = cartItems.map(cartItem => {
            if (cartItem.id === item.id) {
                return { ...cartItem, count: newCount };
            }
            return cartItem;
        });

        changeCartData(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    return (
        <>
            <div className={styles.Item}>
                <div className={styles.Fill} onClick={() => router.push(`/item/${item.id}`)}>
                    <Image src={item.image} width={220} height={150} alt="" />
                    <p>{item.title}</p>
                </div>

                <div className={styles.Fill}>
                    <div className={styles.Fill}>
                        <Counter setValue={CountChanges} value={String(item.count)} />
                    </div>

                    <div className={styles.Fill}>
                        <p>{item.price} руб./кг</p>
                    </div>

                    <div className={styles.Fill}>
                        {(item.price * Number(item.count)).toFixed(2)} руб.
                    </div>
                </div>

                <CloseIcon className={styles.Close} onClick={() => removeFromCart()} />
            </div>

            <div className={styles.MobileItem}>
                <div className={styles.Left}>
                    <img src={item.image} width={220} height={150} alt="" />
                    <Counter setValue={CountChanges} value={String(item.count)} />
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

                <div onClick={() => removeFromCart()}>
                    <CloseIcon className={styles.Close} />
                </div>
            </div>
        </>
    )
}

export default CartItem
