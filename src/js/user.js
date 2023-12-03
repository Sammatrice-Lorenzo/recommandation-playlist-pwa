import { auth } from "./firebase"
import { ref, set, getDatabase } from 'firebase/database'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const database = getDatabase()

export async function addUser(userId, user) {
    try {
        const userUId = userCredential.user.uid
        const playlist = { name: 'test'}
        const userRef = ref(database, 'playlists/')
        await set(userRef, {
            name: playlist,
        }).then(() => console.log(('succes')))
        alert('User added successfully');
        // const userCredential = await createUserWithEmailAndPassword(auth, userId, '0000')
        // const userUId = userCredential.user.uid

        // const userRef = ref(database, 'users/' + userUId)
        // await set(userRef, {
        //     id: user,
        // }).then(() => console.log(('succes')))
        // alert('User added successfully');
    } catch (error) {
        console.log(error.message);
    }
}
