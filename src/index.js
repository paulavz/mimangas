import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from "./Inicializer/firebase";
import App from './App';
import * as serviceWorker from './serviceWorker';
require("firebase/firebase-firestore");


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => {
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener("statechange", event => {
        if (event.target.state === "activated") {
          window.location.reload()
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  }
});


firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
