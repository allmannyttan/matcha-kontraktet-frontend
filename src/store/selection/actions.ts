import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { FETCH_SELECTIONS, FETCHING_SELECTIONS } from './types'
import { get } from '../../utils/fetch'

export const isFetching = (isFetching: boolean) => {
  return { type: FETCHING_SELECTIONS, isFetching }
}

export const getSelections = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true))

  try {
    const { token } = getState().system
    const { data } = await get('/selection', token)

    dispatch({
      type: FETCH_SELECTIONS,
      payload: data,
    })

    dispatch(isFetching(false))
  } catch (err) {
    // TODO: show error to user
    console.log(err)
    dispatch(isFetching(false))
  }
}
