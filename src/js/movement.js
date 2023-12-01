import { f7 } from 'framework7-react'
import { getUrl } from './url'
import { apiRequest } from './api'

let movementUser = []

function cacheMovementsUser(userPosition) {
    localStorage.setItem('movementUser', JSON.stringify(userPosition))
}

function removeCacheMovementsUser() {
    localStorage.removeItem('movementUser')
    movementUser = []
}

export function startAccelCollection() {

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            const acceleration = event.acceleration
            const gyroscope = event.rotationRate
            const mouve = {
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z,
                alpha: gyroscope.alpha,
                beta: gyroscope.beta,
                gamma: gyroscope.gamma
            }
            movementUser.push(mouve)
            cacheMovementsUser(movementUser)
        })
    } else {
        f7.dialog.alert("Le navigateur ne prend pas en charge l'accéléromètre.")
    }
}

export const requestMotion = async () => {
    if (f7.device.ios && typeof DeviceOrientationEvent['requestPermission'] === 'function') {
        DeviceOrientationEvent['requestPermission']()
            .then((permissionState) => {
                if (permissionState === 'granted') {
                    startAccelCollection()
                } else {
                    f7.dialog.alert('La recommendation de la playlist ne pourra pas être effectué')
                }
            })
            .catch((error) => {
                console.log(error.message)
                f7.dialog.alert('Une erreur serveur est survenue')
            })
    } else if (f7.device.android) {
        startAccelCollection()
    } else {
        f7.dialog.alert(
            "Le navigateur ne prend pas en charge la demande d'autorisation pour récupérer vos informations de mouvement"
        )
    }
}

export function showCachedMovements() {
    const cachedMovements = JSON.parse(localStorage.getItem('movementUser'))

    alert(cachedMovements !== null ? cachedMovements.length : 0)
    // alert(movementUser.length)
    // cachedMovements.forEach((data) =>
    //     f7.dialog.alert(
    //         `x${data.x} alpha${data.alpha} y${data.y} b${data.beta} z${data.z} g${data.gamma}`
    //     ),
    // )
}

/**
 * Pour test on laisse 1 min
 * Il faut mettre 20 min => 1 200 000
 */
export function sendMovementsUser() {
    const url = getUrl('/recommendation')
    const cachedMovements = JSON.parse(localStorage.getItem('movementUser'))

    alert(typeof cachedMovements)
    if (cachedMovements !== null || cacheMovementsUser !== undefined) {
        setInterval(() => {
            apiRequest(url, 'POST', JSON.stringify(cachedMovements))
            removeCacheMovementsUser()
        }, 30000)
        // }, 60000)
    }
}