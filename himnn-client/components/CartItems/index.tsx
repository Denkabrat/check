import CartItem from "@/ui/CartItem"
import styles from "./style.module.css"
import { ICartItem } from "@/types"
import useGlobalStore from "@/store"

const CartItems = () => {
    const cartItems = useGlobalStore(state => state.cartData)

    return (
        <div className={styles.CartItems}>
            {cartItems !== null && <>
                <div className={styles.Top}>
                    <div>Товары</div>
                    <div>
                        <div>Количество</div>
                        <div>Цена</div>
                        <div>Сумма</div>
                    </div>
                </div>

                <div className={styles.List}>
                    {cartItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
            </>}
        </div>
    )
}

export default CartItems