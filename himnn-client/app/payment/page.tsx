import Bread from "@/components/Bread"
import styles from "./style.module.css"

const Payment = () => {
  const bread = [
    { link: "/", name: "Главная" },
    { link: "/payment", name: "Оплата" },
  ]

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <h2>Оплата</h2>
        <h4>Способы оплаты:</h4>

        <ul>
          <li>Наличный расчет</li>
          <li>Безналичный расчет</li>
        </ul>

        <p>Банковские реквизиты для перечисления д/с: <br />
          ООО &quot;Хим-НН&quot;<br />
          ИНН 5257135802 / КПП 525701001<br />
          р/с 40702810290080000187 Филиал &quot;Приволжский&quot;  ПАО Банк &quot;ФК Открытие&quot; г. Нижний Новгород к/с 30101810245372202894 БИК 042202894<br />
          р/с 40702810829050009036 Филиал &quot;Нижегородский&quot; АО &quot;АЛЬФА-БАНК&quot; г. Нижний Новгород к/с 30101810200000000824 БИК 042202824<br />
          р/с 40702810101070031627 ПАО &quot;НБД-Банк&quot; г. Нижний Новгород к/с 30101810400000000705 БИК 042202705</p>
      </section>
    </main>
  )
}

export default Payment
