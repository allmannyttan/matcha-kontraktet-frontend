import React from 'react'
import { Selection as SelectionType } from '../../store/selection/types'
import styled from 'styled-components'
import ContractStatus from '../../components/ContractStatus'
import { format } from 'date-fns'

const List = styled.ul`
  margin: 20px 0 0 0;
  padding: 0;
`

const Contract = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  font-size: 14px;

  &:nth-child(even) {
    background-color: rgb(245, 245, 245);
  }
`

const ListHeader = styled(Contract)`
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
`

const Column = styled.div`
  display: flex;
  align-items: center;
`

interface SelectionProps {
  selection: SelectionType | null
}

const Selection: React.FC<SelectionProps> = ({ selection }) => {
  const contracts = [
    {
      id: '124-abc',
      contract_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      population_registration_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      last_population_registration_lookup: new Date(),
      status: 'VERIFIED',
      comment: '',
    },
    {
      id: '124-abc',
      contract_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      population_registration_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Stigen 2',
      },
      last_population_registration_lookup: new Date(),
      status: 'INVALID',
      comment: '',
    },
    {
      id: '124-abc',
      contract_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      population_registration_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      last_population_registration_lookup: new Date(),
      status: 'MANUALLY_VERIFIED',
      comment: '',
    },
    {
      id: '124-abc',
      contract_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Vägen 1',
      },
      population_registration_information: {
        pnr: '19800101-0000',
        name: 'Kalle Ankka',
        address: 'Gatan 1',
      },
      last_population_registration_lookup: new Date(),
      status: 'UNDER_INVESTIGATION',
      comment: 'Håller på att kolla på de.',
    },
  ]

  return (
    <>
      <h1>{selection?.name}</h1>
      <div>
        <strong>Sökterm:</strong> {selection?.selection_term}
      </div>
      <div>
        <strong>Skapad av:</strong> {selection?.created_by},{' '}
        {selection?.created_at &&
          format(new Date(selection.created_at), 'yyyy-MM-dd HH:mm')}
      </div>
      <List>
        <ListHeader>
          <Column>Kontrakt</Column>
          <Column>Namn</Column>
          <Column>Gatuadress</Column>
          <Column>Syna-adress</Column>
          <Column>Status</Column>
          <Column>Kommentar</Column>
        </ListHeader>
        {contracts.map((contract: any, i: number) => (
          <Contract key={`contract-${i}`}>
            <Column>{contract.id}</Column>
            <Column>{contract.contract_information.name}</Column>
            <Column>{contract.contract_information.address}</Column>
            <Column>
              {contract.population_registration_information.address}
            </Column>
            <Column>
              <ContractStatus status={contract.status} />
            </Column>
            <Column>{contract.comment}</Column>
          </Contract>
        ))}
      </List>
    </>
  )
}

export default Selection
