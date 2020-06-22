import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  FETCHING_CONTRACT,
  FETCH_CONTRACT,
  CONTRACT_ERROR,
  UPDATED_CONTRACT,
} from './types'
import { get, put } from '../../utils/fetch'

export const isFetching = (isFetching: boolean) => {
  return { type: FETCHING_CONTRACT, isFetching }
}

export const updateSuccess = (updateSuccess: boolean) => {
  return { type: UPDATED_CONTRACT, updateSuccess }
}

export const error = (hasError: boolean, errorMessage: string) => {
  return {
    type: CONTRACT_ERROR,
    payload: {
      hasError,
      errorMessage,
    },
  }
}

export const getContract = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(updateSuccess(false))
  dispatch(isFetching(true))

  try {
    const { token } = getState().system
    const { data } = await get(`/contract/${id}`, token)

    dispatch({
      type: FETCH_CONTRACT,
      payload: data,
    })

    dispatch(isFetching(false))
  } catch (err) {
    // TODO: show error to user
    console.log(err)
    dispatch(isFetching(false))
  }
}

export const updateContract = (
  id: string,
  status: string,
  comment: string
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
  dispatch(updateSuccess(false))

  try {
    const { token } = getState().system
    await put(
      `/contract/${id}`,
      {
        status,
        comment,
      },
      token
    )
    const { data } = await get(`/contract/${id}`, token)

    dispatch({
      type: FETCH_CONTRACT,
      payload: data,
    })

    dispatch(updateSuccess(true))
  } catch (err) {
    // TODO: show error to user
    console.log(err)
    dispatch(updateSuccess(false))
    dispatch(error(true, 'Något gick fel. Prova igen.'))
  }
}
