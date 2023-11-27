import { f7 } from 'framework7-react'

let movementUser = []

function cacheMovementsUser(userPosition) {
    localStorage.setItem('movementUser', JSON.stringify(userPosition))
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
    if (f7.device.ios) {

        if (typeof DeviceOrientationEvent['requestPermission'] === 'function') {
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
        } else {
            f7.dialog.alert(
                "Le navigateur ne prend pas en charge la demande d'autorisation pour récupérer vos informations de mouvement"
            )
        }
    } else if (f7.device.android) {
        startAccelCollection()
    }
}

export function showCachedMovements() {
    const cachedMovements = JSON.parse(localStorage.getItem('movementUser'))

    cachedMovements.forEach((data) =>
        f7.dialog.alert(
            `x${data.x} alpha${data.alpha} y${data.y} b${data.beta} z${data.z} g${data.gamma}`
        ),
    )
}
