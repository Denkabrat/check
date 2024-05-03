"use client"

import Bread from "@/components/Bread"
import styles from "./style.module.css"

const Delivery = () => {
  const bread = [
    { link: "/", name: "Главная" },
    { link: "/delivery", name: "Доставка" },
  ]

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <h2>Доставка</h2>
        <p className={styles.Text}>Доставим в любой регион РФ: транспортной компанией (доставка до терминала бесплатно), а также собственным транспортом.</p>

        <h3>География поставок:</h3>
        <div className={styles.Map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3A550590f7bc0becad129ad3b6dc508f09319001d1eeb9460f6c9d7ac740e43776"
            allowFullScreen={true}
            width="788px"
            height="400px"
            style={{ display: "block" }}
          ></iframe>
        </div>
      </section>
    </main>
  )
}

export default Delivery
