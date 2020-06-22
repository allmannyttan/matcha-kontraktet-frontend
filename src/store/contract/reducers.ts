import {
  FETCHING_CONTRACT,
  FETCH_CONTRACT,
  CONTRACT_ERROR,
  UPDATED_CONTRACT,
  ContractState,
  SelectionActionTypes,
  ContractStatus,
} from './types'

const initialState: ContractState = {
  isFetching: false,
  updateSuccess: false,
  contract: {
    id: '',
    contract_information: {
      pnr: '',
      name: '',
      address: '',
    },
    population_registration_information: {
      pnr: '',
      name: '',
      address: '',
    },
    last_population_registration_lookup: null,
    status: ContractStatus.VERIFIED,
    comment: '',
  },
  hasError: false,
  errorMessage: '',
}

export function contractReducer(
  state = initialState,
  action: SelectionActionTypes
): ContractState {
  switch (action.type) {
    case FETCHING_CONTRACT: {
      return { ...state, isFetching: action.isFetching }
    }
    case FETCH_CONTRACT: {
      return {
        ...state,
        contract: action.payload,
      }
    }
    case CONTRACT_ERROR: {
      return {
        ...state,
        hasError: action.payload.hasError,
        errorMessage: action.payload.errorMessage,
      }
    }
    case UPDATED_CONTRACT: {
      return {
        ...state,
        updateSuccess: action.updateSuccess,
      }
    }
    default:
      return state
  }
}
