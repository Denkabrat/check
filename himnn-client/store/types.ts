import { ICartItem, ICatalog, ICategory, IFilter, IItems } from "@/types";

export type State = {
    search: boolean;
    call: boolean;
    mobileMneu: boolean;
    modal: boolean;
    modalMode: "Filter" | "Catalog" | "Catagories" | "Items" | "AddFilter" | "AddCatalog" | "AddCatagories" | "AddItems";
    filterData: IFilter | null;
    catalogData: ICatalog | null;
    categoryData: ICategory | null;
    itemData: IItems | null;
    cartData: ICartItem[];
    query: string;
    changeQuery: (value: string) => void;
    changeSearch: (value: boolean) => void;
    changeCall: (value: boolean) => void;
    changeMobileMenu: (value: boolean) => void;
    changeModal: (value: boolean) => void;
    changeModalMode: (
        value:
        | "Filter"
        | "Catalog"
        | "Catagories"
        | "Items"
        | "AddFilter"
        | "AddCatalog"
        | "AddCatagories"
        | "AddItems"
    ) => void;
    changeFilterData: (value: IFilter) => void;
    changeCatalogData: (value: ICatalog) => void;
    changeCategoryData: (value: ICategory) => void;
    changeItemData: (value: IItems) => void;
    changeCartData: (value: ICartItem[]) => void;
};
