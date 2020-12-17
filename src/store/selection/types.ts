export interface SelectionState {
  isFetching: boolean;
  selections: Selection[];
  selection: Selection;
  hasError: boolean;
  errorMessage: string;
}

export enum ContractStatus {
  VERIFIED = "VERIFIED",
  INVALID = "INVALID",
  VERIFIED_SUBLETTING = "VERIFIED_SUBLETTING",
  MANUALLY_VERIFIED = "MANUALLY_VERIFIED",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
}

export interface ContractInformation {
  pnr: string;
  name: string;
  address: string;
}

export interface PopulationRegistrationInformation {
  pnr: string;
  name: string;
  address: string;
}

export interface Contract {
  id: string;
  contract_information: ContractInformation;
  population_registration_information: PopulationRegistrationInformation;
  last_population_registration_lookup: Date | null;
  status: ContractStatus;
  comment: string;
}

export interface Selection {
  id: string;
  name: string;
  selection_term: string;
  contracts: Contract[];
  last_population_registration_lookup: Date | null;
  created_by: string;
  created_at: Date;
}

export const FETCH_SELECTIONS = "FETCH_SELECTIONS";
export const FETCH_SELECTION = "FETCH_SELECTION";
export const FETCHING_SELECTION = "FETCHING_SELECTION";
export const CREATE_SELECTION = "CREATE_SELECTION";
export const SELECTION_ERROR = "SELECTION_ERROR";

interface FetchSelectionsAction {
  type: typeof FETCH_SELECTIONS;
  [payload: string]: any;
}

interface FetchSelectionAction {
  type: typeof FETCH_SELECTION;
  [payload: string]: any;
}

interface FetchingSelectionAction {
  type: typeof FETCHING_SELECTION;
  [payload: string]: any;
}

interface CreateSelectionAction {
  type: typeof CREATE_SELECTION;
  [payload: string]: any;
}

interface SelectionErrorAction {
  type: typeof SELECTION_ERROR;
  [payload: string]: any;
}

export type SelectionActionTypes =
  | FetchSelectionsAction
  | FetchSelectionAction
  | FetchingSelectionAction
  | CreateSelectionAction
  | SelectionErrorAction;
