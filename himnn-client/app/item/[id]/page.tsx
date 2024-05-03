"use client"

import Bread from "@/components/Bread"
import Counter from "@/components/Counter"
import ButtonSmall from "@/ui/Buttons/Small"
import { BookmarkIcon, CheckIcon } from "@/ui/Icons"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import styles from "../style.module.css"
import More from "@/ui/More"
import Tabs from "@/components/Tabs"
import Additional from "@/components/Additional"
import { ICartItem, IItems } from "@/types"
import { ItemsAPI } from "@/api"
import InStock from "@/components/InStock"
import Link from "next/link"

function ItemPage({ params }: any) {
    const [count, setCount] = useState("1")
    const [tab, setTab] = useState<"Описание" | "Наличие" | "Доставка" | "Оплата">("Описание")
    const [data, setData] = useState<IItems | null>(null)

    const category = data?.data.category.toLowerCase().replace(/ /g, '-') || ""
    const subcategory = data?.data.subcategory.toLowerCase().replace(/ /g, '-') || ""
    const categoryTitle = data?.data.category || ""
    const subcategoryTitle = data?.data.subcategory || ""

    const bread = [
        { link: "/", name: "Главная" },
        { link: "/catalog", name: "Каталог" },
        { link: `/category?c=${category}` || "", name: categoryTitle },
        { link: `/category?c=${category}&sub=${subcategory}` || "", name: subcategoryTitle },
        { link: "", name: data?.data.title || "" },
    ]

    function navigate() {
        let section = document.getElementById("Additional");
        section?.scrollIntoView({ behavior: 'smooth' })
    }

    const getData = useCallback(async () => {
        const result = await ItemsAPI.get(params.id)
        setData(result)
    }, [ItemsAPI])

    useEffect(() => {
        getData()
    }, [getData])

    function addToCart() {
        const cartItems: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") as string);
        const objData = {
            image: data?.data.image,
            title: data?.data.title,
            price: data?.data.price,
            count,
            id: data?.id
        };

        if (cartItems === null) {
            localStorage.setItem("cartItems", JSON.stringify([objData]));
            window.location.reload();
        } else {
            const existingItemIndex = cartItems.findIndex(i => i.id === objData.id);
            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].count = Number(cartItems[existingItemIndex].count) + Number(count);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                window.location.reload();
            } else {
                localStorage.setItem("cartItems", JSON.stringify([...cartItems, objData]));
                window.location.reload();
            }
        }
    }

    function addToFavorite() {
        const favoriteItems: ICartItem[] = JSON.parse(localStorage.getItem("favoriteItems") as string);
        const objData = {
            image: data?.data.image,
            title: data?.data.title,
            price: data?.data.price,
            count,
            id: data?.id
        };

        if (favoriteItems === null) {
            localStorage.setItem("favoriteItems", JSON.stringify([objData]));
            window.location.reload();
        } else {
            const existingItemIndex = favoriteItems.findIndex(i => i.id === objData.id);
            if (existingItemIndex !== -1) {
                favoriteItems[existingItemIndex].count = Number(favoriteItems[existingItemIndex].count) + Number(count);
                localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
                window.location.reload();
            } else {
                localStorage.setItem("favoriteItems", JSON.stringify([...favoriteItems, objData]));
                window.location.reload();
            }
        }
    }

    function fillTabs() {
        if (data !== null) {
            switch (tab) {
                case "Описание": return <>
                    <p>{data.data.text}</p>
                    <Link href={data.data.gost.file} target="_blank" className={styles.Gost}><h3>{data.data.gost.title}</h3></Link>
                    <Additional data={data.data.additionalArray} />
                </>
                case "Наличие": return <InStock data={data.data.inStock} />
                case "Доставка": return <div className={styles.Delivery}>
                    <p>Доставка по Нижнему Новгороду и Нижегородской обл.</p>
                    <ul>
                        <li>Бесплатная доставка товаров в Нижнем Новгороде, осуществляется в течении пяти дней при согласовании и сумме заказа не менее 20 000 руб. При заказе менее 20 000 руб. стоимость доставки составит 500 рублей;</li>
                    </ul>
                    <p>Условия доставки по Нижегородской области оговариваются отдельно.</p>
                    <br />
                    <p>Доставка в другие регионы России</p>
                    <p>Стоимость доставки до терминала транспортной компании на заказы до 5000 рублей – 100 рублей. Свыше 5000 рублей доставка до терминала транспортной компании бесплатная.</p>
                    <ul>
                        <li>Энергия</li>
                        <li>Деловые линии</li>
                        <li>ПЭК</li>
                        <li>Байкал сервис НН</li>
                        <li>Сдэк</li>
                    </ul>
                    <p>Транспортная организация доставит груз в любом направлении по всей территории России. Стоимость доставки определяется тарифами транспортных компаний и зависит от удаленности Вашего населенного пункта от Москвы, способа доставки, срочности доставки, веса и габаритов товара.</p>
                    <p>Данная услуга позволяет максимально экономить Ваше время и силы</p>
                </div>
                case "Оплата": return <div className={styles.Delivery}>
                    <p>Способы оплаты:</p>
                    <ul>
                        <li>Наличный расчет</li>
                        <li>Безналичный расчет</li>
                    </ul>
                    <p>Банковские реквизиты для перечисления д/с:</p>
                    <p>ООО &quot;Хим-НН&quot;</p>
                    <p>ИНН 5257135802 / КПП 525701001</p>
                    <p>р/с 40702810290080000187 Филиал Приволжский  ПАО Банк &quot;ФК Открытие&quot; г. Нижний Новгород к/с 30101810300000000881 БИК 042282881</p>
                    <p>р/с 40702810829050009036 Филиал «Нижегородский» АО «АЛЬФА-БАНК» г. Нижний Новгород к/с 30101810200000000824 БИК 042202824</p>
                </div>
            }
        }
    }

    return (
        <>
            {data !== null && <main>
                <section className={styles.Section}>
                    <Bread array={bread} />
                    <h1>{data.data.title}</h1>

                    <div className={styles.MainInfo}>
                        <Image src={data?.data.image} width={500} height={300} alt="" />

                        <div className={styles.Box}>
                            <p>Артикул: {data.data.artikul}</p>

                            <div className={styles.Title}>
                                <h4>{data.data.title}</h4>
                                <div onClick={() => navigate()}>
                                    <More state={true} />
                                </div>
                            </div>

                            <div className={styles.Price}>
                                <h3>{data.data.price} руб./кг</h3>

                                {data.data.inStock && <div>
                                    <CheckIcon />
                                    Есть в наличии
                                </div>}
                            </div>

                            <div className={styles.Controlls}>
                                <Counter setValue={setCount} value={count} />
                                <ButtonSmall onClick={() => addToCart()}>В корзину</ButtonSmall>
                                <BookmarkIcon className={styles.Icon} onClick={() => addToFavorite()} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.Section}>
                    <Tabs tab={tab} setTab={setTab} />

                    {fillTabs()}
                </section>
            </main>}
        </>
    );
}

export default ItemPage;
