import React from "react";
import { useState } from "react";
import {
  Selection as SelectionType,
  SortDirection,
} from "../../store/selection/types";
import styled from "styled-components";
import ContractStatus from "../../components/ContractStatus";
import { format } from "date-fns";
import { Button } from "../../components/FormElements";
import {
  checkPopulationRegistraion,
  deleteSelection,
  sortSelection,
} from "../../store/selection/actions";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const List = styled.div`
  margin-top: 20px;
`;

const ListHeader = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 2fr 1fr 2fr 2fr;
  padding: 10px;
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
`;

const HeaderColumn = styled(Button)`
  border: none;
  background-color: rgb(230, 230, 230);
  color: rgb(150, 150, 150);
  font-weight: 700;
  text-align: left;
  padding-left: 3px;
  outline: none;
`;

const Contract = styled(Link)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 2fr 1fr 2fr 2fr;
  grid-column-gap: 10px;
  padding: 15px 10px;
  color: rgb(40, 40, 40);
  font-size: 12px;
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

const EmptyState = styled.div`
  margin-top: 30px;
  font-weight: 700;
`;

const Asterix = styled.div`
  color: rgb(214, 62, 62);
  margin-left: 2px;
`;

const DeleteButton = styled(Button)`
  background: rgb(245, 140, 140);
  color: rgb(214, 62, 62);
  border: 1px solid rgb(214, 62, 62);
  // margin-right: 15px;
`;

interface SelectionProps {
  selection: SelectionType;
  checkPopulationRegistraion: typeof checkPopulationRegistraion;
  deleteSelection: typeof deleteSelection;
  sortSelection: typeof sortSelection;
}

const Selection: React.FC<SelectionProps> = ({
  selection,
  deleteSelection,
  checkPopulationRegistraion,
  sortSelection,
}) => {
  const [sortOptions] = useState({
    column: "status",
    direction: SortDirection.ASCENDING,
  });

  return (
    <>
      <BackButton to="/" />
      <h1>{selection.name}</h1>
      <Header>
        <div>
          <div>
            <strong>Sökterm (hyresobjektsnr):</strong>{" "}
            {selection.selection_term}
          </div>
          <div>
            <strong>Datumintervall:</strong>{" "}
            {`${
              selection.from
                ? format(new Date(selection.from), "yyyy-MM-dd")
                : ""
            } - ${
              selection.to ? format(new Date(selection.to), "yyyy-MM-dd") : ""
            }`}
          </div>
          <div>
            <strong>Skapad av:</strong> {selection.created_by},{" "}
            {selection.created_at &&
              format(new Date(selection.created_at), "yyyy-MM-dd HH:mm")}
          </div>
          <div>
            <strong>Visar: </strong>
            {selection.contracts.length} av {selection.total_contracts}
          </div>
        </div>
        <div>
          <DeleteButton onClick={() => deleteSelection(selection.id)}>
            Ta bort urval
          </DeleteButton>
          {/* <Button onClick={() => checkPopulationRegistraion(selection.id)}>
            Gör slagning mot folkbokföring
          </Button> */}
        </div>
      </Header>

      {selection.contracts && selection.contracts.length > 0 ? (
        <List>
          <ListHeader>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("name", sortOptions, selection)}
            >
              Namn
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("street", sortOptions, selection)}
            >
              Gatuadress
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() =>
                sortSelection("contractNumber", sortOptions, selection)
              }
            >
              Avtalsnr
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("date", sortOptions, selection)}
            >
              Avtalsdatum
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("regstreet", sortOptions, selection)}
            >
              Folkbokföringsadress
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("status", sortOptions, selection)}
            >
              Status
            </HeaderColumn>
            <HeaderColumn
              as="button"
              onClick={() => sortSelection("comment", sortOptions, selection)}
            >
              Kommentar
            </HeaderColumn>

            <HeaderColumn
              as="button"
              onClick={() => sortSelection("exception", sortOptions, selection)}
            >
              Avvikelse
            </HeaderColumn>
          </ListHeader>
          {selection.contracts.map((contract: any, i: number) => (
            <Contract
              key={`contract-${i}`}
              to={`/kontrakt/${contract.id}?selectionId=${selection.id}`}
            >
              <Column>
                {contract.contract_information[0]?.name}{" "}
                {contract.contract_information.length > 1 ? (
                  <Asterix>*</Asterix>
                ) : null}
              </Column>
              <Column>{contract.contract_information[0]?.address}</Column>
              <Column>{contract.contract_id}</Column>
              <Column>
                {contract.start_date
                  ? format(new Date(contract.start_date), "yyyy-MM-dd")
                  : ""}
              </Column>
              <Column>
                {contract.population_registration_information?.[0]?.address}
              </Column>
              <Column>
                <ContractStatus status={contract.status} />
              </Column>
              <Column>{contract.comment}</Column>
              <Column>{contract.exception}</Column>
            </Contract>
          ))}
        </List>
      ) : (
        <EmptyState>Inga kontrakt matchade.</EmptyState>
      )}
    </>
  );
};

export default Selection;
