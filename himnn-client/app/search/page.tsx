"use client"

import Bread from '@/components/Bread'
import { Suspense, useEffect, useState } from 'react'
import styles from "./style.module.css"
import { ICatalog, ICategory, IItems } from '@/types'
import { CatalogAPI, CategoriesAPI, ItemsAPI } from '@/api'
import Item from '@/ui/Item'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useGlobalStore from "@/store"
import Loader from '../../public/Loader.gif';


const SearchPage = () => {
    const { query } = useGlobalStore(); 
    const changeQuery = useGlobalStore(state => state.changeQuery); 

    const router = useRouter();
  
    const bread = [
      { link: "/", name: "Главная" },
      { link: "", name: "Поиск" },
    ];
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams(window.location.search);
          const queryParam = searchParams.get('q') || "";
          changeQuery(queryParam); 
        }
      }, [changeQuery]); 

      useEffect(() => {
        setLoading(true);
        getAllCatalogs()
      }, [query]);
  
    const [data, setData] = useState<IItems[]>([]);
    const [catalog, setCatalog] = useState<ICatalog[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    async function getAllCatalogs() {
      try {
        const itemsResult = await ItemsAPI.getAll();
        const catalogResult = await CatalogAPI.getAll();
        const catResult = await CategoriesAPI.getAll();
  
        setData(itemsResult);
        setCategories(catResult);
        setCatalog(catalogResult);
      } catch (error) {
        console.error(error)
      }finally {
        setLoading(false); 
      }
    }
  
   
  
    // Фильтрация данных
    const filteredCatalog = catalog.filter(item =>
      item.data.title.toLowerCase().includes(query.toLowerCase())
    );
  
    const filteredCategories = categories.filter(item =>
      item.data.title.toLowerCase().includes(query.toLowerCase())
    );


    return (
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <section className={styles.Section}>
            <Bread array={bread} />
  
            {loading && <Image src={Loader} width={60} height={60} className={styles.Loader} alt='' />} 
  
            <h2>
              {!loading && query && (filteredCatalog.length > 0 || filteredCategories.length > 0) ?
                  `По вашему запросу "${query}" найдено` :
                  (!loading && query) ? `По вашему запросу "${query}" ничего не найдено` : ''
              }
          </h2>

  
            <div className={styles.CatalogList}>
              {filteredCatalog.map((item, index) => (
                <div key={index} className={styles.Item} onClick={() => router.push(`/category?c=${item.data.title.toLowerCase().replace(/ /g, '-')}`)}>
                  <Image src={item.data.image} width={280} height={250} alt="" />
  
                  <div>
                    <h3>{item.data.title}</h3>
                    <p>{categories.map((cat) => cat.data.category === item.data.title ? ` ${cat.data.title} ·` : "").join('').slice(0, -1)}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className={styles.CategoryList}>
              {filteredCategories.map((item, index) => (
                <div key={index} className={styles.Item} onClick={() => router.push(`/category?sub=${item.data.title.toLowerCase().replace(/ /g, '-')}`)}>
                  <Image src={item.data.image} width={220} height={220} alt="" />
  
                  <div>
                    <h3>{item.data.title}</h3>
                    <p>{item.data.text}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className={styles.Items}>
              <div className={styles.List}>
                {data.filter(item =>
                  item.data.artikul === query ||
                  item.data.title.toLowerCase().includes(query.toLowerCase())
                ).map((item, index) => (
                  <Item item={item} key={index} />
                ))}
              </div>
            </div>
          </section>
        </Suspense>
      </main>
    )
}


export default SearchPage