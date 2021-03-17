import React from "react";
import { Selection } from "../../store/selection/types";
import SelectionListItem from "./SelectionListItem";
import styled from "styled-components";

const Header = styled.div`
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  padding: 10px;
`;

interface SelectionListProps {
  selections: Selection[];
}

const SelectionList: React.FC<SelectionListProps> = ({ selections }) => {
  return (
    <>
      <Header>
        <div>Urvalsnamn</div>
        <div>Sökterm (del av hyresobjektid)</div>
        <div>Senaste slagning mot folkbokföring</div>
        <div>Skapad av</div>
      </Header>
      {selections.map((selection: Selection, i: number) => (
        <SelectionListItem key={`selection-${i}`} selection={selection} />
      ))}
    </>
  );
};

export default SelectionList;
