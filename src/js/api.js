import { getToken } from "./token"
import { logout } from './userStorage'
import { f7 } from 'framework7-react'

export const ERROR_SERVER = 'La requête n\'as pa pu aboutir'


/**
 * @param { string } url
 * @param { string } methodApi
 * @returns { Promise<AxiosResponse<any, any> | null> }
 */
export const callApiSpotify = async (url, methodApi, bodyApi = null) => {
    const token = getToken()

    let options = {
        method: methodApi,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    if (bodyApi) {
        options.body = JSON.stringify(bodyApi)
    }

    try {
        const response = await fetch(url, options)

        if (response.status === 200 || response.status === 201) {
            return await response.json()
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

/**
 * @param { URL } url
 * @param { string } method
 * @param { string } body
 * 
 * @returns { Promise<any> }
 * 
 */
export async function apiRequest(url, method, body)
{
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        if (response.status === 200) {
            const data = await response.json()
            f7.dialog.alert('La playlist recommandé selon vos mouvements')

            return data
        }
        f7.dialog.alert(ERROR_SERVER)

        return null
    } catch (error) {
        console.log(error)
        f7.dialog.alert(error)
    }
}