import React from "react";
import { ContractState } from "../../store/contract/types";
import { updateContract } from "../../store/contract/actions";
import ContractStatus from "../../components/ContractStatus";
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
        <strong>Kontrakt innehavare:</strong>{" "}
        {contract.contract.contract_information?.name}{" "}
        <ContractStatus status={contract.contract.status} />
      </Info>
      <Info>
        <strong>Kontraktadress:</strong>{" "}
        {contract.contract.contract_information?.address}
      </Info>
      <Info>
        <strong>Folkbokföringsadress:</strong>{" "}
        {contract.contract.population_registration_information?.address}
      </Info>
      <Formik
        initialValues={{
          status: contract.contract.status,
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
            <option value="VERIFIED">Verifierad</option>
            <option value="INVALID">Kontrollera</option>
            <option value="MANUALLY_VERIFIED">Manuellt godkänd</option>
            <option value="UNDER_INVESTIGATION">Under utredning</option>
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
