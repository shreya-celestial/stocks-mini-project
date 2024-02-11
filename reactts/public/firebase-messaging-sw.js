importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBokPBOiay-5s6WDdEXyCUmmVPhhYEJzRc",
  authDomain: "nstockse.firebaseapp.com",
  projectId: "nstockse",
  storageBucket: "nstockse.appspot.com",
  messagingSenderId: "875320261133",
  appId: "1:875320261133:web:17583ab3b56ad7f650f344"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();