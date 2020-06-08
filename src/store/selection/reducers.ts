import {
  FETCH_SELECTIONS,
  FETCHING_SELECTIONS,
  SelectionState,
  SelectionActionTypes,
} from './types'

const initialState: SelectionState = {
  isFetching: false,
  selections: [],
}

export function selectionReducer(
  state = initialState,
  action: SelectionActionTypes
): SelectionState {
  switch (action.type) {
    case FETCHING_SELECTIONS: {
      return { ...state, isFetching: action.isFetching }
    }
    case FETCH_SELECTIONS: {
      return {
        ...state,
        selections: action.payload,
      }
    }
    default:
      return state
  }
}
