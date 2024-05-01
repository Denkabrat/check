import useGlobalStore from "@/store";
import styles from "./style.module.css";
import { CatalogAPI, CategoriesAPI } from "@/api";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import ButtonDefault from "@/ui/Buttons/Default";
import { useCallback, useEffect, useState } from "react";
import { ICatalog } from "@/types";
import Select from "@/ui/Select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { CheckIcon, ImageIcon } from "@/ui/Icons";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#00b400',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

const Category = () => {
  const categoryData = useGlobalStore((state) => state.categoryData);
  const changeCategoryData = useGlobalStore(
    (state) => state.changeCategoryData
  );
  const [columnCount, setColumnCount] = useState(1);
  const [headers, setHeaders] = useState<string[]>(new Array(columnCount).fill(''));
  const changeModal = useGlobalStore((state) => state.changeModal);
  const modalMode = useGlobalStore((state) => state.modalMode);
  const [catalog, setCatalog] = useState<ICatalog[]>([]);
  const [image, setImage] = useState<any>([]);
  const [rows, setRows] = useState([{}]);
  const [rowCount, setRowCount] = useState(1);
  


  const getAllCatalogs = useCallback(async () => {
    const catResult = await CatalogAPI.getAll();
    setCatalog(catResult);
  }, []);

  useEffect(() => {
    getAllCatalogs();
  }, []);

  function handleInput(
    type: "title" | "text" | "seodescription" | "seotitle",
    value: string
  ) {
    if (categoryData !== null) {
      if (type === "title")
        changeCategoryData({
          id: categoryData?.id,
          data: { ...categoryData?.data, title: value },
        });
      if (type === "text")
        changeCategoryData({
          id: categoryData?.id,
          data: { ...categoryData?.data, text: value },
        });
      if (type === "seodescription")
        changeCategoryData({
          id: categoryData?.id,
          data: {
            ...categoryData?.data,
            seo: { ...categoryData.data.seo, description: value },
          },
        });
      if (type === "seotitle")
        changeCategoryData({
          id: categoryData?.id,
          data: {
            ...categoryData?.data,
            seo: { ...categoryData.data.seo, title: value },
          },
        });
    }
  }

  function setCategory(value: string) {
    if (categoryData !== null) {
      changeCategoryData({
        id: categoryData?.id,
        data: { ...categoryData?.data, category: value },
      });
    }
  }

  async function updateItem() {
    if (categoryData !== null) {
      await CategoriesAPI.update(categoryData?.id, categoryData);
      changeModal(false);
    }
  }

  async function CreateItem() {
    if (categoryData !== null) {
      await CategoriesAPI.create(categoryData);
      changeModal(false);
    }
  }

  const loadImage = useCallback(
    async (path: string) => {
      if (path !== "") {
        const imageRef = ref(storage, path);

        try {
          const url = await getDownloadURL(imageRef);
          if (categoryData !== null) {
            changeCategoryData({
              id: categoryData?.id,
              data: { ...categoryData?.data, image: url },
            });
          }
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      }
    },
    [categoryData]
  );

  useEffect(() => {
    if (image.length !== 0) {
      const imageRef = ref(storage, `images/${Date.now()}/${image[0]?.name}`);

      uploadBytes(imageRef, image[0]).then(() => {
        loadImage(imageRef.fullPath);
      });
    }
  }, [image, loadImage]);


  function createData() {
    const data:any = {};

    for (let i = 0; i < headers?.length; i++) {
      data[headers[i]] = '';


    }
    return data;
  }
  const handleInputChange = (index: number, key: string, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: value };

    setRows(newRows);
  };
  //управление колонками buttons
  const handleAddColumn = () => {
    setColumnCount(columnCount + 1);
    setRows(prevRows =>
      prevRows.map((row,i) => ({ ...row, [headers[i]]: '' }))
    );
  };
  const handleAddRow = () => {
    setRowCount(rowCount + 1);
    const newRow = createData();
    
    setRows(prevRows => [...prevRows, newRow]);
  };
  const handleRemoveColumn = () => {
    if (columnCount > 1) {
      setColumnCount(columnCount - 1);
      setRows(prevRows => {
        const newRows = prevRows.map(row => {
          const newRow :any= { ...row };
          delete newRow[`column${columnCount}`];
          return newRow;
        });
        return newRows;
      });
    }
  };
  const handleRemoveRow = () => {
    if (rowCount > 1) {
      setRowCount(rowCount - 1);
      setRows(prevRows => {
        const newRows = [...prevRows];
        newRows.pop();
        return newRows;
      });
    }
  };
  //input
  const handleInputChangeHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;

    setHeaders(newHeaders.map((header, idx) => idx === index ? value : header));
  };
  

  const renderTable = () => (
    <>
      <button onClick={handleAddColumn}>Создать колонку</button>
      <button onClick={handleRemoveColumn}>Убрать колонку</button>
  
      <button onClick={handleAddRow}>Создать строку</button>
      <button onClick={handleRemoveRow}>Убрать строку</button>
  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {[...Array(columnCount)].map((_, index) => (
                <StyledTableCell key={index}>
                  <Input
                    label=""
                    value={headers[index] || ""}
                    type="text"
                    onChange={(e) => handleInputChangeHeader(index, e.target.value)}
                  />
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {rows?.map((row: any, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                {[...Array(columnCount)].map((_, columnIndex) => (
                  <StyledTableCell key={columnIndex}>
                    <Input
                      label=""
                      value={row[`column${columnIndex + 1}`] || ""}
                      type="text"
                      onChange={(e) => handleInputChange(rowIndex, `${headers[columnIndex]}`, e.target.value)}

                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
      <button onClick={handleConsoleLog}>Вывести данные в консоль</button>
    </>
  );

  const handleConsoleLog = () => {
    console.log(rows);
  };

  return (
    <div className={styles.Box} onClick={(e) => e.stopPropagation()}>
      <div className={styles.Row}>
        <h2>{categoryData?.data.title}</h2>
      </div>

      <div className={styles.List}>
        <Input
          label="Название"
          onChange={(e) => handleInput("title", e.target.value)}
          type="text"
          value={categoryData?.data.title || ""}
        />
        <Select
          array={catalog}
          value={categoryData?.data.category || ""}
          setValue={setCategory}
        />
        <Textarea
          label="Описание"
          onChange={(e) => handleInput("text", e.target.value)}
          value={categoryData?.data.text || ""}
        />
        <h3>Таблица</h3>

        {renderTable()}

        <h3>Фото</h3>
        <input
          className={styles.UploadInput}
          id="upload"
          type="file"
          onChange={(e) => setImage(e.target.files)}
        />
        <label htmlFor="upload" className={styles.Button}>
          {image.length !== 0 ? (
            <>
              <CheckIcon className={styles.Icon} /> Изображение загружено
            </>
          ) : (
            <>
              <ImageIcon className={styles.Icon} /> Загрузить изображение
            </>
          )}
        </label>

        <h3>SEO</h3>
        <Input
          label="Заголовок"
          onChange={(e) => handleInput("seotitle", e.target.value)}
          type="text"
          value={categoryData?.data?.seo?.title || ""}
        />
        <Textarea
          label="Описание"
          onChange={(e) => handleInput("seodescription", e.target.value)}
          value={categoryData?.data.seo.description || ""}
        />
      </div>

      <div className={styles.ButtonCreate}>
        {modalMode === "AddCatagories" ? (
          <ButtonDefault onClick={() => CreateItem()}>Создать</ButtonDefault>
        ) : (
          <ButtonDefault onClick={() => updateItem()}>Сохранить</ButtonDefault>
        )}
      </div>
    </div>
  );
};

export default Category;
