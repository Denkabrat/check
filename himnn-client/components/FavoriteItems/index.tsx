import styles from "./style.module.css"
import { ICartItem } from "@/types"
import FavoriteItem from "@/ui/FavoriteItems";

const FavoriteItems = () => {
    let cartItems: ICartItem[] = [];
    if (typeof window !== 'undefined') {
        cartItems = JSON.parse(localStorage.getItem('favoriteItems') as string) || [];
    }

    return (
        <div className={styles.CartItems}>
            {cartItems !== null && <>
                <div className={styles.Top}>
                    <div>Товары</div>
                    <div>
                        <div>Цена</div>
                    </div>
                </div>

                <div className={styles.List}>
                    {cartItems.map((item, index) => (
                        <FavoriteItem key={index} item={item} />
                    ))}
                </div>
            </>}
        </div>
    )
}

export default FavoriteItems