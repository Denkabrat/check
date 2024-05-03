"use client"

import ButtonDefault from "@/ui/Buttons/Default"
import Input from "@/ui/Input"
import { useState } from "react"
import styles from "./style.module.css"

const AdminLogin = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    function LoginToPanel() {
        if (password === "_8k31M6lmv(#") {
            localStorage.setItem("isAuth", JSON.stringify(true))
            window.location.reload()
        } else {
            localStorage.setItem("isAuth", JSON.stringify(false))
            alert("Пароль не верный")
        }
    }

    return (
        <main className={styles.Page}>
            <div className={styles.Box}>
                <h2>Админ панель</h2>
                <Input label="Логин" onChange={e => setLogin(e.target.value)} type="text" value={login} />
                <Input label="Пароль" onChange={e => setPassword(e.target.value)} type="password" value={password} />
                <ButtonDefault onClick={() => LoginToPanel()}>Войти</ButtonDefault>
            </div>
        </main>
    )
}

export default AdminLogin