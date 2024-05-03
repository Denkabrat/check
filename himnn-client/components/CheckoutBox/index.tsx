"use client"

import { ICartItem } from "@/types";
import styles from "./style.module.css"
import { useRouter } from "next/navigation";

const CheckoutBox = () => {
    const router = useRouter()
    let cartItems: ICartItem[] = [];
    if (typeof window !== 'undefined') {
        cartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    }

    const summ = cartItems.reduce((acc, item) => acc + (Number(item.count) * Number(item.price)), 0);

    return (
        <div className={styles.CheckoutBox}>
            <div className={styles.Row}>
                <h4>Ваш заказ</h4>
                <button onClick={() => router.push("/cart")}>Изменить</button>
            </div>

            <div className={styles.Row}>
                <div className={styles.Column}>
                    <div className={styles.Fill}>
                        <p>Сумма:</p>
                        <p>{summ.toFixed(2)} руб.</p>
                    </div>

                    {/* <div className={styles.Fill}>
                        <p>Доставка:</p>
                        <p>100 руб.</p>
                    </div> */}
                </div>
            </div>

            <div className={styles.Row}>
                <h4>Итого:</h4>
                <h4>{(summ).toFixed(2)} руб.</h4>
            </div>
        </div>
    )
}

export default CheckoutBox