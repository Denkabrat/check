import Bread from '@/components/Bread'
import Link from 'next/link'
import React from 'react'
import styles from "./style.module.css"

const Contacts = () => {
    const bread = [
        { link: "/", name: "Главная" },
        { link: "/contacts", name: "Контакты" },
    ]

    return (
        <main>
            <section className={styles.Section}>
                <Bread array={bread} />
                <h2>Контакты</h2>

                <div className={styles.Box}>
                    <div className={styles.InfoBox}>
                        <div>
                            <h3>Адрес</h3>
                            <p>Офис: 603108, г. Нижний Новгород, ул. Кузбасская, д.1Ж, офис 405</p>
                            <p>Склад: 603108, г. Нижний Новгород, ул. Кузбасская, 17В</p>
                        </div>

                        <div>
                            <h3>Телефон</h3>
                            <p><Link href={"tel:+78312833097"}>+7 (831) 283-30-97</Link>
                                <br /><Link href={"tel:+79200592050"}>+7 (920) 059 20 50</Link></p>
                        </div>

                        <div>
                            <h3>E-mail</h3>
                            <p><Link href={"mailto:him-nnov@mail.ru"}>him-nnov@mail.ru</Link></p>
                        </div>

                        <div>
                            <h3>Режим работы</h3>
                            <p>Пн-Пт: 9-17 <br />Сб-Вс: выходной</p>
                        </div>

                        <div>
                            <h3>Схема проезда</h3>
                            <Link href="/Scheme.png">Скачать схему проезда</Link>
                        </div>
                    </div>

                    <div className={styles.Map} style={{ position: "relative", overflow: "hidden" }}>
                        <a href="https://yandex.ru/maps?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: 12, position: "absolute", top: 0 }}>Яндекс Карты</a>
                        <a href="https://yandex.ru/maps/?ll=88.048767%2C59.277244&utm_medium=mapframe&utm_source=maps&z=3.13" style={{ color: "#eee", fontSize: 12, position: "absolute", top: 14 }}>Яндекс Карты</a>
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa382b821ba9a709c074eefc244e22b815d20db336092cc5e49498dfadb07f2cf&amp;source=constructor" width="560" height="400" style={{ position: "relative" }}>
                        </iframe>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contacts
