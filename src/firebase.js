import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyBFiJP-PVV8jCljNq62nquoTVkl46Vsldw",
    authDomain: "todo-app123456.firebaseapp.com",
    projectId: "todo-app123456",
    storageBucket: "todo-app123456.appspot.com",
    messagingSenderId: "247179786644",
    appId: "1:247179786644:web:e7bfd14c05ec40a918f781",
    measurementId: "G-MSVMZG1NXR"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
firebase.getCurrentUser = () => {
    return new Promise((resolve,reject) =>{
        firebase.auth().onAuthStateChanged(user =>{
            resolve(user);
        },reject);
    });
}
export const db = firebase.firestore();
export {firebase};