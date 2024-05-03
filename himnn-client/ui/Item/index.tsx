"use client"

import { ICartItem, IItems } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import styles from "./style.module.css"
import ButtonSmall from "../Buttons/Small"
import { BookmarkIcon, CheckIcon, CloseIcon } from "../Icons"
import Counter from "@/components/Counter"

interface Props {
    item: IItems
}

const Item: FC<Props> = ({ item }) => {
    const [active, setActive] = useState(false)
    const router = useRouter()
    const [count, setCount] = useState("1")

    function addToCart() {
        const cartItems: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") as string);
        const objData = {
            image: item.data.image,
            title: item?.data.title,
            price: item?.data.price,
            count,
            id: item?.id
        };

        if (cartItems === null) {
            localStorage.setItem("cartItems", JSON.stringify([objData]));
            window.location.reload();
        } else {
            const existingItemIndex = cartItems.findIndex(i => i.id === objData.id);
            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].count = Number(cartItems[existingItemIndex].count) + Number(count);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                window.location.reload();
            } else {
                localStorage.setItem("cartItems", JSON.stringify([...cartItems, objData]));
                window.location.reload();
            }
        }
    }

    function addToFavorite() {
        const favoriteItems: ICartItem[] = JSON.parse(localStorage.getItem("favoriteItems") as string);
        const objData = {
            image: item.data.image,
            title: item?.data.title,
            price: item?.data.price,
            count,
            id: item?.id
        };

        if (favoriteItems === null) {
            localStorage.setItem("favoriteItems", JSON.stringify([objData]));
            window.location.reload();
        } else {
            const existingItemIndex = favoriteItems.findIndex(i => i.id === objData.id);
            if (existingItemIndex !== -1) {
                favoriteItems[existingItemIndex].count = Number(favoriteItems[existingItemIndex].count) + Number(count);
                localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
                window.location.reload();
            } else {
                localStorage.setItem("favoriteItems", JSON.stringify([...favoriteItems, objData]));
                window.location.reload();
            }
        }
    }

    return (
        <div className={styles.ItemBox}>
            <div
                onClick={() => router.push(`/item/${item.id}`)}
                onMouseEnter={() => {
                    setActive(true)
                }}
                onMouseLeave={() => {
                    setActive(false)
                }}
                className={`${styles.Item} ${active ? styles.Active : ""}`}
            >
                <BookmarkIcon className={`${styles.BookmarkIcon} ${active ? styles.ActiveIcon : ""}`} onClick={(e: any) => {
                    e.stopPropagation()
                    addToFavorite()
                }} />

                <img alt="" src={item.data.image} width={280} height={200} />

                <div className={styles.Box}>
                    <h3>{item.data.title}</h3>

                    <div className={styles.Available}>
                        {item.data.inStock
                            ? <div>
                                <CheckIcon />
                                <p>Есть в наличии</p>
                            </div>
                            : <div className={styles.Not}>
                                <CloseIcon />
                                <p>Нет в наличии</p>
                            </div>
                        }
                    </div>

                    <h4>{item.data.price} руб./кг</h4>

                    <div className={styles.Controlls} onClick={e => e.stopPropagation()}>
                        {item.data.inStock
                            ? <>
                                <Counter value={count} setValue={setCount} />
                                <ButtonSmall onClick={() => addToCart()}>В корзину</ButtonSmall>
                            </>
                            : <ButtonSmall onClick={() => ({})}>Под заказ</ButtonSmall>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
