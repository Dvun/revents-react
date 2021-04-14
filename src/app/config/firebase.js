import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBv7l953NhMwiBYDNn8Y8pYJKQlCj1FQVw",
  authDomain: "revents-page.firebaseapp.com",
  databaseURL: "https://revents-page.firebaseio.com",
  projectId: "revents-page",
  storageBucket: "revents-page.appspot.com",
  messagingSenderId: "163977246920",
  appId: "1:163977246920:web:d5bcf0d54a6d17facdcdfd"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase