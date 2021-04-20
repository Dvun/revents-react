import React, {useEffect, useState} from 'react'
import {
  Button,
  Divider,
  Grid,
  GridColumn,
  Header,
  Item,
  ItemContent,
  ItemGroup,
  ItemImage, Reveal, RevealContent,
  Segment,
  Statistic,
  StatisticGroup,
} from 'semantic-ui-react'
import {toast} from 'react-toastify'
import {followUser, getFollowingDoc, unfollowUser} from '../../../app/firestore/firestoreService'
import {useDispatch, useSelector} from 'react-redux'
import {setFollowUser, setUnfollowUser} from '../../../store/actions/profileActions'
import {CLEAR_FOLLOWINGS} from '../../../store/constants/profileConstants'

const ProfileHeader = ({profile, isCurrentUser}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {followingUser} = useSelector(({profileReducers}) => profileReducers)

  useEffect(() => {
    if (isCurrentUser) return
    setLoading(true)
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id)
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser())
        }
      } catch (e) {
        toast.error(e.message)
      }
    }
    fetchFollowingDoc().then(() => setLoading(false))
    return({type: CLEAR_FOLLOWINGS})
  }, [dispatch, profile.id, isCurrentUser])

  async function handleFollowUser() {
    setLoading(true)
    try {
      await followUser(profile)
      dispatch(setFollowUser())
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUnfollowUser() {
    setLoading(true)
    try {
      await unfollowUser(profile)
      dispatch(setUnfollowUser())
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Segment>
      <Grid>

        <GridColumn width={12}>
          <ItemGroup>
            <Item>
              <ItemImage avatar size="small" src={profile.photoURL || '/assets/user.png'}/>
              <ItemContent verticalAlign="middle">
                <Header as="h1" style={{display: 'block', marginBottom: 10}} content={profile.displayName}/>
              </ItemContent>
            </Item>
          </ItemGroup>
        </GridColumn>

        <GridColumn width={4}>
          <StatisticGroup>
            <Statistic label="Followers" value={profile.followerCount || 0}/>
            <Statistic label="Following" value={profile.followingCount || 0}/>
          </StatisticGroup>
          {
            !isCurrentUser &&
            <>
              <Divider/>
              <Reveal animated="move up">
                <RevealContent visible style={{width: '100%'}}>
                  <Button fluid color="teal" content={followingUser ? 'Following' : 'Not following'}/>
                </RevealContent>
                <RevealContent hidden style={{width: '100%'}}>
                  <Button
                    onClick={followingUser ? () => handleUnfollowUser() : () => handleFollowUser()}
                    loading={loading}
                    basic
                    fluid
                    color={followingUser ? 'red' : 'green'}
                    content={followingUser ? 'Unfollow' : 'Follow'}
                  />
                </RevealContent>
              </Reveal>
            </>
          }
        </GridColumn>

      </Grid>
    </Segment>
  )
}

export default ProfileHeader