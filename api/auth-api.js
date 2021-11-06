import firebase from 'firebase/app'
import 'firebase/auth'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth'

export async function googleSignIn() {
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

export async function signUpUser({ name, email, password }) {
    try {
        const { user } = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.updateProfile({displayName: name})
        return { user }
    } catch (error) {
        return {
            error: error.message
        }
    }
}


export async function loginUser({ email, password }) {
    try {
        const { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
        return { user }
    } catch (error) {
        return {
            error: error.message
        }
    }
}


export async function resetPassword({ email }) {
    try {
        await firebase.auth().sendPasswordResetEmail(email)
        return {}
    } catch (error) {
        return {
            error: error.message
        }
    }
}

export function logOut(){
    firebase.auth().signOut().then(r => {})
}