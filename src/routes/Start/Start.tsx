import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocalStorage } from '@iteam/hooks'
import jwtDecode from 'jwt-decode'

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
  const [token] = useLocalStorage('token')
  const [username, setUsername] = useState('')

  useEffect(() => {
    const { username } = jwtDecode(token)
    setUsername(username)
  })

  return (
    <Wrapper>
      <Hello>
        Välkommen användare: <Name>{username}</Name>!
      </Hello>
    </Wrapper>
  )
}

export default Start
