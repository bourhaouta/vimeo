import axios from 'axios'
import { API_ENDPOINT, API_TOKEN } from '../config'

export const HTTP = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }
})
