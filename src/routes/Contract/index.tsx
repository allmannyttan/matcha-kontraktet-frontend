import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getContract, updateContract } from "../../store/contract/actions";
import Contract from "./Contract";
import { State } from "../../store/types";
import { useParams } from "react-router-dom";

interface ContractContainerProps extends State {
  getContract: typeof getContract;
  updateContract: typeof updateContract;
}

const ContractContainer: React.FC<ContractContainerProps> = ({
  contract,
  getContract,
  updateContract,
}) => {
  const { contractId } = useParams<{ contractId: string }>();

  useEffect(() => {
    (async function anyNameFunction() {
      await getContract(contractId);
    })();
  }, [getContract, contractId]);

  return <Contract updateContract={updateContract} contract={contract} />;
};

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: any) => ({
  getContract: (id: string) => dispatch(getContract(id)),
  updateContract: (id: string, status: string, comment: string) =>
    dispatch(updateContract(id, status, comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractContainer);
