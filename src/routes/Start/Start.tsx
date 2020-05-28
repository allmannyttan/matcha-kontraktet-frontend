import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Hello = styled.h1`
  font-size: 40px;
`

const Name = styled.span`
  color: red;
`

const Start: React.FC = () => {
  return (
    <Wrapper>
      <Hello>
        Välkommen användare: <Name>?</Name>!
      </Hello>
    </Wrapper>
  )
}

export default Start
