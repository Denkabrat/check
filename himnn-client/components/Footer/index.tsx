'use client'

import React from 'react'
import { navigation } from './constants'
import styles from "./style.module.css"
import Logo from '@/assets/Logo'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Container}>
                <div className={styles.Logo}>
                    <Link href="/"><Logo /></Link>
                    <p>© 2014-2023 Хим-НН</p>
                </div>

                <div className={styles.Empty}></div>

                <div className={styles.Group}>
                    <h3>Контакты</h3>
                    <ul>
                        <li><Link href="tel:+78312833097">+7 (831) 283-30-97</Link><br />
                            <Link href="tel:+79200592050">+7 (920) 059-20-50</Link></li>
                        <li><Link href="mailto:him-nnov@mail.ru">him-nnov@mail.ru</Link></li>
                    </ul>
                </div>

                <div className={styles.Group}>
                    <h3>Адрес</h3>
                    <ul>
                        <li>Офис: 603108, г. Нижний Новгород, ул. Кузбасская, д.1Ж, офис 405</li>
                        <li>Склад: 603108, г. Нижний Новгород, ул. Кузбасская, 17В</li>
                    </ul>
                </div>

                <div className={styles.Group}>
                    <h3>Режим работы</h3>
                    <ul>
                        <li>Пн-Пт: 9-17 <br />
                            Сб-Вс: выходной</li>
                    </ul>
                </div>

                <div className={styles.Group}>
                    <h3>Навигация</h3>
                    <ul>
                        {navigation.map((nav, index) => (
                            <li key={index}><Link href={nav.link}>{nav.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer