export interface SelectionState {
  isFetching: boolean
  selections: Selection[]
}

export enum ContractStatus {
  VERIFIED = 'VERIFIED',
  INVALID = 'INVALID',
  MANUALLY_VERIFIED = 'MANUALLY_VERIFIED',
  UNDER_INVESTIGATION = 'UNDER_INVESTIGATION',
}

export interface ContractInformation {
  pnr: string
  name: string
  address: string
}

export interface PopulationRegistrationInformation {
  pnr: string
  name: string
  address: string
}

export interface Contract {
  id: string
  contract_information: ContractInformation
  population_registration_information: PopulationRegistrationInformation
  last_population_registration_lookup: Date | null
  status: ContractStatus
  comment: string
}

export interface Selection {
  id: string
  name: string
  selection_term: string
  contracts: Contract[]
  last_population_registration_lookup: Date | null
  created_by: string
  created_at: Date
}

export const FETCH_SELECTIONS = 'FETCH_SELECTIONS'
export const FETCHING_SELECTIONS = 'FETCHING_SELECTIONS'

interface FetchSelectionsAction {
  type: typeof FETCH_SELECTIONS
  [payload: string]: any
}

interface FetchingSelectionsAction {
  type: typeof FETCHING_SELECTIONS
  [payload: string]: any
}

export type SelectionActionTypes =
  | FetchSelectionsAction
  | FetchingSelectionsAction
