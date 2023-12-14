import { database } from "./firebase"
import { ref, set, get, push } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { getUser } from "./user"

const playlistUId = uuidv4()

/**
 * @param { string } namePlaylist
 * @returns { void }
 */
export async function addPlaylistByUser(namePlaylist, playlistRecommended) {
    const user = await getUser()

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

/**
 * 
 * @returns { Object<any> }
 */
export async function getPlaylistsByUser() {
    const user = await getUser()

    const playlist = ref(database, 'playlists')
    const snapshot = await get(playlist)

    let playlistsUser = null
    if (snapshot.exists()) {
        let playlists = snapshot.val()
        const playlistsToArray = Object.entries(playlists).map(([uId, playlist]) => ({
            uId: uId,
            name: playlist.name,
            tracks: playlist.tracks
        }))

        playlistsUser = playlistsToArray.filter(playlist => Object.values(user.playlists).includes(playlist.uId))
    }

    return playlistsUser
}