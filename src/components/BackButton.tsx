import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  color: rgb(0, 0, 0);

  &:hover {
    opacity: 0.6;
  }
`;

interface BackButtonProps {
  to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  return <Button to={to}>&larr; Tillbaka</Button>;
};

export default BackButton;
