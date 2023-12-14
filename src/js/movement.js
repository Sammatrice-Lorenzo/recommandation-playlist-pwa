import { getUrl } from './url'
import { apiRequest } from './api'
import { f7 } from 'framework7-react'
import Framework7 from 'framework7/bundle'
import { sendNotificationForRecommendation } from './notification'

const MOVEMENT_USER = 'movementUser'
const PLAYLIST_RECOMMENDED = 'playlist'

let movementUser = []

/**
 * @param {Array<Int16Array, Object> } elementToCached 
 */
function cacheElement(key, elementToCached) {
    localStorage.setItem(key, JSON.stringify(elementToCached))
}

function removeCacheElement(key) {
    localStorage.removeItem(key)
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
            cacheElement(MOVEMENT_USER, movementUser)
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
        // f7.dialog.alert(
        //     "Le navigateur ne prend pas en charge la demande d'autorisation pour récupérer vos informations de mouvement"
        // )
    }
}


export async function sendMovementsUser() {
    const url = getUrl('/recommendation')
    const cachedMovements = JSON.parse(localStorage.getItem(MOVEMENT_USER))

    if (cachedMovements !== null) {
        const playlist = await apiRequest(url, 'POST', cachedMovements)
        removeCacheElement(MOVEMENT_USER)
        removeCacheElement(PLAYLIST_RECOMMENDED)

        if (playlist) {
            const playlistToString = JSON.stringify(playlist)

            cacheElement(PLAYLIST_RECOMMENDED, playlistToString)
            sendNotificationForRecommendation(f7, playlistToString)
        }
    }
}