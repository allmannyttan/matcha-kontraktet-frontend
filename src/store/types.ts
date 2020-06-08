import { SystemState } from './system/types'
import { SelectionState } from './selection/types'

export interface State {
  system: SystemState
  selection: SelectionState
}
