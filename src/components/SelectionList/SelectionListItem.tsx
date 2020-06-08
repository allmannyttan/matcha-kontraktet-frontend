import React from 'react'
import { Selection } from '../../store/selection/types'
import styled from 'styled-components'
import { format } from 'date-fns'

const Wrapper = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  transition: all 0.1s ease-in-out;

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

const Edit = styled(Column)`
  text-align: right;
  justify-content: flex-end;
`

const EditButton = styled.svg`
  height: 25px;
  fill: rgb(150, 150, 150);
  cursor: pointer;
`

interface SelectionListItemProps {
  selection: Selection
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({ selection }) => {
  return (
    <Wrapper>
      <Column>{selection.selection_term}</Column>
      <Column>
        {selection.last_population_registration_lookup &&
          format(
            new Date(selection.last_population_registration_lookup),
            'yyyy-MM-dd HH:mm'
          )}
      </Column>
      <Column>{selection.created_by}</Column>
      <Edit>
        <EditButton
          viewBox="0 0 515.555 515.555"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
          <path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
          <path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0" />
        </EditButton>
      </Edit>
    </Wrapper>
  )
}

export default SelectionListItem
