import React, {useState} from 'react'
import {Button, ButtonGroup, Card, CardGroup, Grid, GridColumn, Header, Image, TabPane} from 'semantic-ui-react'
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget'
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection'
import {deletePhotoFromCollection, getUserPhotos, setMainPhoto} from '../../../app/firestore/firestoreService'
import {useDispatch, useSelector} from 'react-redux'
import {listenToUserPhotos} from '../../../store/actions/profileActions'
import {toast} from 'react-toastify'
import {deleteFromFirebaseStorage} from '../../../app/firestore/firebaseService'

export const PhotosTab = ({profile, isCurrentUser}) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [updating, setUpdating] = useState({isUpdating: false, target: null})
  const [deleting, setDeleting] = useState({isDeleting: false, target: null})
  const {loading} = useSelector(({asyncReducers}) => asyncReducers)
  const {photos} = useSelector(({profileReducers}) => profileReducers)

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: photos => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  })

  async function handleSetMainPhoto(photo, target) {
    setUpdating({isUpdating: true, target})
    try {
      await setMainPhoto(photo)
      setUpdating({isUpdating: false, target: null})
    } catch (e) {
      toast.error(e.message)
      setUpdating({isUpdating: false, target: null})
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({isDeleting: true, target})
    try {
      await deleteFromFirebaseStorage(photo.name)
      await deletePhotoFromCollection(photo.id)
      setDeleting({isDeleting: false, target: null})
    } catch (e) {
      toast.error(e.message)
      setDeleting({isDeleting: false, target: null})
    }
  }


  return (
    <TabPane loading={loading}>
      <Grid>
        <GridColumn width={16}>
          <Header floated="left" icon="user" content={`Photos`}/>
          {
            isCurrentUser &&
            <Button
              onClick={() => setEditMode(prevState => !prevState)}
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          }
        </GridColumn>
        <GridColumn width={16}>
          {
            editMode ?
              <PhotoUploadWidget setEditMode={setEditMode}/>
              :
              <CardGroup itemsPerRow={5}>
                {
                  photos.map(photo => (
                    <Card key={photo.id}>
                      <Image src={photo.url}/>
                      <ButtonGroup fluid widths={2}>
                        <Button
                          name={photo.id}
                          loading={updating.isUpdating && updating.target === photo.id}
                          disabled={photo.url === profile.photoURL}
                          onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                          basic
                          color="green"
                          content="Main"
                        />
                        <Button
                          onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                          loading={deleting.isDeleting && deleting.target === photo.id}
                          disabled={photo.url === profile.photoURL}
                          basic
                          color="red"
                          icon="trash"
                        />
                      </ButtonGroup>
                    </Card>
                  ))
                }
              </CardGroup>
          }
        </GridColumn>
      </Grid>
    </TabPane>
  )
}
