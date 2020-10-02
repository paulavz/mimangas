import * as firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCyAzS4WmpUs85P1xXfvy6tKKPIFraxAXM",
  authDomain: "mismangas-7e620.firebaseapp.com",
  databaseURL: "https://mismangas-7e620.firebaseio.com",
  projectId: "mismangas-7e620",
  storageBucket: "mismangas-7e620.appspot.com",
  messagingSenderId: "889866365467",
  appId: "1:889866365467:web:b15b44f990f57fb35c66be",
  measurementId: "G-M3LJ1834SV",
};

firebase.initializeApp(config);

export default firebase;
