import { Contract, ContractStatus } from '../store/contract/types'

export const sortByStatus = (contracts: Contract[]) => {
  const sortOrder = [
    'INVALID',
    'UNDER_INVESTIGATION',
    'MANUALLY_VERIFIED',
    'VERIFIED',
  ]

  return contracts.sort((a: Contract, b: Contract) => {
    if (!a.status) a.status = ContractStatus.VERIFIED
    if (!b.status) b.status = ContractStatus.VERIFIED

    return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status)
  })
}
