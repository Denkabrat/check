"use client";

import Image from "next/image";
import styles from "./style.module.css";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { ICategory } from "@/types";
import { CategoriesAPI } from "@/api";

interface Props {
  category: string;
  subcategory: string;
  setSubText: Dispatch<SetStateAction<string>>
  subcategoryTitle: string
}

const CategoryItems: FC<Props> = ({ category, subcategory, setSubText, subcategoryTitle }) => {
  const [data, setData] = useState<ICategory[]>([]);

  const getAllCatalogs = useCallback(async () => {
    try {
        const result: ICategory[] = await CategoriesAPI.getAll();

        setData(result);
        // setSubText(result?.filter(i => i?.data.title.toLowerCase().trim() === subcategoryTitle)[0]?.data.text);
    } catch (error) {
        console.error(error)
    }
  }, [subcategoryTitle])


  useEffect(() => {
    getAllCatalogs();
  }, [getAllCatalogs]);


  return (
    <div
      className={`${styles.List} ${subcategory !== "" ? styles.Hidden : ""} ${data.filter(
        (i) =>
          i?.data?.category?.toLowerCase() ===
          category?.toLowerCase().replace(/-/g, " ")
      )?.length === 0
        ? styles?.Hidden
        : ""
        }`}
    >
              {/* cards */}

      {data
        .filter(
          (i) =>
            i?.data?.category?.toLowerCase() ===
            category?.toLowerCase().replace(/-/g, " ")
        )
        .map((item, index) => (
          <a href={`/category?c=${category}&sub=${item?.data?.title
            .toLowerCase()
            .replace(/ /g, "-")}`} key={index}>
            <div className={styles.Item}>
              <Image src={item?.data?.image} width={220} height={220} alt="" />

              <div>
                <h3>{item?.data?.title}</h3>
              </div>
            </div>
          </a>
        ))}
    </div>
  );
};

export default CategoryItems;
