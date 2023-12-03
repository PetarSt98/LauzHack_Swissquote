// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('user_id');
// If no user Id is provided, take it from the cookie
if (!userId) {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.startsWith('user_id'));
    if (cookie) {
        userId = cookie.split('=')[1];
    }
}
// Set cookie if not set
document.cookie = `user_id=${userId}`;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu0mJrf-ENWtI78N4WUgUYV7mvCT_u1To",
    authDomain: "lauzhack-cce5e.firebaseapp.com",
    projectId: "lauzhack-cce5e",
    storageBucket: "lauzhack-cce5e.appspot.com",
    messagingSenderId: "463156195290",
    appId: "1:463156195290:web:bf215e93fb5dab57bb1ae3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();


export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "BCKMt2MXL_gkAMjPtO219oZqbLv_GU_nY5tlsqLxaR-laPi9-uFa5QaS7MrLbLoBBurVmkabCGi1WWBoupWFfy8"})
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Send the token to my server
                axios.post(`http://giuseppesteduto.me:5000/setToken`, {
                    user_id: userId,
                    token: currentToken
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};