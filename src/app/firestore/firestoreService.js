import firebase from '../config/firebase'
import cuid from 'cuid'

const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined
  const data = snapshot.data()

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate()
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  }
}

// Events routes
export function listenToEventsFromFirestore() {
  return db.collection('events').orderBy('date')
}

export function listenToEventFromFirestore(eventId) {
  return db.collection('events').doc(eventId)
}

export function addEventToFirestore(event) {
  return db.collection('events').add({
    ...event,
    hostedBy: 'Roman',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      name: 'Roman',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    }),
  })
}

export function updateEventInFirestore(event) {
  return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFirestore(eventId) {
  return db.collection('events').doc(eventId).delete()
}

export function cancelEventToggle(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  })
}

// User routes
export function setUserProfileData(user) {
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export function updateUserPassword(password) {
  const user = firebase.auth().currentUser
  return user.updatePassword(password.newPassword1)
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId)
}

export async function updateUserProfile(profile) {
  const user = await firebase.auth().currentUser
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      })
    }
    return await db.collection('users').doc(user.uid).update(profile)
  } catch (e) {
    throw e
  }
}

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser
  const userDocRef = db.collection('users').doc(user.uid)
  try {
    const userDoc = await userDocRef.get()
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    })
  } catch (e) {
    throw e
  }
}

export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos')
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser
  try {
    await db.collection('users').doc(user.uid).update({
      photoURL: photo.url,
    })
    return await user.updateProfile({
      photoURL: photo.url,
    })
  } catch (e) {
    throw e
  }
}

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}