import React, {useState} from 'react'
import {Button, ButtonGroup, Grid, GridColumn, Header} from 'semantic-ui-react'
import PhotoWidgetDropzone from './PhotoWidgetDropzone'
import {PhotoWidgetCropper} from './PhotoWidgetCropper'
import cuid from 'cuid'
import {getFileExtension} from '../utils/util'
import {uploadToFirebaseStorage} from '../../firestore/firebaseService'
import {toast} from 'react-toastify'
import {updateUserProfilePhoto} from '../../firestore/firestoreService'

const PhotoUploadWidget = ({setEditMode}) => {
  const [files, setFiles] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleUploadImage() {
    setLoading(true)
    const filename = cuid() + '.' + getFileExtension(files[0].name)
    const uploadTask = uploadToFirebaseStorage(image, filename)
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    }, error => {
      toast.error(error.message)
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        updateUserProfilePhoto(downloadURL, filename).then(() => {
          setLoading(false)
          handleCancelCrop()
          setEditMode(false)
        }).catch(error => {
          toast.error(error.message)
          setLoading(false)
        })
      })
    })
  }

  function handleCancelCrop() {
    setFiles([])
    setImage(null)
  }

  return (
    <Grid>
      <GridColumn width={4}>
        <Header color="teal" sub content="Step 1 - Add Photo" textAlign="center"/>
        <PhotoWidgetDropzone setFiles={setFiles}/>
      </GridColumn>
      <GridColumn width={1}/>

      <GridColumn width={4}>
        <Header color="teal" sub content="Step 2 - Resize" textAlign="center"/>
        {
          files.length > 0 &&
          <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview}/>
        }
      </GridColumn>
      <GridColumn width={1}/>

      <GridColumn width={4}>
        <Header color="teal" sub content="Step 3 - Preview & upload" textAlign="center"/>
        {
          files.length > 0 &&
          <>
            <div className="img-preview" style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
            <ButtonGroup>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{width: 100}}
                positive
                icon="check"
              />
              <Button disabled={loading} onClick={handleCancelCrop} style={{width: 100}} icon="close"/>
            </ButtonGroup>
          </>
        }
      </GridColumn>
    </Grid>
  )
}

export default PhotoUploadWidget