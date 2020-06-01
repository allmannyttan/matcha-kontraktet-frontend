import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { State } from '../../store/types'

const Hello = styled.h1`
  font-size: 40px;
`

const Name = styled.span`
  color: red;
`

const Start: React.FC<State> = ({ system }) => {
  return (
    <Hello>
      Välkommen användare: <Name>{system.username}</Name>!
    </Hello>
  )
}

const mapStateToProps = (state: State) => state

export default connect(mapStateToProps)(Start)
