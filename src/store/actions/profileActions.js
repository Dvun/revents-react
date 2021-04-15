import * as consts from '../constants/profileConstants'


export const listenToCurrentUserProfile = (profile) => {
    return ({type: consts.LISTEN_TO_CURRENT_USER_PROFILE, payload: profile})
}

export const listenToSelectedUserProfile = (profile) => {
    return ({type: consts.LISTEN_TO_SELECTED_USER_PROFILE, payload: profile})
}

export const listenToUserPhotos = (photos) => {
    return ({type: consts.LISTEN_TO_USER_PHOTOS, payload: photos})
}