import { v4 as uuidv4 } from 'uuid'
import { database } from "./firebase"
import { ref, set, get } from 'firebase/database'
import { getEmailUserStored } from "./userStorage"

const userUId = uuidv4()

/**
 * @returns { void }
 */
export async function createUser() {
    const email = getEmailUserStored()

    try {
        const userRef = ref(database, 'users/' + userUId)
        await set(userRef, {
            email: email,
        }).then(() => console.log(('succes')))
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * @param { string } emailUserSpotify 
 * @returns { Promise<any> } 
 */
export async function findUser(emailUserSpotify) {
    const usersRef = ref(database, 'users')
    const snapshot = await get(usersRef)

    let user = null
    if (snapshot.exists()) {
        const users = snapshot.val()
        const usersToArray = Object.entries(users).map(([uId, user]) => ({
            uId: uId,
            email: user.email,
            playlists: user.playlists
        }))

        user = usersToArray.filter(user => user.email === emailUserSpotify)[0]
    }

    return user
}

/**
 * @param { string } emailUser
 * @returns {  Promise<any> }
 */
export async function getUser() {
    const emailUser = getEmailUserStored()

    let user = await findUser(emailUser)

    if (!user) {
        createUser()
        user = await findUser(emailUser)
    }

    return user
}