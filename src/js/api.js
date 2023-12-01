import axios from 'axios'
import { getToken } from "./token"
import { logout } from './util'
import { f7 } from 'framework7-react'

export const ERROR_SERVER = 'La requête n\'as pa pu aboutir'

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

/**
 * @param { URL } url
 * @param { string } method
 * @param { string } body
 * 
 * @returns { void } 
 */
export function apiRequest(url, method, body)
{
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    }).then(response =>
        response
            .json()
            .then(function (data) {
                f7.dialog.alert(JSON.stringify(data))
            })
    )
        .catch(error => {
            console.log(error)
            f7.dialog.alert(error)
            // f7.dialog.alert(ERROR_SERVER)
        })
}