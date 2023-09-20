const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7QTmTa1Irf7OlQz91OJlxNRCKbPydRr4",
  authDomain: "social-app-45519.firebaseapp.com",
  projectId: "social-app-45519",
  storageBucket: "social-app-45519.appspot.com",
  messagingSenderId: "95377687773",
  appId: "1:95377687773:web:09772d89ee0da102780734"
};

const app = initializeApp(firebaseConfig);


module.exports = getFirestore(app)