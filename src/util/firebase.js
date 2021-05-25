import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCI6n82VYTOsh5z97SIhz8lT_NYXs_qA7g",
  authDomain: "gems-ee5df.firebaseapp.com",
  projectId: "gems-ee5df",
  storageBucket: "gems-ee5df.appspot.com",
  messagingSenderId: "483194888716",
  appId: "1:483194888716:web:3c6a145869489f57b90429",
  measurementId: "G-K0CGYZ40R1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
