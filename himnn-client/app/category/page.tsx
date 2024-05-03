"use client";

import Bread from "@/components/Bread";
import Filter from "@/components/Filter";
import styles from "./style.module.css";
import CategoryItems from "@/components/CategoryItems";
import CatalogItems from "@/components/CatalogItems";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Loader from '../../public/Loader.gif';
import { CatalogAPI,CategoriesAPI } from "@/api";
import { ICatalog } from "@/types";
import { ICategory } from "@/types";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const Category = () => {
  const [filterData, setFilterData] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>(["В наличии (100)"]);
  const [min, setMin] = useState("10");
  const [max, setMax] = useState("1000");
  const [loading,setLoading] = useState<boolean>(true);

  const [category, setCategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [categoryTitle, setcategoryTitle] = useState("");
  const [subcategoryTitle, setsubcategoryTitle] = useState("");
  const [subText, setSubText] = useState("");
  const [inStockCount, setInStockCount] = useState(0);
  const [categoryMatchAll,setCategoryMatchAll] = useState<any>([])
  //стили и данные для таблицы
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#00b400',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'left',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

    //хлебные крошки
  const bread = subcategory === ""
      ? [
        { link: "/", name: "Главная" },
        { link: "/catalog", name: "Каталог" },
        { link: `/category?c=${category}`, name: categoryTitle },
      ]
      : [
        { link: "/", name: "Главная" },
        { link: "/catalog", name: "Каталог" },
        { link: `/category?c=${category}`, name: categoryTitle },
        {
          link: `/category?c=${category}&sub=${subcategory}`,
          name: subcategoryTitle,
        },
      ];
      //получение данных из url
      useEffect(() => {
        if (typeof window !== "undefined") {
          const searchParams = new URLSearchParams(window.location.search);
          setCategory(searchParams.get("c") || "");
          setsubcategory(searchParams.get("sub") || "");
          setcategoryTitle(category ? category : "");
          setsubcategoryTitle(subcategory ? subcategory : "");
        }
      }, [category, subcategory, categoryTitle, subcategoryTitle]);

      //получение и рендер всех товаров
      const getAllCatalogs = async () => {
        try {

          const result: ICatalog[] = await CatalogAPI.getAll();
          const result2: ICategory[] = await CategoriesAPI.getAll();
          
          let foundText = "";

          
          // Проверяем заголовок и ищем соответствующий текст сначала в массиве категорий, а потом в массиве каталога
          const categoryMatch = result2.find(category => category?.data?.title?.toLowerCase().trim() === subcategoryTitle.replace(/-/g, " "));
          const catalogMatch = result.find(catalog => catalog?.data?.title?.toLowerCase().trim() === categoryTitle.replace(/-/g, " "));
          setCategoryMatchAll(categoryMatch)
          
          if (categoryMatch) {
            foundText = categoryMatch.data.text;
          } else if (catalogMatch) {
            foundText = catalogMatch.data.text;
          } else {
            foundText = ""; 
          }
      
          setLoading(false);
          setSubText(foundText);
      
        } catch (error) {
          console.error(error);
        }

      };

      useEffect(()=>{
        getAllCatalogs();
      },[categoryTitle]);

    //рендер каталога товаров
    const renderCatalog = () => {
      if (loading || !subText) return (
        <div style={{display:'flex',justifyContent:"center"}}>
          <Image className={styles.Loader} width={100} height={100} src={Loader} alt="Loader" />
        </div>
      )
      return(
        <CatalogItems
          category={category as string}
          subcategory={subcategory as string}
          filterData={filterData}
          items={items}
          min={min}
          max={max}
          setInStockCount={setInStockCount}
        />
      )
    }
    //Рендер таблицы

    const createTableData = (categoryMatchAll:any) => {
      if (!Array.isArray(categoryMatchAll) || categoryMatchAll?.length === 0) return [];
      
      return categoryMatchAll?.map((item:any, index:any) => {
        const rowData:any = {};
        Object.keys(item).forEach(key => {
          rowData[key] = item[key];
        });
        rowData.id = index;
        return rowData;
      });
    };
    
    // Рендер таблицы
    const renderTable = () => {
      if (!categoryMatchAll || !categoryMatchAll?.data || categoryMatchAll?.data?.table?.length === 0) return "";
    
      const tableData = createTableData(categoryMatchAll?.data?.table);

      // Проверяем, есть ли данные в tableData
      if (!tableData || tableData?.length === 0) return "";
    
      const headers = Object.keys(tableData[0]).filter(header => header !== 'id'); // Исключаем 'id' из заголовков
    
      // Проверяем, есть ли заголовки
      if (!headers || headers.length === 0) return "";
      
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headers?.map((header) => (
                  <StyledTableCell key={header}>{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row:any, rowIndex:number) => (
                <StyledTableRow key={rowIndex}>
                  {headers?.map((header) => (
                    <StyledTableCell key={header} align="right">
                      {row[header]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    };
  
    //Лоадер проверка на то загрузились ли данные
    if (loading || !subText) return (
      <div style={{display:'flex',justifyContent:"center"}}>
        <Image className={styles.Loader} width={100} height={100} src={Loader} alt="Loader" />
      </div>
    )
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <section className={styles.Section}>
          <Bread array={bread} />

          <h2 className="m-[100px]">{subcategoryTitle === "" ? categoryTitle : subcategoryTitle}</h2>
          {subText !== "" ? <pre>{subText}</pre> : <p>Загрузка...</p>}
          
          {
            renderTable()
          }

          <div className={styles.Row}>
            <Filter
              filterData={filterData}
              setFilterData={setFilterData}
              max={max}
              min={min}
              setMax={setMax}
              setMin={setMin}
              items={items}
              setItems={setItems}
              inStockCount={inStockCount}
            />

            <div className={styles.Items}>
              {filterData?.length === 0 && (
                <CategoryItems
                  category={category as string}
                  subcategory={subcategory as string}
                  setSubText={setSubText}
                  subcategoryTitle={subcategoryTitle}
                />
              )}
              {
                renderCatalog()
              }
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
};

export default Category;
