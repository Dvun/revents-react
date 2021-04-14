import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {asyncActionError, asyncActionFinnish, asyncActionStart} from '../../store/reducers/asyncReducers'
import {dataFromSnapshot} from '../firestore/firestoreService'

export default function useFirestoreCollection({query, data, deps}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncActionStart())
    const unsubscribe = query().onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => dataFromSnapshot(doc))
        data(docs)
        dispatch(asyncActionFinnish())
      },
      error => dispatch(asyncActionError(error)),
    )
    return () => unsubscribe()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

}