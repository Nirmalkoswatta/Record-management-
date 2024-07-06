import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUpsfbJhw55z47Y6FtwhIfsiDLQ6777Ic",
    authDomain: "record-management-system-e4074.firebaseapp.com",
    projectId: "record-management-system-e4074",
    storageBucket: "record-management-system-e4074.appspot.com",
    messagingSenderId: "832738192454",
    appId: "1:832738192454:web:7b56b6e3b9828195286e47"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;