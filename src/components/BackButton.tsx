import React from 'react'
import styled from 'styled-components'
import history from '../utils/history'

const Button = styled.a`
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.6;
  }
`

const BackButton: React.FC = () => {
  return <Button onClick={history.goBack}>&larr; Tillbaka</Button>
}

export default BackButton
