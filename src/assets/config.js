import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkyVPrFbWooCbLct4YWucMnjpcStLoxoI",
  authDomain: "logincomp-28829.firebaseapp.com",
  projectId: "logincomp-28829",
  storageBucket: "logincomp-28829.appspot.com",
  messagingSenderId: "1066209161128",
  appId: "1:1066209161128:web:bce9ebd1b303a54618779d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const logout = () =>{
  localStorage.removeItem("currentUser");
}

