// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAu0mJrf-ENWtI78N4WUgUYV7mvCT_u1To",
    authDomain: "lauzhack-cce5e.firebaseapp.com",
    projectId: "lauzhack-cce5e",
    storageBucket: "lauzhack-cce5e.appspot.com",
    messagingSenderId: "463156195290",
    appId: "1:463156195290:web:bf215e93fb5dab57bb1ae3"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});