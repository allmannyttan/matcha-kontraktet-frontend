import React from 'react'
import { Selection } from '../../store/selection/types'
import SelectionListItem from './SelectionListItem'
import styled from 'styled-components'

const Header = styled.div`
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 10px;
`

interface SelectionListProps {
  selections: Selection[]
}

const SelectionList: React.FC<SelectionListProps> = ({ selections }) => {
  return (
    <>
      <Header>
        <div>Namn</div>
        <div>Senaste körningen mot syna</div>
        <div>Skapad av</div>
        <div></div>
      </Header>
      {selections.map((selection: Selection, i: number) => (
        <SelectionListItem key={`selection-${i}`} selection={selection} />
      ))}
    </>
  )
}

export default SelectionList
