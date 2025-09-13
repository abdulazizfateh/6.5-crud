import axios from "axios";
export const api = axios.create(
    {
        baseURL: "https://68c5c958a712aaca2b6996f0.mockapi.io/blog"
    }
)