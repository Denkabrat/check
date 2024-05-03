"use client"

import Bread from "@/components/Bread"
import { CloseIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import ButtonSmall from "@/ui/Buttons/Small"
import { useRouter } from "next/navigation"
import { ICartItem } from "@/types"
import FavoriteItems from "@/components/FavoriteItems"

const Cart = () => {
  const router = useRouter()

  const bread = [
    { link: "/", name: "Главная" },
    { link: "/favorites", name: "Избранное" },
  ]

  let cartItems: ICartItem[] = [];
  let favoriteItems: ICartItem[] = [];
  if (typeof window !== 'undefined') {
    cartItems = JSON.parse(localStorage.getItem('cartItems') as string) || [];
    favoriteItems = JSON.parse(localStorage.getItem('favoriteItems') as string) || [];
  }

  function clearItems() {
    localStorage.removeItem('favoriteItems');
    window.location.reload()
  }

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <h2>Избранное</h2>

        <div className={styles.Box}>
          <div className={styles.Buttons}>
            <button onClick={() => router.push("/cart")}>Заказ ({cartItems.length})</button>
            <button>Избранное ({favoriteItems.length})</button>
          </div>

          <button className={styles.ClearButton} onClick={() => clearItems()}>
            <CloseIcon />
            Очистить
          </button>
        </div>

        <FavoriteItems />

        <div className={styles.Contolls}>
          <div>
            <button className={styles.ClearButton} onClick={() => router.push("/catalog")}>В каталог</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Cart