import { IFilter, IItems } from "@/types";
import axios from "axios";

class Filter {
    async get(id: string) {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/filter`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async getAll() {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/filter`).then((res) => res.data)
    }

    async create(data: IFilter) {
        return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/filter`, {
            data: data.data
        }).then((res) => res.data)
    }

    async delete(id: string) {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/filter`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, data: string[]) {
        return await axios.put(`${process.env.NEXT_PUBLIC_SERVER}/filter`, {
            id, data: {
                array: data
            }
        }).then((res) => res.data)
    }
}

export default new Filter()