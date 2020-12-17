import { Contract } from "../store/contract/types";

export const sortByStatus = (contracts: Contract[]) => {
  const sortOrder = [
    "INVALID",
    "UNDER_INVESTIGATION",
    "VERIFIED_SUBLETTING",
    "MANUALLY_VERIFIED",
    "VERIFIED",
    null,
  ];

  return contracts.sort((a: Contract, b: Contract) => {
    return sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status);
  });
};
