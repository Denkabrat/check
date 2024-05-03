"use client"

import Bread from "@/components/Bread"
import styles from "./style.module.css"
import CheckoutItems from "@/components/CheckoutItems"
import CheckoutBox from "@/components/CheckoutBox"
import CustomerInfo from "@/components/CustomerInfo"
import { useState } from "react"
import Checkbox from "@/ui/Checkbox"
import ButtonDefault from "@/ui/Buttons/Default"
import { CheckoutAPI } from "@/api"
import { ICheckout } from "@/types"
import emailjs from '@emailjs/browser';
import { useRouter } from "next/navigation"

const Checkout = () => {
  const router = useRouter()
  const bread = [
    { link: "/", name: "Главная" },
    { link: "/checkout", name: "Оформление заказа" },
  ]
  const [activeOrder, setActiveorder] = useState(false)
  const [state, setState] = useState(false)
  const [data, setData] = useState<ICheckout>({
    address: "",
    bank: "",
    BIK: "",
    checkingAccount: "",
    city: "",
    comment: "",
    companyName: "",
    contactPerson: "",
    corespondentAccount: "",
    email: "",
    fullname: "",
    INN: "",
    items: [],
    KPP: "",
    phone: "",
    state: true
  })

  async function createOrder() {
    alert("Заявка отправлена")
    emailjs.init("F6DCYeZIduPzD_JD8")
    await emailjs.send("service_fbtmy0t", "template_uvmya8q", { username: data.fullname, item: data.items.map(i => (i.title)), email: data.email })
    await CheckoutAPI.create(data)
    router.push("/")
  }

  return (
    <main>
      <section className={styles.Section}>
        <Bread array={bread} />
        <h2>Оформление заказа</h2>

        <div className={styles.Box}>
          <div className={styles.MiniBox}>
            <CheckoutItems />
            <CustomerInfo activeOrder={activeOrder} setActiveorder={setActiveorder} setData={setData} />

            <div className={styles.ActiveOrder}>
              {activeOrder &&
                <>
                  <div onClick={() => setState(!state)} className={styles.Checkbox}>
                    <Checkbox state={state} />
                    <p>Нажимая кнопку «Оформить заказ», я даю своё согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определённых в Согласии на обработку персональных данных</p>
                  </div>
                  <ButtonDefault onClick={() => state ? createOrder() : alert("Подтвердите обработку персональных данных")}>Оформить заказ</ButtonDefault>
                </>
              }
            </div>
          </div>

          <CheckoutBox />
        </div>
      </section>
    </main>
  )
}

export default Checkout
