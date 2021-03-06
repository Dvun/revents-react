import firebase from '../../app/config/firebase'
import {setUserProfileData} from './firestoreService'
import {toast} from 'react-toastify'

export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map(e => Object.assign({}, e[1], {id: e[0]}))
  }
}

// Login wit email
export function sigInWithEmail(creds) {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
}

// Logout
export function signOutFirebase() {
  return firebase.auth().signOut()
}

// Register New User
export async function registerInFirebase(creds) {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
    await res.user.updateProfile({
      displayName: creds.displayName
    })
    await setUserProfileData(res.user)
  } catch (e) {
    throw e
  }
}

// Register or Login User with Social Buttons
export async function socialLogin(selectedProvider) {
  let provider
  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider()
  }
  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider()
  }
  try {
    const res = await firebase.auth().signInWithPopup(provider)
    if (res.additionalUserInfo.isNewUser) {
      await setUserProfileData(res.user)
    }
  } catch (e) {
    toast.error(e.message)
  }
}

// Upload images to Firebase storage
export function uploadToFirebaseStorage(file, filename) {
  const user = firebase.auth().currentUser
  const storageRef = firebase.storage().ref()
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file)
}

// Delete image from Firebase storage
export function deleteFromFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid
  const storageRef = firebase.storage().ref()
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`)
  return photoRef.delete()
}

export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId
  }
  return firebase.database().ref(`chat/${eventId}`).push(newComment)
}

export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey()
}