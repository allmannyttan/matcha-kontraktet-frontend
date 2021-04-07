import {
  FETCH_SELECTIONS,
  FETCH_SELECTION,
  FETCHING_SELECTION,
  CREATE_SELECTION,
  SELECTION_ERROR,
  SelectionState,
  SelectionActionTypes,
  SortDirection,
} from "./types";

const initialState: SelectionState = {
  isFetching: false,
  selections: [],
  selection: {
    id: "",
    name: "",
    selection_term: "",
    contracts: [],
    last_population_registration_lookup: null,
    created_by: "",
    created_at: new Date(),
    from: null,
    to: null,
    total_contracts: 0,
  },
  hasError: false,
  errorMessage: "",
  sortingOptions: [],
  sortOptions: {
    column: "name",
    direction: SortDirection.ASCENDING,
  },
};

export function selectionReducer(
  state = initialState,
  action: SelectionActionTypes
): SelectionState {
  switch (action.type) {
    case FETCHING_SELECTION: {
      return { ...state, isFetching: action.isFetching };
    }
    case FETCH_SELECTIONS: {
      return {
        ...state,
        selections: action.payload,
      };
    }
    case FETCH_SELECTION: {
      return {
        ...state,
        selection: action.payload,
      };
    }
    case CREATE_SELECTION: {
      return {
        ...state,
        selection: action.payload,
      };
    }
    case SELECTION_ERROR: {
      return {
        ...state,
        hasError: action.payload.hasError,
        errorMessage: action.payload.errorMessage,
      };
    }
    default:
      return state;
  }
}
