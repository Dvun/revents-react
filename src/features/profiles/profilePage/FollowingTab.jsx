import React from 'react'
import {CardGroup, Grid, GridColumn, Header, TabPane} from 'semantic-ui-react'
import ProfileCard from './ProfileCard'
import {useDispatch, useSelector} from 'react-redux'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import {getFollowersCollection, getFollowingCollection} from '../../../app/firestore/firestoreService'
import {listenToFollowers, listenToFollowings} from '../../../store/actions/profileActions'

const FollowingTab = ({profile, activeTab}) => {
  const dispatch = useDispatch()
  const {followings, followers} = useSelector(({profileReducers}) => profileReducers)

  useFirestoreCollection({
    query: activeTab === 3 ?
      () => getFollowersCollection(profile.id)
      :
      () => getFollowingCollection(profile.id),
    data: data => activeTab === 3 ?
      dispatch(listenToFollowers(data))
      :
      dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch],
  })

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon="user" content={activeTab === 3 ? 'Followers' : 'Following'}/>
        </GridColumn>
        <GridColumn width={16}>
          <CardGroup itemsPerRow={5}>
            {activeTab === 3 && followers.map(profile => (
              <ProfileCard profile={profile} key={profile.id}/>
            ))}
            {activeTab === 4 && followings.map(profile => (
              <ProfileCard profile={profile} key={profile.id}/>
            ))}
          </CardGroup>
        </GridColumn>
      </Grid>
    </TabPane>
  )
}

export default FollowingTab