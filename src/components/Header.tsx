import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { State } from '../store/types'
import { logout } from '../store/system/actions'

const Wrapper = styled.header`
  padding: 30px;
  display: grid;
  grid-template-columns: 20px 1fr minmax(auto, 960px) 1fr 20px;
`

const Content = styled.div`
  display: flex;
  grid-column: 3/4;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.img`
  width: 200px;
`

const LogOut = styled.a`
  display: block;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

interface HeaderProps extends State {
  logout: typeof logout
}

const Header: React.FC<HeaderProps> = ({ system, logout }) => {
  return (
    <Wrapper>
      <Content>
        <Logo src="/logo.png" />
        {system.loggedIn && <LogOut onClick={logout}>Logga ut</LogOut>}
      </Content>
    </Wrapper>
  )
}

const mapStateToProps = (state: State) => state

export default connect(mapStateToProps, { logout })(Header)
