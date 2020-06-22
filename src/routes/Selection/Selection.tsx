import React from 'react'
import { Selection as SelectionType } from '../../store/selection/types'
import styled from 'styled-components'
import ContractStatus from '../../components/ContractStatus'
import { format } from 'date-fns'
import { Button } from '../../components/FormElements'
import { checkPopulationRegistraion } from '../../store/selection/actions'
import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const List = styled.div`
  margin-top: 20px;
`

const ListHeader = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 10px;
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
`

const Contract = styled(Link)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  grid-column-gap: 10px;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  font-size: 12px;
  text-decoration: none;

  &:nth-child(even) {
    background-color: rgb(245, 245, 245);
  }

  &:hover {
    opacity: 0.6;
  }
`

const Column = styled.div`
  display: flex;
  align-items: center;
`

const EmptyState = styled.div`
  margin-top: 30px;
  font-weight: 700;
`

interface SelectionProps {
  selection: SelectionType
  checkPopulationRegistraion: typeof checkPopulationRegistraion
}

const Selection: React.FC<SelectionProps> = ({
  selection,
  checkPopulationRegistraion,
}) => {
  return (
    <>
      <BackButton />
      <h1>{selection.name}</h1>
      <Header>
        <div>
          <div>
            <strong>Sökterm:</strong> {selection.selection_term}
          </div>
          <div>
            <strong>Skapad av:</strong> {selection.created_by},{' '}
            {selection.created_at &&
              format(new Date(selection.created_at), 'yyyy-MM-dd HH:mm')}
          </div>
        </div>
        <Button onClick={() => checkPopulationRegistraion(selection.id)}>
          Gör slagning mot folkbokföring
        </Button>
      </Header>

      {selection.contracts.length > 0 ? (
        <List>
          <ListHeader>
            <Column>Namn</Column>
            <Column>Gatuadress</Column>
            <Column>Syna-adress</Column>
            <Column>Status</Column>
            <Column>Kommentar</Column>
          </ListHeader>
          {selection.contracts.map((contract: any, i: number) => (
            <Contract key={`contract-${i}`} to={`/kontrakt/${contract.id}`}>
              <Column>{contract.contract_information.name}</Column>
              <Column>{contract.contract_information?.address}</Column>
              <Column>
                {contract.population_registration_information?.address}
              </Column>
              <Column>
                <ContractStatus status={contract.status} />
              </Column>
              <Column>{contract.comment}</Column>
            </Contract>
          ))}
        </List>
      ) : (
        <EmptyState>Inga kontrakt matchade.</EmptyState>
      )}
    </>
  )
}

export default Selection
