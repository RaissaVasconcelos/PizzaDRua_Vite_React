import axios from "axios"


export const api = axios.create({
    baseURL: 'https://hammerhead-app-mvicn.ondigitalocean.app'
})

export const socket = axios.create({
    baseURL: 'https://hammerhead-app-mvicn.ondigitalocean.app'
})

export const localServer = axios.create({
    baseURL: 'http://localhost:3001'
})
