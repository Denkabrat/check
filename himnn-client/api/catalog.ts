import { ICatalog, IItems } from "@/types";
import axios from "axios";

class Catalog {
    async get(id: string) {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/catalog`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async getAll() {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/catalog`).then((res) => res.data)
    }

    async create(data: ICatalog) {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/catalog`, {
            data: data.data
        }).then((res) => res.data)
    }

    async delete(id: string) {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/catalog`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, data: ICatalog) {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/catalog`, {
            id, data
        }).then((res) => res.data)
    }
}

export default new Catalog()