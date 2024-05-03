import Bread from "@/components/Bread"
import styles from "./styles.module.css"
import Categories from "@/components/Categories"

const Catalog = () => {
  const bread = [
    { link: "/", name: "Главная" },
    { link: "/catalog", name: "Каталог" },
  ]

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <Categories />
      </section>
    </main>
  )
}

export default Catalog