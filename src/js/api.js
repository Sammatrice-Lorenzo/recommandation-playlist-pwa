import axios from 'axios'
import { getToken } from "./token"
import { logout } from './util'

export const callApiSpotify = async (url) => {
    const token = getToken()

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            return response
        } else if (response.status === 401) {
            logout()
        }

        return null
    } catch (error) {
        if (error.response && error.response.status === 401) {
            logout()
        }
        throw error
    }
}