"use client"

import Item from "@/ui/Item"
import styles from "./style.module.css"
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { ItemsAPI } from "@/api"
import { IItems } from "@/types"
import Loader from '../../public/Loader.gif';
import Image from "next/image";

interface Props {
    category: string
    subcategory: string
    filterData: string[]
    items: string[]
    min: string
    max: string
    setInStockCount: Dispatch<SetStateAction<number>>
}

const CatalogItems: FC<Props> = ({ category, subcategory, filterData, items, min, max, setInStockCount }) => {
    const [data, setData] = useState<IItems[]>([])
    const [loading,setLoading] = useState<boolean>(true);


    const getAllCatalogs = useCallback(async () => {
       try {
        const result: IItems[] = await ItemsAPI.getAll()
        setData(result)
        setInStockCount(result.filter(i => i.data.category.toLowerCase() === category.toLowerCase().replace(/-/g, ' '))
            .filter(i => subcategory !== "" ? i.data.subcategory.toLowerCase() === subcategory.toLowerCase().replace(/-/g, ' ') : true).filter(i => i.data.inStock === true).length);
        
        setLoading(false);
       } catch (error) {
            console.error(error);
            setLoading(true);
       }
    }, [subcategory, category])

    useEffect(() => {
        getAllCatalogs()
    }, [getAllCatalogs])

    const renderCatalog = () => {
        if (loading) return (
            <div style={{display:'flex',justifyContent:"center"}}>
                <Image className={styles.Loader} width={100} height={100} src={Loader} alt="Loader" />
            </div>
        )

        return(
            <div className={styles.List}>
            {data.filter(i => i.data.category.toLowerCase() === category.toLowerCase().replace(/-/g, ' '))
                .filter(i => subcategory !== "" ? i.data.subcategory.toLowerCase() === subcategory.toLowerCase().replace(/-/g, ' ') : true)
                .filter(i => filterData.length === 0 ? true :
                    filterData.some(filterItem =>
                        i.data && i.data.filterData && Array.isArray(i.data.filterData) &&
                        i.data.filterData.some(value =>
                            typeof value.value === 'string' && value.value.includes(filterItem)
                        )
                    )
                )

                .filter(i => i.data.inStock === (items.length !== 0))
                .filter(i => {
                    const price = Number(i.data.price);
                    return (!isNaN(Number(min)) && !isNaN(Number(max))) ? price >= Number(min) && price <= Number(max) : true;
                })
                .map((item, index) => (
                    <Item item={item} key={index} />
                ))}
        </div>
        )
    }

    return (
       <>
       {renderCatalog()}
       </>
    )
}

export default CatalogItems