"use client"

import Image from "next/image"
import { FC } from "react"
import { CloseIcon } from "../Icons"
import styles from "./style.module.css"
import { ICartItem } from "@/types"
import ButtonDefault from "../Buttons/Default"

interface Props {
    item: ICartItem
}

const FavoriteItem: FC<Props> = ({ item }) => {
    function removeFromCart() {
        const cartItems: ICartItem[] = JSON.parse(localStorage.getItem("favoriteItems") as string)
        localStorage.setItem("favoriteItems", JSON.stringify(cartItems.filter(i => i.id !== item.id)))
        window.location.reload()
    }

    function addToCart() {
        const cartItems: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") as string);
        const objData = {
            image: item.image,
            title: item?.title,
            price: item?.price,
            count: item?.count,
            id: item?.id
        };

        if (cartItems === null) {
            localStorage.setItem("cartItems", JSON.stringify([objData]));
            window.location.reload();
        } else {
            const existingItemIndex = cartItems.findIndex(i => i.id === objData.id);
            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].count = Number(cartItems[existingItemIndex].count) + 1;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                window.location.reload();
            } else {
                localStorage.setItem("cartItems", JSON.stringify([...cartItems, objData]));
                window.location.reload();
            }
        }
    }

    return (
        <>
            <div className={styles.Item}>
                <div className={styles.Fill}>
                    <img src={item.image} width={220} height={150} alt="" />
                    <p>{item.title}</p>
                </div>

                <div className={styles.Fill}>
                    <div className={styles.Fill}>
                        <p>{item.price} руб./кг</p>
                    </div>

                    <div className={styles.Fill}>
                        <ButtonDefault onClick={() => addToCart()}>Добавить в корзину</ButtonDefault>
                    </div>
                </div>

                <CloseIcon className={styles.Close} onClick={() => removeFromCart()} />
            </div>

            <div className={styles.MobileItem}>
                <div className={styles.Left}>
                    <img src={item.image} width={220} height={150} alt="" />
                </div>

                <div className={styles.Right}>
                    <p>{item.title}</p>

                    <div>
                        <h3>Цена</h3>
                        <p>{item.price} руб./кг</p>
                    </div>
                </div>

                <div onClick={() => removeFromCart()}>
                    <CloseIcon className={styles.Close} />
                </div>
            </div>
        </>
    )
}

export default FavoriteItem
