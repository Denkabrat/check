export type ICatalog = {
    id: string,
    data: {
        image: string
        text: string
        timestamp?: any
        title: string
        seo: {
            title: string
            description: string
        }
    }
}

export type IItemFilter = {
    name: string,
    value: string
}

export type IAddArray = {
    name: string,
    value: string
}

export type IItems = {
    id: string,
    data: {
        artikul: string,
        price: number,
        image: string,
        additional: {
            standart: string,
            creator: string,
            thickness: number,
            width: number,
            weight: number,
            mark: string,
            height: number
        },
        additionalArray: IAddArray[]
        inStock: boolean,
        text: string,
        title: string,
        seo: {
            description: string,
            title: string
        },
        gost: {
            title: string,
            file: string,
        },
        timestamp?: any
        category: string,
        subcategory: string
        filterData: IItemFilter[]
    }
}

export type ICategory = {
    id: string,
    data: {
        image: string,
        text: string,
        title: string,
        category: string,
        timestamp?: any,
        seo: {
            description: string,
            title: string
        },
        table: any[]

    }

}

export type IFilter = {
    id: string,
    data: {
        array: string[],
        title: string,
        timestamp?: any
    }
}

export type ICartItem = {
    image: string,
    title: string,
    price: number,
    count: number,
    id: string
}

export type ICheckout = {
    items: ICartItem[]
    state: boolean
    fullname: string
    email: string
    phone: string
    comment: string
    companyName: string
    address: string
    INN: string
    KPP: string
    BIK: string
    checkingAccount: string
    bank: string
    city: string
    corespondentAccount: string
    contactPerson: string
}