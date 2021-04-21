export interface ContractState {
  isFetching: boolean;
  updateSuccess: boolean;
  contract: Contract;
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
  start_date: Date | null;
  contract_id: string;
  comment: string;
  exception: string;
}

export const FETCHING_CONTRACT = "FETCHING_CONTRACT";
export const FETCH_CONTRACT = "FETCH_CONTRACT";
export const CONTRACT_ERROR = "CONTRACT_ERROR";
export const UPDATED_CONTRACT = "UPDATED_CONTRACT";

interface FetchingContractAction {
  type: typeof FETCHING_CONTRACT;
  [payload: string]: any;
}

interface FetchContractAction {
  type: typeof FETCH_CONTRACT;
  [payload: string]: any;
}

interface ContractErrorAction {
  type: typeof CONTRACT_ERROR;
  [payload: string]: any;
}

interface UpdateContractAction {
  type: typeof UPDATED_CONTRACT;
  [payload: string]: any;
}

export type SelectionActionTypes =
  | FetchingContractAction
  | FetchContractAction
  | ContractErrorAction
  | UpdateContractAction;
