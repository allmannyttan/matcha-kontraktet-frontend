import {
  FETCH_SELECTIONS,
  FETCH_SELECTION,
  FETCHING_SELECTION,
  CREATE_SELECTION,
  SelectionState,
  SelectionActionTypes,
} from './types'

const initialState: SelectionState = {
  isFetching: false,
  selections: [],
  selection: {
    id: '',
    name: '',
    selection_term: '',
    contracts: [],
    last_population_registration_lookup: null,
    created_by: '',
    created_at: new Date(),
  },
}

export function selectionReducer(
  state = initialState,
  action: SelectionActionTypes
): SelectionState {
  switch (action.type) {
    case FETCHING_SELECTION: {
      return { ...state, isFetching: action.isFetching }
    }
    case FETCH_SELECTIONS: {
      return {
        ...state,
        selections: action.payload,
      }
    }
    case FETCH_SELECTION: {
      return {
        ...state,
        selection: action.payload,
      }
    }
    case CREATE_SELECTION: {
      return {
        ...state,
        selection: action.payload,
      }
    }
    default:
      return state
  }
}
