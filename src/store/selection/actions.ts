import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { FETCH_SELECTIONS, FETCH_SELECTION, FETCHING_SELECTION } from './types'
import { get, post } from '../../utils/fetch'

export const isFetching = (isFetching: boolean) => {
  return { type: FETCHING_SELECTION, isFetching }
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

export const getSelection = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true))

  try {
    const { token } = getState().system
    const { data } = await get(`/selection/${id}`, token)
    const contracts = await get(`/selection/${id}/contracts`, token)

    data.contracts = contracts.data

    dispatch({
      type: FETCH_SELECTION,
      payload: data,
    })

    dispatch(isFetching(false))
  } catch (err) {
    // TODO: show error to user
    console.log(err)
    dispatch(isFetching(false))
  }
}

export const createNewSelection = (
  selection_term: string,
  name: string
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
  dispatch(isFetching(true))

  try {
    const { token } = getState().system

    const newSelection = await post(
      `/selection`,
      {
        selection_term,
        name,
      },
      token
    )

    await get(`/selection/${newSelection.data.id}/fetch-contracts`, token)

    const { data } = await get('/selection', token)

    dispatch({
      type: FETCH_SELECTIONS,
      payload: data,
    })

    dispatch(isFetching(false))
  } catch (err) {
    // TODO: show error to user
    console.log(err)
  }
}
