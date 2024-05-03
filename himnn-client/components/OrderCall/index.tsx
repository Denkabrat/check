import ButtonDefault from "@/ui/Buttons/Default"
import Input from "@/ui/Input"
import { useState } from "react"
import styles from "./style.module.css"
import useGlobalStore from "@/store"
import Checkbox from "@/ui/Checkbox"
import { CheckoutAPI } from "@/api"

const OrderCall = () => {
    const [fullName, setFullname] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [accept, setAccept] = useState(false)

    const call = useGlobalStore(state => state.call)
    const changeCall = useGlobalStore(state => state.changeCall)

    async function createCall() {
        changeCall(false)
        alert("Заявка отправлена")
        await CheckoutAPI.call({ email, fullName, tel })
    }

    return (
        <div className={`${styles.Modal} ${call ? styles.Active : ""}`} onClick={() => changeCall(false)}>
            <div onClick={e => e.stopPropagation()} className={styles.Box}>
                <div className={styles.Title}>
                    <h2>Заказать звонок</h2>
                </div>

                <div className={styles.Form}>
                    <Input label="Ф.И.О." onChange={e => setFullname(e.target.value)} type="text" value={fullName} />
                    <Input label="Номер телефона" onChange={e => setTel(e.target.value)} type="tel" value={tel} />
                    <Input label="E-mail" onChange={e => setEmail(e.target.value)} type="email" value={email} />
                    <ButtonDefault onClick={() => createCall()}>Отправить</ButtonDefault>

                    <div className={styles.Accept} onClick={() => setAccept(!accept)}>
                        <Checkbox state={accept} />
                        <p>Нажимая кнопку «Отправить», я даю своё согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года № 152-ФЗ «О персональных данных», на условиях и для целей, определённых в Согласии на обработку персональных данных</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCall