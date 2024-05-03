import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { State } from './types'
import { ICartItem, ICatalog, ICategory, IFilter, IItems } from '@/types'

const useGlobalStore = create<State>()(devtools((set) => ({
    search: false,
    call: false,
    mobileMneu: false,
    modal: false,
    modalMode: "Filter",
    filterData: null,
    catalogData: null,
    categoryData: null,
    itemData: null,
    cartData: [],
    query: ' ',
    

    changeQuery: (value: string) => set({ query: value }),
    changeSearch: (value: boolean) => set({ search: value }),
    changeCall: (value: boolean) => set({ call: value }),
    changeMobileMenu: (value: boolean) => set({ mobileMneu: value }),
    changeModal: (value: boolean) => set({ modal: value }),
    changeModalMode: (value: "Filter" | "Catalog" | "Catagories" | "Items" | "AddFilter" | "AddCatalog" | "AddCatagories" | "AddItems") => set({ modalMode: value }),
    changeFilterData: (value: IFilter) => set({ filterData: value }),
    changeCatalogData: (value: ICatalog) => set({ catalogData: value }),
    changeCategoryData: (value: ICategory) => set({ categoryData: value }),
    changeItemData: (value: IItems) => set({ itemData: value }),
    changeCartData: (value: ICartItem[]) => set({ cartData: value }),
})))

export default useGlobalStore