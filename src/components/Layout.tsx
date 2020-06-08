import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr minmax(auto, 960px) 1fr 20px;
`

const Content = styled.div`
  grid-column: 3/4;
  margin-top: 30px;
`

const Layout: React.FC = (props) => {
  return (
    <Wrapper>
      <Content>{props.children}</Content>
    </Wrapper>
  )
}

export default Layout
