import React from 'react'
import SelectionList from '../../components/SelectionList'
import { LinkButton } from '../../components/FormElements'
import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const H1 = styled.h1`
  margin: 0;
`

const Start: React.FC = () => {
  return (
    <>
      <Header>
        <H1>Urval</H1>
        <LinkButton to="/skapa-urval">Skapa urval</LinkButton>
      </Header>
      <SelectionList />
    </>
  )
}

export default Start
