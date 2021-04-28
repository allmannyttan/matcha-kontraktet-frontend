import React from "react";
import {
  ContractState,
  ContractStatus as ContractStatuses,
} from "../../store/contract/types";
import { updateContract } from "../../store/contract/actions";
import { format } from "date-fns";
import ContractStatus, {
  translateStatus,
} from "../../components/ContractStatus";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  Label,
} from "../../components/FormElements";
import Loader from "../../components/Loader";
import BackButton from "../../components/BackButton";
import styled from "styled-components";
import { useLocation } from "react-router";
import queryString from "query-string";

const Wrapper = styled.div`
  max-width: 600px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`;

const Info = styled.div`
  margin-bottom: 10px;
`;

const Success = styled.div`
  color: rgb(36, 148, 30);
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const CreateSelectionSchema = Yup.object().shape({
  status: Yup.string().required("Obligatorisk"),
  comment: Yup.string(),
});

interface ContractProps {
  contract: ContractState;
  updateContract: typeof updateContract;
}

const Contract: React.FC<ContractProps> = ({ contract, updateContract }) => {
  const location = useLocation();
  const { selectionId } = queryString.parse(location.search);

  if (contract.isFetching) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper>
      <BackButton to={`/urval/${selectionId}`} />
      <h1>Uppdatera kontrakt</h1>
      <Info>
        <strong>Innehavare:</strong>{" "}
        {contract.contract.contract_information?.name}{" "}
        <ContractStatus status={contract.contract.status} />
      </Info>
      <Info>
        <strong>Adress:</strong>{" "}
        {contract.contract.contract_information?.address}
      </Info>
      <Info>
        <strong>Avtalsnummer:</strong> {contract.contract.contract_id}
      </Info>
      <Info>
        <strong>Datum:</strong>{" "}
        {contract.contract.start_date
          ? format(new Date(contract.contract.start_date), "yyyy-MM-dd")
          : ""}
      </Info>
      <Info>
        <strong>Folkbokföringsadress:</strong>{" "}
        {contract.contract.population_registration_information?.address}
      </Info>
      <Info>
        <strong>Avvikelse:</strong> {contract.contract.exception}
      </Info>
      <Formik
        initialValues={{
          status: contract.contract.status || "",
          comment: contract.contract.comment || "",
        }}
        validationSchema={CreateSelectionSchema}
        onSubmit={async (input) => {
          await updateContract(
            contract.contract.id,
            input.status,
            input.comment
          );
        }}
      >
        <Form>
          <Label>Status</Label>
          <Input component="select" name="status">
            {Object.keys(ContractStatuses).map((key, i) => (
              <option key={i} value={key}>
                {translateStatus(key)}
              </option>
            ))}
          </Input>
          <ErrorMessage component="div" name="status" />
          <Label>Kommentar</Label>
          <Input
            id="comment"
            name="comment"
            type="text"
            placeholder="Kommentar"
          />
          <ErrorMessage component="div" name="comment" />
          {contract.updateSuccess && <Success>Kontrakt uppdaterat</Success>}
          {contract.hasError && <Error>{contract.errorMessage}</Error>}
          <Button type="submit">Spara</Button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default Contract;
