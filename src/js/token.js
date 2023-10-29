/**
 * @returns {string}
 */
export function getToken () {
    return window.localStorage.getItem('token')
}

export function removeToken () {
    window.localStorage.removeItem('token');
}
