import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Username = styled.div`
  margin-right: 10px;
`

interface AvatarProps {
  username: string
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  return (
    <Wrapper>
      <Username>{username}</Username>
      <svg
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="M9 11.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
      </svg>
    </Wrapper>
  )
}

export default Avatar
