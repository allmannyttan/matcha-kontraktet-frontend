import React from 'react'
import { Selection as SelectionType } from '../../store/selection/types'
import styled from 'styled-components'
import ContractStatus from '../../components/ContractStatus'
import { format } from 'date-fns'
import { Button } from '../../components/FormElements'
import { checkPopulationRegistraion } from '../../store/selection/actions'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const List = styled.ul`
  margin: 20px 0 0 0;
  padding: 0;
`

const Contract = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr 2fr;
  grid-column-gap: 10px;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  font-size: 12px;

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
  checkPopulationRegistraion: typeof checkPopulationRegistraion
}

const Selection: React.FC<SelectionProps> = ({
  selection,
  checkPopulationRegistraion,
}) => {
  return (
    <>
      <h1>{selection?.name}</h1>
      <Header>
        <div>
          <div>
            <strong>Sökterm:</strong> {selection?.selection_term}
          </div>
          <div>
            <strong>Skapad av:</strong> {selection?.created_by},{' '}
            {selection?.created_at &&
              format(new Date(selection.created_at), 'yyyy-MM-dd HH:mm')}
          </div>
        </div>
        <Button onClick={() => checkPopulationRegistraion(selection?.id)}>
          Gör slagning mot folkbokföring
        </Button>
      </Header>

      <List>
        <ListHeader>
          <Column>Namn</Column>
          <Column>Gatuadress</Column>
          <Column>Syna-adress</Column>
          <Column>Status</Column>
          <Column>Kommentar</Column>
        </ListHeader>
        {selection?.contracts.map((contract: any, i: number) => (
          <Contract key={`contract-${i}`}>
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
    </>
  )
}

export default Selection
