import React from "react";
import styled from "styled-components";
import { logout } from "../../store/system/actions";
import Avatar from "../Avatar";
import { Link } from "../FormElements";
import { Link as RouterLink } from "react-router-dom";

const { REACT_APP_API_BASE_URL, REACT_APP_LOGO } = process.env;

const Wrapper = styled.header`
  padding: 15px;
  display: grid;
  grid-template-columns: 20px 1fr minmax(auto, 960px) 1fr 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.025);
  border-bottom: 1px solid #f0f0f5;
`;

const Content = styled.div`
  display: flex;
  grid-column: 3/4;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divder = styled.span`
  margin: 0 10px;
`;
const logo = `/logo-${REACT_APP_LOGO?.toLocaleLowerCase() || "vh"}.png`;

interface HeaderProps {
  logout: typeof logout;
  loggedIn: boolean;
  username: string;
  token: string;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, logout, username }) => {
  return (
    <Wrapper>
      <Content>
        <RouterLink to="/">
          <Logo src={logo} />
        </RouterLink>
        {loggedIn && (
          <Nav>
            <Avatar username={username} />
            <Divder>|</Divder>
            <Link onClick={logout}>Logga ut</Link>
          </Nav>
        )}
      </Content>
    </Wrapper>
  );
};

export default Header;
