import axios from "axios"


export const api = axios.create({
    baseURL: 'http://localhost:3001'
})


export const jsonServer = axios.create({
    baseURL: 'http://localhost:3333'
})
