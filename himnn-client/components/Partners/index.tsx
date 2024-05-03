"use client"

import Partner1 from "@/assets/Partner1"
import Partner2 from "@/assets/Partner2"
import Partner3 from "@/assets/Partner3"
import Partner4 from "@/assets/Partner4"
import Partner5 from "@/assets/Partner5"
import Partner6 from "@/assets/Partner6"
import Partner7 from "@/assets/Partner7"
import Partner8 from "@/assets/Partner8"
import styles from "./style.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Partners = () => {
    const [active, setActive] = useState(false)
    const router = useRouter()

    const partners = [
        { component: <Partner1 key="1" />, link: "https://www.gsverf.ru/" },
        { component: <Partner2 key="2" />, link: "http://www.almaz-antey.ru/" },
        { component: <Partner3 key="3" />, link: "https://ktrv.ru" },
        { component: <Partner4 key="4" />, link: "https://www.rosatom.ru/index.html" },
        { component: <Partner5 key="5" />, link: "https://ese-osg.ru/" },
        { component: <Partner6 key="6" />, link: "https://www.sibur.ru/rusvinyl/" },
        { component: <Partner7 key="7" />, link: "https://www.rzd.ru/" },
        { component: <Partner8 key="8" />, link: "https://www.tplusgroup.ru/" },
    ]

    return (
        <div className={styles.Partners}>
            <h2>Нам доверяют</h2>

            <div className={`${styles.List} ${active ? styles.Active : ""}`}>
                {partners.map((partner, index) => (
                    <div key={index} onClick={() => router.push(partner.link)}>
                        {partner.component}
                    </div>
                ))}
            </div>

            <div className={`${styles.More} ${active ? styles.Active : ""}`} onClick={() => setActive(true)}>
                <p>Смотреть еще</p>
            </div>
        </div>
    )
}

export default Partners