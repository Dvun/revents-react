import React from 'react'
import {Grid, GridColumn} from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'
import {useDispatch, useSelector} from 'react-redux'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {getUserProfile} from '../../../app/firestore/firestoreService'
import {listenToSelectedUserProfile} from '../../../store/actions/profileActions'
import LoadingComponent from '../../../app/layout/LoadingComponent'

const ProfilePage = ({match}) => {
  const dispatch = useDispatch()
  const {selectedUserProfile} = useSelector(({profileReducers}) => profileReducers)
  const {user} = useSelector(({authReducers}) => authReducers)
  const {loading, error} = useSelector(({asyncReducers}) => asyncReducers)


  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: profile => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id]
  })

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error)) return <LoadingComponent content='Loading Profile...'/>

  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader profile={selectedUserProfile} isCurrentUser={user.uid === selectedUserProfile.id}/>
        <ProfileContent profile={selectedUserProfile} isCurrentUser={user.uid === selectedUserProfile.id}/>
      </GridColumn>
    </Grid>
  )
}

export default ProfilePage