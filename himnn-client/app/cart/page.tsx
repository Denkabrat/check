"use client"

import Bread from "@/components/Bread"
import CartItems from "@/components/CartItems"
import { CloseIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import ButtonSmall from "@/ui/Buttons/Small"
import { useRouter } from "next/navigation"
import { ICartItem } from "@/types"
import { useEffect } from "react"
import useGlobalStore from "@/store"

const Cart = () => {
  const router = useRouter()
  const changeCartData = useGlobalStore(state => state.changeCartData)
  const cartData = useGlobalStore(state => state.cartData)

  const bread = [
    { link: "/", name: "Главная" },
    { link: "/cart", name: "Корзина" },
  ]

  let cartItems: ICartItem[] = [];
  let favoriteItems: ICartItem[] = [];
  if (typeof window !== 'undefined') {
    cartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    favoriteItems = JSON.parse(localStorage.getItem('favoriteItems') as string) || [];
  }

  function clearItems() {
    localStorage.removeItem('cartItems');
    window.location.reload()
  }

  const summ = cartData.reduce((acc, item) => acc + (Number(item.count) * Number(item.price)), 0);

  useEffect(() => {
    changeCartData(cartItems)
  }, [])

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <h2>Корзина</h2>

        <div className={styles.Box}>
          <div className={styles.Buttons}>
            <button>Заказ ({cartData.length})</button>
            <button onClick={() => router.push("/favorites")}>Избранное ({favoriteItems.length})</button>
          </div>

          <button className={styles.ClearButton} onClick={() => clearItems()}>
            <CloseIcon />
            Очистить
          </button>
        </div>

        <CartItems />

        <div className={styles.Contolls}>
          <div>
            <button className={styles.ClearButton} onClick={() => router.push("/catalog")}>В каталог</button>
            <h3>Итого: {summ.toFixed(2)} руб.</h3>
          </div>

          <ButtonSmall onClick={() => router.push("/checkout")}>Оформить заказ</ButtonSmall>
        </div>
      </section>
    </main>
  )
}

export default Cart