"use client"

import Logo from '@/assets/Logo'
import styles from './style.module.css'
import { BookmarkIcon, CartIcon, MapIcon, MenuIcon, PhoneIcon, SearchIcon } from '@/ui/Icons'
import { navigation } from './constants'
import ButtonDefault from '@/ui/Buttons/Default'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import useGlobalStore from '@/store'
import { ICartItem } from '@/types'
import { useEffect, useState } from 'react'

const Header = () => {
    const router = useRouter()
    const changeSearch = useGlobalStore(state => state.changeSearch)
    const changeCall = useGlobalStore(state => state.changeCall)
    const changeMobileMenu = useGlobalStore(state => state.changeMobileMenu)
    const path = usePathname()
    const [cartItems, setCartItems] = useState<ICartItem[]>([])
    const [favoriteItems, setFavoriteItems] = useState<ICartItem[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartItems(JSON.parse(localStorage.getItem('cartItems') as string) || [])
            setFavoriteItems(JSON.parse(localStorage.getItem('favoriteItems') as string) || [])
        }
    }, [])

    return (
        <header className={styles.Header}>
            <div className={styles.Box}>
                <div className={styles.Logo}>
                    <Link href="/"><Logo /></Link>
                    <p>Надежный поставщик товаров технического назначения</p>
                </div>

                <div className={styles.Location}>
                    <MapIcon />
                    <p>г. Нижний Новгород, ул. Кузбасская, д.1Ж, офис 405</p>
                </div>

                <div className={styles.Phone}>
                    <PhoneIcon />
                    <div>
                        <p><Link href="tel:+78312833097">+7 (831) 283-30-97</Link></p>
                        <p><Link href="tel:+78312833098">+7 (831) 283-30-98</Link></p>
                    </div>
                </div>

                <div className={styles.Icons}>
                    <SearchIcon onClick={() => changeSearch(true)} />
                    {favoriteItems.length !== 0
                        ? <div className={styles.CartBox}>
                            <BookmarkIcon onClick={() => router.push("/favorites")} />
                            <div>{favoriteItems?.length}</div>
                        </div>
                        : <BookmarkIcon onClick={() => router.push("/favorites")} />
                    }
                    {cartItems.length !== 0
                        ? <div className={styles.CartBox}>
                            <CartIcon onClick={() => router.push("/cart")} />
                            <div>{cartItems?.length}</div>
                        </div>
                        : <CartIcon onClick={() => router.push("/cart")} />
                    }
                    <MenuIcon onClick={() => changeMobileMenu(true)} />
                </div>
            </div>

            <nav className={styles.Navigation}>
                {navigation.map((nav, index) => (
                    <button
                        key={index}
                        className={`${styles.Button} ${path === nav.link ? styles.Active : ""}`}
                        onClick={() => router.push(nav.link)}
                    >{nav.name}</button>
                ))}

                <ButtonDefault onClick={() => changeCall(true)}>Заказать звонок</ButtonDefault>
            </nav>
        </header>
    )
}

export default Header