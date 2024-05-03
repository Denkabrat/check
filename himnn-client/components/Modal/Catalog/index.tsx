import useGlobalStore from "@/store";
import styles from "./style.module.css";
import { CatalogAPI } from "@/api";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import ButtonDefault from "@/ui/Buttons/Default";
import { CheckIcon, ImageIcon } from "@/ui/Icons";
import { useCallback, useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

const Catalog = () => {
  const catalogData = useGlobalStore((state) => state.catalogData);
  const changeCatalogData = useGlobalStore((state) => state.changeCatalogData);
  const changeModal = useGlobalStore((state) => state.changeModal);
  const modalMode = useGlobalStore((state) => state.modalMode);

  const [image, setImage] = useState<any>([]);

  function handleInput(
    type: "title" | "seodescription" | "seotitle",
    value: string
  ) {
    if (catalogData !== null) {
      if (type === "title")
        changeCatalogData({
          id: catalogData?.id,
          data: { ...catalogData?.data, title: value },
        });
      if (type === "seodescription")
        changeCatalogData({
          id: catalogData?.id,
          data: {
            ...catalogData?.data,
            seo: { ...catalogData.data.seo, description: value },
          },
        });
      if (type === "seotitle")
        changeCatalogData({
          id: catalogData?.id,
          data: {
            ...catalogData?.data,
            seo: { ...catalogData.data.seo, title: value },
          },
        });
    }
  }

  async function updateItem() {
    if (catalogData !== null) {
      await CatalogAPI.update(catalogData?.id, catalogData);
      changeModal(false);
    }
  }

  async function CreateItem() {
    if (catalogData !== null) {
      await CatalogAPI.create(catalogData);
      changeModal(false);
    }
  }

  const loadImage = useCallback(
    async (path: string) => {
      if (path !== "") {
        const imageRef = ref(storage, path);

        try {
          const url = await getDownloadURL(imageRef);
          if (catalogData !== null) {
            changeCatalogData({
              id: catalogData?.id,
              data: { ...catalogData?.data, image: url },
            });
          }
        } catch (error) {
          console.error("Error getting download URL: ", error);
        }
      }
    },
    [catalogData]
  );

  useEffect(() => {
    if (image.length !== 0) {
      const imageRef = ref(storage, `images/${Date.now()}/${image[0]?.name}`);

      uploadBytes(imageRef, image[0]).then(() => {
        loadImage(imageRef.fullPath);
      });
    }
  }, [image, loadImage]);

  return (
    <div className={styles.Box} onClick={(e) => e.stopPropagation()}>
      <div className={styles.Row}>
        <h2>{catalogData?.data.title}</h2>
      </div>

      <div className={styles.List}>
        <Input
          label="Название"
          onChange={(e) => handleInput("title", e.target.value)}
          type="text"
          value={catalogData?.data.title || ""}
        />

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
          value={catalogData?.data.seo.title || ""}
        />
        <Textarea
          label="Описание"
          onChange={(e) => handleInput("seodescription", e.target.value)}
          value={catalogData?.data.seo.description || ""}
        />
        {modalMode === "AddCatalog" ? (
          <ButtonDefault onClick={() => CreateItem()}>Создать</ButtonDefault>
        ) : (
          <ButtonDefault onClick={() => updateItem()}>Сохранить</ButtonDefault>
        )}
      </div>
    </div>
  );
};

export default Catalog;
