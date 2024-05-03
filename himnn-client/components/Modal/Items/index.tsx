import useGlobalStore from "@/store";
import styles from "./style.module.css";
import { CatalogAPI, CategoriesAPI, FilterAPI, ItemsAPI } from "@/api";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import ButtonDefault from "@/ui/Buttons/Default";
import Checkbox2 from "@/ui/Checkbox2";
import { ICatalog, ICategory, IFilter, IItemFilter } from "@/types";
import { useCallback, useEffect, useState } from "react";
import Select from "@/ui/Select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { AddIcon, CheckIcon, DeleteIcon, ImageIcon } from "@/ui/Icons";

const Items = () => {
  const itemData = useGlobalStore((state) => state.itemData);
  const changeitemData = useGlobalStore((state) => state.changeItemData);
  const changeModal = useGlobalStore((state) => state.changeModal);
  const modalMode = useGlobalStore((state) => state.modalMode);

  const [catalog, setCatalog] = useState<ICatalog[]>([]);
  const [subcategory, setSubcategory] = useState<ICategory[]>([]);
  const [filter, setFilter] = useState<IFilter[]>([]);
  const [image, setImage] = useState<any>([]);
  const [file, setFile] = useState<any>([]);

  const [activeAdd, setActiveAdd] = useState(false);
  const [addName, setAddName] = useState("");
  const [addValue, setAddValue] = useState("");

  const getAllCatalogs = useCallback(async () => {
    const catResult = await CatalogAPI.getAll();
    const result = await CategoriesAPI.getAll();
    const filterResult = await FilterAPI.getAll();
    setCatalog(catResult);
    setSubcategory(result);
    setFilter(filterResult);
  }, []);

  useEffect(() => {
    getAllCatalogs();
  }, []);

  function handleInput(
    type:
      | "title"
      | "text"
      | "artikul"
      | "price"
      | "subcategory"
      | "category"
      | "seotitle"
      | "seodescription"
      | "gost",
    value: string
  ) {
    if (itemData !== null) {
      if (type === "title")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, title: value },
        });
      if (type === "artikul")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, artikul: value },
        });
      if (type === "text")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, text: value },
        });
      if (type === "price")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, price: Number(value) },
        });
      if (type === "subcategory")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, subcategory: value },
        });
      if (type === "category")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, category: value },
        });
      if (type === "seodescription")
        changeitemData({
          id: itemData?.id,
          data: {
            ...itemData?.data,
            seo: { ...itemData.data.seo, description: value },
          },
        });
      if (type === "seotitle")
        changeitemData({
          id: itemData?.id,
          data: {
            ...itemData?.data,
            seo: { ...itemData.data.seo, title: value },
          },
        });
      if (type === "gost")
        changeitemData({
          id: itemData?.id,
          data: {
            ...itemData?.data,
            gost: { ...itemData.data.gost, title: value },
          },
        });
    }
  }

  function handleCheckbox(type: "inStock", value: boolean) {
    if (itemData !== null) {
      if (type === "inStock")
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, inStock: value },
        });
    }
  }

  async function updateItem() {
    if (itemData !== null) {
      await ItemsAPI.update(itemData?.id, itemData);
      changeModal(false);
    }
  }

  async function CreateItem() {
    if (itemData !== null) {
      await ItemsAPI.create(itemData);
      changeModal(false);
    }
  }

  function setCategory(value: string) {
    if (itemData !== null) {
      changeitemData({
        id: itemData?.id,
        data: { ...itemData?.data, category: value },
      });
    }
  }

  function setSubCategory(value: string) {
    if (itemData !== null) {
      changeitemData({
        id: itemData?.id,
        data: { ...itemData?.data, subcategory: value },
      });
    }
  }

  function setFilterItem(value: string, index: number) {
    if (itemData !== null) {
      if (itemData?.data.filterData !== undefined) {
        let filterData = itemData?.data.filterData;
        let indexFilter = filterData[index];
        const newItem: IItemFilter = { ...indexFilter, value: value };
        filterData[index] = newItem;
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, filterData: filterData },
        });
      } else {
        const filterData: IItemFilter[] = filter.map((item) => ({
          name: item.data.title,
          value: "",
        }));
        const indexFilter = filterData[index];
        const newItem: IItemFilter = { ...indexFilter, value: value };
        filterData[index] = newItem;
        changeitemData({
          id: itemData?.id,
          data: { ...itemData?.data, filterData: filterData },
        });
      }
    }
  }

  const loadImage = useCallback(
    async (path: string) => {
      if (path !== "") {
        const imageRef = ref(storage, path);

        try {
          const url = await getDownloadURL(imageRef);
          if (itemData !== null) {
            changeitemData({
              id: itemData?.id,
              data: { ...itemData?.data, image: url },
            });
          }
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      }
    },
    [itemData]
  );

  const loadFile = useCallback(async (path: string) => {
    if (path !== "") {
      const fileRef = ref(storage, path);

      try {
        const url = await getDownloadURL(fileRef);
        if (itemData !== null) {
          changeitemData({
            id: itemData?.id,
            data: {
              ...itemData?.data,
              gost: { ...itemData.data.gost, file: url },
            },
          });
        }
      } catch (error) {
        console.error("Error getting download URL: ", error);
      }
    }
  }, []);

  useEffect(() => {
    if (image.length !== 0) {
      const imageRef = ref(storage, `images/${Date.now()}/${image[0]?.name}`);

      uploadBytes(imageRef, image[0]).then(() => {
        loadImage(imageRef.fullPath);
      });
    }
  }, [image, loadImage]);

  useEffect(() => {
    if (file.length !== 0) {
      const fileRef = ref(storage, `file/${Date.now()}/${file[0]?.name}`);

      uploadBytes(fileRef, file[0]).then(() => {
        loadFile(fileRef.fullPath);
      });
    }
  }, [file, loadFile]);

  function handleAdditional(
    value: string,
    index: number,
    type: "name" | "value"
  ) {
    if (type === "name" && itemData) {
      const updatedItemData = { ...itemData };
      updatedItemData.data.additionalArray[index].name = value;
      changeitemData({ id: updatedItemData.id, data: updatedItemData.data });
    }

    if (type === "value" && itemData) {
      const updatedItemData = { ...itemData };
      updatedItemData.data.additionalArray[index].value = value;
      changeitemData({ id: updatedItemData.id, data: updatedItemData.data });
    }
  }

  function addAdditional() {
    if (itemData !== null) {
      const newItem = { name: addName, value: addValue };
      changeitemData({
        id: itemData?.id,
        data: {
          ...itemData?.data,
          additionalArray: [...itemData?.data.additionalArray, newItem],
        },
      });
      setAddName("");
      setAddValue("");
      setActiveAdd(false);
    }
  }

  function deleteAdditional(index: number) {
    if (itemData !== null) {
      const newItem = itemData.data.additionalArray.filter(
        (_, id) => id !== index
      );
      changeitemData({
        id: itemData?.id,
        data: { ...itemData?.data, additionalArray: newItem },
      });
    }
  }

  return (
    <div className={styles.Box} onClick={(e) => e.stopPropagation()}>
      {itemData !== null && (
        <>
          <div className={styles.Row}>
            <h2>{itemData?.data.title}</h2>
          </div>

          <div className={styles.List}>
            <div
              className={styles.Checkbox}
              onClick={() => handleCheckbox("inStock", !itemData?.data.inStock)}
            >
              <Checkbox2 state={itemData?.data.inStock} />
              <p>В наличии</p>
            </div>
            <Input
              label="Название"
              onChange={(e) => handleInput("title", e.target.value)}
              type="text"
              value={itemData?.data.title || ""}
            />

            <h3>Фото</h3>
            <input
              className={styles.UploadInput}
              id="upload"
              type="file"
              onChange={(e) => setImage(e.target.files)}
            />
            <label htmlFor="upload" className={styles.ButtonUpload}>
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

            <Input
              label="Артикул"
              onChange={(e) => handleInput("artikul", e.target.value)}
              type="text"
              value={itemData?.data.artikul || ""}
            />
            <Input
              label="Цена"
              onChange={(e) => handleInput("price", e.target.value)}
              type="number"
              value={String(itemData?.data.price) || ""}
            />
            <label>Категория</label>
            <Select
              array={catalog}
              value={itemData?.data.category || ""}
              setValue={setCategory}
            />
            {itemData.data.category.length !== 0 && (
              <>
                <label>Подкатегория</label>
                <Select
                  array={subcategory.filter(
                    (i) => i.data.category === itemData?.data.category
                  )}
                  value={itemData?.data.subcategory || ""}
                  setValue={setSubCategory}
                />
              </>
            )}
            <Textarea
              label="Описание"
              onChange={(e) => handleInput("text", e.target.value)}
              value={itemData?.data.text || ""}
            />

            <div className={styles.Row2}>
              <h3>Дополнительно</h3>
              <AddIcon onClick={() => setActiveAdd(!activeAdd)} />
            </div>

            {activeAdd && (
              <div className={styles.Row}>
                <Input
                  label="Пункт"
                  onChange={(e) => setAddName(e.target.value)}
                  type="text"
                  value={addName}
                />
                <Input
                  label="Значение"
                  onChange={(e) => setAddValue(e.target.value)}
                  type="text"
                  value={addValue}
                />
                <button
                  className={styles.AddButton}
                  onClick={() => addAdditional()}
                >
                  <CheckIcon />
                </button>
              </div>
            )}

            {itemData?.data.additionalArray.map((item, index) => (
              <div className={styles.Row} key={index}>
                <Input
                  label=""
                  onChange={(e) =>
                    handleAdditional(e.target.value, index, "name")
                  }
                  type="text"
                  value={item.name}
                />
                <Input
                  label=""
                  onChange={(e) =>
                    handleAdditional(e.target.value, index, "value")
                  }
                  type="text"
                  value={item.value}
                />
                <button
                  className={styles.DeleteButton}
                  onClick={() => deleteAdditional(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}

            <h3>Привязка к фильтру</h3>
            <div className={styles.Filter}>
              {filter.map((item, index) => (
                <div key={index} className={styles.FilterItem}>
                  <h4>{item.data.title}</h4>
                  <Select
                    array={item.data.array}
                    value={
                      itemData?.data.filterData !== undefined
                        ? itemData?.data.filterData[index].value
                        : ""
                    }
                    setValue={setFilterItem}
                    index={index}
                  />
                </div>
              ))}
            </div>

            <h3>ГОСТ</h3>
            <Input
              label="Заголовок"
              onChange={(e) => handleInput("gost", e.target.value)}
              type="text"
              value={itemData?.data.gost.title || ""}
            />
            <input
              className={styles.UploadInput}
              id="upload1"
              type="file"
              onChange={(e) => setFile(e.target.files)}
            />
            <label htmlFor="upload1" className={styles.ButtonUpload}>
              {file.length !== 0 ? (
                <>
                  <CheckIcon className={styles.Icon} /> Файл загружен
                </>
              ) : (
                <>
                  <ImageIcon className={styles.Icon} /> Загрузить файл
                </>
              )}
            </label>

            <h3>SEO</h3>
            <Input
              label="Заголовок"
              onChange={(e) => handleInput("seotitle", e.target.value)}
              type="text"
              value={itemData?.data.seo.title || ""}
            />
            <Textarea
              label="Описание"
              onChange={(e) => handleInput("seodescription", e.target.value)}
              value={itemData?.data.seo.description || ""}
            />
          </div>

          <div className={styles.Button}>
            {modalMode === "AddItems" ? (
              <ButtonDefault onClick={() => CreateItem()}>
                Создать
              </ButtonDefault>
            ) : (
              <ButtonDefault onClick={() => updateItem()}>
                Сохранить
              </ButtonDefault>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Items;
