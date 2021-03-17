import React from "react";
import { Selection } from "../../store/selection/types";
import styled from "styled-components";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:nth-child(even) {
    background-color: rgb(245, 245, 245);
  }

  &:hover {
    opacity: 0.6;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

interface SelectionListItemProps {
  selection: Selection;
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({ selection }) => {
  return (
    <Wrapper to={`/urval/${selection.id}`}>
      <Column>{selection.name}</Column>
      <Column>{selection.selection_term}</Column>
      <Column>
        {selection.last_population_registration_lookup &&
          format(
            new Date(selection.last_population_registration_lookup),
            "yyyy-MM-dd HH:mm"
          )}
      </Column>
      <Column>{selection.created_by}</Column>
    </Wrapper>
  );
};

export default SelectionListItem;
