import axios from 'axios'
const BASE = 'https://jsonplaceholder.typicode.com/posts'

export const api = {
    getAll: async () => {
        let response = await axios.get(BASE)
        return response.data
    },
    addNewPosts: async (title: string, body: string, userId: number) => {
        let response = await axios.post(BASE, {
            title, body, userId: 1
        });
        return response.data
    }
}

