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

export function listenToUserEvents(events) {
    return ({type: consts.LISTEN_TO_USER_EVENTS, payload: events})
}

export function listenToFollowers(followers) {
    return ({type: consts.LISTEN_TO_FOLLOWERS, payload: followers})
}

export function listenToFollowings(followings) {
    return ({type: consts.LISTEN_TO_FOLLOWERS, payload: followings})
}

export function setFollowUser() {
    return ({type: consts.SET_FOLLOW_USER})
}

export function setUnfollowUser() {
    return ({type: consts.SET_UNFOLLOW_USER})
}