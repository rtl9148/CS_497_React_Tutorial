
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getDatabase, onValue, ref} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFTcZrrRvPrJ-_tJI8OD28X-8lTjnLoy8",
  authDomain: "my-497-react-tutorial.firebaseapp.com",
  databaseURL: "https://my-497-react-tutorial-default-rtdb.firebaseio.com",
  projectId: "my-497-react-tutorial",
  storageBucket: "my-497-react-tutorial.appspot.com",
  messagingSenderId: "80457961176",
  appId: "1:80457961176:web:3dcd8c5bba9cd1847cd1ad",
  measurementId: "G-KQ7TE0Z1JM"
};


const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };