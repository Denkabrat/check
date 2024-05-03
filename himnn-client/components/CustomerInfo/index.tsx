"use client"

import ButtonSmall from "@/ui/Buttons/Small"
import { Check2Icon, UserIcon } from "@/ui/Icons"
import styles from "./style.module.css"
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import Checkbox2 from "@/ui/Checkbox2"
import Input from "@/ui/Input"
import Textarea from "@/ui/Textarea"
import { ICartItem, ICheckout } from "@/types"

interface Props {
    setActiveorder: Dispatch<SetStateAction<boolean>>
    setData: Dispatch<SetStateAction<ICheckout>>
    activeOrder: boolean
}

const CustomerInfo: FC<Props> = ({ setActiveorder, setData, activeOrder }) => {
    const [active, setActive] = useState(false)
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [comment, setComment] = useState("")
    const [state, setState] = useState(true)

    const [companyName, setCompanyName] = useState("")
    const [address, setAddress] = useState("")
    const [INN, setINN] = useState("")
    const [KPP, setKPP] = useState("")
    const [BIK, setBIK] = useState("")
    const [checkingAccount, setCheckingAccount] = useState("")
    const [bank, setBank] = useState("")
    const [city, setCity] = useState("")
    const [corespondentAccount, setCorespondentAccount] = useState("")
    const [contactPerson, setContactPerson] = useState("")

    const [cartItems, setCartItems] = useState<ICartItem[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCartItems(JSON.parse(localStorage.getItem('cartItems') as string) || [])
        }
    }, [])

    useEffect(() => {
        setData({
            address, bank, BIK, checkingAccount, city, comment, companyName, contactPerson, corespondentAccount, email, fullname, INN, items: cartItems, KPP, phone, state
        })
    }, [address, bank, BIK, checkingAccount, city, comment, companyName, contactPerson, corespondentAccount, email, fullname, INN, KPP, phone, state])

    return (
        <div className={`${styles.CustomerInfo} ${active ? styles.Active : ""}`}>
            <div className={styles.Top}>
                <div>
                    {activeOrder
                        ? <Check2Icon />
                        : <UserIcon />
                    }
                    <h3>Информация о покупателе</h3>
                </div>

                <button onClick={() => setActive(true)}>Изменить</button>
            </div>

            <div className={styles.Info}>
                <div className={styles.Check}>
                    <label>Тип плательщика</label>

                    <div className={styles.Checkboxes}>
                        <div className={styles.Checkbox} onClick={() => setState(true)}>
                            <Checkbox2 state={state} />
                            Физическое лицо
                        </div>

                        <div className={styles.Checkbox} onClick={() => setState(false)}>
                            <Checkbox2 state={!state} />
                            Юридическое лицо
                        </div>
                    </div>
                </div>

                {state
                    ? <div className={styles.Form}>
                        <Input label="Ф.И.О." onChange={e => setFullname(e.target.value)} type="text" value={fullname} />
                        <Input label="E-mail" onChange={e => setEmail(e.target.value)} type="email" value={email} />
                        <Input label="Номер телефона" onChange={e => setPhone(e.target.value)} type="tel" value={phone} />
                        <Textarea label="Комментарий к заказу" onChange={e => setComment(e.target.value)} value={comment} />
                    </div>
                    : <div className={styles.Form}>
                        <Input label="Название компании*" onChange={e => setCompanyName(e.target.value)} type="text" value={companyName} />
                        <Input label="Юридический адрес" onChange={e => setAddress(e.target.value)} type="text" value={address} />
                        <Input label="ИНН*" onChange={e => setINN(e.target.value)} type="text" value={INN} />
                        <Input label="КПП" onChange={e => setKPP(e.target.value)} type="text" value={KPP} />
                        <Input label="БИК" onChange={e => setBIK(e.target.value)} type="text" value={BIK} />
                        <Input label="Расчетный счет" onChange={e => setCheckingAccount(e.target.value)} type="text" value={checkingAccount} />
                        <Input label="Банк для р/с" onChange={e => setBank(e.target.value)} type="text" value={bank} />
                        <Input label="Город банка для р/с" onChange={e => setCity(e.target.value)} type="text" value={city} />
                        <Input label="Корреспондентский счет" onChange={e => setCorespondentAccount(e.target.value)} type="text" value={corespondentAccount} />
                        <Input label="Контактное лицо*" onChange={e => setContactPerson(e.target.value)} type="text" value={contactPerson} />
                        <Input label="E-mail*" onChange={e => setEmail(e.target.value)} type="text" value={email} />
                        <Input label="Телефон*" onChange={e => setPhone(e.target.value)} type="text" value={phone} />
                        <Textarea label="Комментарий к заказу" onChange={e => setComment(e.target.value)} value={comment} />
                    </div>
                }
            </div>

            <div className={styles.ButtonBox}>
                <ButtonSmall onClick={() => {
                    if (state) {
                        setActiveorder(fullname !== "" && email !== "" && phone !== "")
                        if (fullname !== "" && email !== "" && phone !== "") setActive(false)
                    } else {
                        setActiveorder(companyName !== "" && email !== "" && phone !== "" && INN !== "")
                        if (companyName !== "" && email !== "" && phone !== "" && INN !== "") setActive(false)
                    }
                }}>Далее</ButtonSmall>
            </div>
        </div>
    )
}

export default CustomerInfo