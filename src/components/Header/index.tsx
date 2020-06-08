import React from 'react'
import { connect } from 'react-redux'
import { State } from '../../store/types'
import { logout } from '../../store/system/actions'
import Header from './Header'

interface HeaderContainerProps extends State {
  logout: typeof logout
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  system,
  logout,
}) => <Header logout={logout} {...system} />

const mapStateToProps = (state: State) => state

export default connect(mapStateToProps, { logout })(HeaderContainer)
