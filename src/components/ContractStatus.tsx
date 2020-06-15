import React from 'react'
import styled from 'styled-components'

const StatusBar = styled.span`
  background: rgb(189, 211, 191);
  color: rgb(36, 148, 30);
  font-weight: 700;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 12px;
`

const StatusBarInvalid = styled(StatusBar)`
  background: rgb(245, 140, 140);
  color: rgb(214, 62, 62);
`

const StatusBarInvestigation = styled(StatusBar)`
  background: rgb(255, 240, 206);
  color: rgb(253, 166, 8);
`

interface ContractStatusProps {
  status: string
}

const translateStatus = (status: string): string => {
  switch (status) {
    case 'INVALID':
      return 'Icke godkänd'
    case 'MANUALLY_VERIFIED':
      return 'Manuellt godkänd'
    case 'UNDER_INVESTIGATION':
      return 'Under utredning'
    default:
      return 'Godkänd'
  }
}

const ContractStatus: React.FC<ContractStatusProps> = ({ status }) => {
  const tanslatedStatus = translateStatus(status)

  if (status === 'INVALID') {
    return <StatusBarInvalid>{tanslatedStatus}</StatusBarInvalid>
  }

  if (status === 'UNDER_INVESTIGATION') {
    return <StatusBarInvestigation>{tanslatedStatus}</StatusBarInvestigation>
  }

  return <StatusBar>{tanslatedStatus}</StatusBar>
}

export default ContractStatus
