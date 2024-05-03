import { IItems } from "@/types";
import axios from "axios";

class Items {
    async get(id: string) {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/items/${id}`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async getAll() {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/items`).then((res) => res.data)
    }

    async create(data: IItems) {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/items`, {
            data: data.data
        }).then((res) => res.data)
    }

    async delete(id: string) {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/items`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, data: IItems) {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/items`, {
            id, data
        }).then((res) => res.data)
    }
}

export default new Items()