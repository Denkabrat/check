import { ClipboardIcon, DeliveryIcon, VerifyIcon, WalletIcon } from "@/ui/Icons"
import styles from "./style.module.css"

const Advantages = () => {
    const advantages = [
        { icon: DeliveryIcon, name: "Удобная и быстрая\n доставка" },
        { icon: VerifyIcon, name: "Весь товар\n сертифицирован" },
        { icon: ClipboardIcon, name: "Более 4000\n наименований" },
        { icon: WalletIcon, name: "Оплата наличным и\n безналичным расчетом" },
    ]

    return (
        <div className={styles.Advantages}>
            {advantages.map((item, index) => (
                <div key={index}>
                    <item.icon />
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Advantages