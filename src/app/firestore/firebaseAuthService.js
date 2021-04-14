import firebase from '../../app/config/firebase'
import {setUserProfileData} from './firestoreService'
import {toast} from 'react-toastify'

export function sigInWithEmail(creds) {
  return firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
}

export function signOutFirebase() {
  return firebase.auth().signOut()
}

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