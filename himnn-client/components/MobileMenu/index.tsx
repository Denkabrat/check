"use client"

import Logo from '@/assets/Logo'
import ButtonDefault from '@/ui/Buttons/Default'
import { ArrowDownIcon, CloseIcon, SearchIcon } from '@/ui/Icons'
import React, { useState } from 'react'
import styles from "./style.module.css"
import useGlobalStore from '@/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MobileMenu = () => {
    const router = useRouter()
    const [active, setActive] = useState(false)
    const mobileMenu = useGlobalStore(state => state.mobileMneu)
    const changeMobileMenu = useGlobalStore(state => state.changeMobileMenu)
    const changeCall = useGlobalStore(state => state.changeCall)

    function navigate(path: string) {
        router.push(path)
        changeMobileMenu(false)
    }

    function orderCall() {
        changeMobileMenu(false)
        changeCall(true)
    }

    return (
        <div className={`${styles.MobileMenu} ${mobileMenu ? styles.Active : ""}`}>
            <div className={styles.Top}>
                <Logo className={styles.Logo} />
                <CloseIcon onClick={() => changeMobileMenu(false)} className={styles.Close} />
            </div>

            <div className={styles.Search}>
                <input type="text" placeholder='Поиск' />
                <SearchIcon />
            </div>

            <ul className={active ? styles.ActiveList : ""}>
                <li onClick={() => setActive(!active)}>
                    <p>Каталог</p>
                    <ArrowDownIcon />
                </li>

                <li className={styles.Additional} onClick={() => navigate("/category?c=резинотехнические-изделия")}>Резинотехнические изделия</li>
                <li className={styles.Additional} onClick={() => navigate("/category?c=асбестотехнические-изделия")}>Асбестотехнические изделия</li>
                <li className={styles.Additional} onClick={() => navigate("/category?c=электроизоляционные-материалы")}>Электроизоляционные материалы</li>
                <li className={styles.Additional} onClick={() => navigate("/category?c=Полимерные-материалы")}>Полимерные материалы</li>

                <li onClick={() => navigate("/delivery")}>Доставка</li>
                <li onClick={() => navigate("/about")}>О компании</li>
                <li onClick={() => navigate("/contacts")}>Контакты</li>
            </ul>

            <div className={styles.Phone}>
                <p><Link href="tel:+78312833097">+7 (831) 283-30-97</Link></p>
                <p><Link href="tel:+78312833098">+7 (831) 283-30-98</Link></p>
            </div>

            <div className={styles.Location}>
                <p>г. Нижний Новгород, ул. <br /> Кузбасская, д.1Ж, офис 405</p>
            </div>

            <ButtonDefault onClick={() => orderCall()}>Заказать звонок</ButtonDefault>
        </div>
    )
}

export default MobileMenu