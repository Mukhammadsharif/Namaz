import firebase from "firebase";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const firebaseConfig = {
    apiKey: "AIzaSyCtn9RiKjT50WngE2COgoc2LI7tDLJdmKI",
    authDomain: "my-todo-app-be96d.firebaseapp.com",
    projectId: "my-todo-app-be96d",
    storageBucket: "my-todo-app-be96d.appspot.com",
    messagingSenderId: "528049907815",
    appId: "1:528049907815:web:867971abdbb7ae3024ccc2",
    databaseURL: 'https://my-todo-app-be96d-default-rtdb.firebaseio.com/',
}
export default firebase.initializeApp(firebaseConfig);
export const ANDROID_GOOGLE_CLIENT_ID = '937031194018-eq2mc4kfov77j317mg7f8eagfac1v8ft.apps.googleusercontent.com'
export const IOS_GOOGLE_CLIENT_ID = '563795209906-9rfc8bjcsniasbjqrupqa0qp5d1bqevs.apps.googleusercontent.com'


// GoogleSignin.configure({
//   webClientId: '528049907815-m2n3r6q10ht8loopv0opurqc6cirt40v.apps.googleusercontent.com',
// });