import { SystemState } from './system/types'
import { SelectionState } from './selection/types'
import { ContractState } from './contract/types'

export interface State {
  system: SystemState
  selection: SelectionState
  contract: ContractState
}
