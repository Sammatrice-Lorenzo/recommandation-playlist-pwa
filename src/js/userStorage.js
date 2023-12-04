import { removeToken } from "./token"

const KEY_EMAIL_USER = 'email'
const KEY_ID_USER = 'userId'

/**
 * @param { string } email 
 * @returns { void }
 */
export function storeEmailUser(email) {
    localStorage.setItem(KEY_EMAIL_USER, email)
}

/**
 * @returns { string|null }
 */
export function getEmailUserStored() {
    return localStorage.getItem(KEY_EMAIL_USER)
}

/**
 * @param { string } userIdSpotify 
 * @returns { void }
 */
export function storeUserId(userIdSpotify) {
    localStorage.setItem(KEY_ID_USER, userIdSpotify)
}

/**
 * @returns { string|null }
 */
export function getUserIdStored() {
    return localStorage.getItem(KEY_ID_USER)
}

/**
 * @returns { void }
 */
export function logout () {
    removeToken()
    window.location.reload(true)
}
