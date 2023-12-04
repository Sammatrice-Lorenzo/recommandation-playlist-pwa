import { database } from "./firebase"
import { ref, set, get, push } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { getUser } from "./user"
import { getEmailUserStored } from "./userStorage"

const playlistUId = uuidv4()

/**
 * @param { string } namePlaylist
 * @returns { void }
 */
export async function addPlaylistByUser(namePlaylist, playlistRecommended) {
    const email = getEmailUserStored()
    const user = await getUser(email)

    const playlist = {
        name: namePlaylist + ' ' + new Date().toDateString(),
        tracks: playlistRecommended.tracks,
        type: playlistRecommended.type
    }

    const playlistRef = ref(database, 'playlists/' + playlistUId)
    await set(playlistRef, playlist)
        .then(() => {
            const playlistUserRef = ref(database, 'users/' + user.uId + '/playlists')
            return push(playlistUserRef, playlistUId)
        })
        .catch((error) => console.error(error))
}
