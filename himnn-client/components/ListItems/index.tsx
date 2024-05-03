"use client"

import ButtonDefault from "@/ui/Buttons/Default"
import styles from "./style.module.css"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { CatalogAPI, CategoriesAPI } from "@/api"
import { ICatalog, ICategory } from "@/types"
import Loader from '../../public/Loader.gif';


const ListItems = () => {
    const router = useRouter()
    const [data, setData] = useState<ICatalog[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading,setLoading] = useState<boolean>(true);

    async function getAllCatalogs() {
        try {
            const result = await CatalogAPI.getAll();
            const catResult = await CategoriesAPI.getAll();

            setLoading(false);
            setData(result);
            setCategories(catResult);

        } catch (error) {
            console.error(error);
            setLoading(true);
        }
        
    }

    const renderCategories = () => {
        if (loading) return (
            <div style={{display:'flex',justifyContent:"center"}}>
                <Image className={styles.Loader} width={100} height={100} src={Loader} alt="Loader" />
            </div>
        )
        return(
            <div className={styles.List}>
                {
                  data.map((item, index) => (
                    <div key={index} className={styles.Item}>
                        <Image src={item.data.image} width={300} height={250} alt="card-img" />

                        <div>
                            <h3>{item.data.title}</h3>
                            <p>{categories.map((cat) => cat.data.category === item.data.title ? ` ${cat.data.title} ·` : "").join('').slice(0, -1)}</p>
                            <ButtonDefault onClick={() => router.push(`/category?c=${item.data.title.toLowerCase().replace(/ /g, '-')}`)}>Смотреть</ButtonDefault>
                        </div>
                    </div>
                ))
                }
            </div>
        )
    }

    useEffect(() => {
        getAllCatalogs()
    }, [])

    return (
        <div className={styles.Items}>
            <h2>Наша продукция</h2>

                {renderCategories()}
        </div>
    )
}

export default ListItems
