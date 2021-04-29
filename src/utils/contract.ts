import { Contract } from "../store/contract/types";
import { SortDirection } from "../store/selection/types";

export const sortByStatus = (
  contracts: Contract[],
  direction: SortDirection
) => {
  const sortOrder = [
    "INVALID",
    "UNDER_INVESTIGATION",
    "VERIFIED_SUBLETTING",
    "MANUALLY_VERIFIED",
    "VERIFIED",
    null,
  ];

  return contracts.sort((a: Contract, b: Contract) => {
    return direction === SortDirection.ASCENDING
      ? sortOrder.indexOf(a.status) - sortOrder.indexOf(b.status)
      : sortOrder.indexOf(b.status) - sortOrder.indexOf(a.status);
  });
};

export const sortByDate = (contracts: Contract[], direction: SortDirection) => {
  return contracts.sort((a, b) =>
    direction === SortDirection.ASCENDING
      ? getTime(a.start_date) - getTime(b.start_date)
      : getTime(b.start_date) - getTime(a.start_date)
  );
};

const getTime = (date?: any): number => (date ? new Date(date).getTime() : 0);

/**
 * Does a best-effort transformation of "Firstname Lastname" into "Lastname Firstname" for
 * alphabetical sort. Will likely have problems with multiple first names and last names
 * separated by strings.
 */
const normalizeName = (name: string) => {
  const nameParts = name.split(" ");
  const lastNameCount = Math.max(2, nameParts.length - 1);

  const lastNames = nameParts.slice(lastNameCount - 1, nameParts.length);
  const firstNames = nameParts.slice(0, lastNameCount - 1);

  const normalizedName = lastNames.join(" ") + ", " + firstNames.join(" ");

  return normalizedName;
};

export const sortByName = (contracts: Contract[], direction: SortDirection) => {
  if (direction === SortDirection.ASCENDING) {
    return contracts.sort((a: Contract, b: Contract) =>
      normalizeName(a.contract_information[0]?.name).localeCompare(
        normalizeName(b.contract_information[0]?.name)
      )
    );
  } else {
    return contracts.sort((a: Contract, b: Contract) =>
      normalizeName(b.contract_information[0]?.name).localeCompare(
        normalizeName(a.contract_information[0]?.name)
      )
    );
  }
};

export const sortByContractStreet = (
  contracts: Contract[],
  direction: SortDirection
) => {
  return contracts.sort((a: Contract, b: Contract) =>
    direction === SortDirection.ASCENDING
      ? a.contract_information[0]?.address.localeCompare(
          b.contract_information[0]?.address
        )
      : b.contract_information[0]?.address.localeCompare(
          a.contract_information[0]?.address
        )
  );
};

export const sortByRegistrationStreet = (
  contracts: Contract[],
  direction: SortDirection
) => {
  return contracts.sort((a: Contract, b: Contract) =>
    direction === SortDirection.ASCENDING
      ? a.population_registration_information[0]?.address?.localeCompare(
          b.population_registration_information[0]?.address
        )
      : b.population_registration_information[0]?.address?.localeCompare(
          a.population_registration_information[0]?.address
        )
  );
};

export const sortByContractNumber = (
  contracts: Contract[],
  direction: SortDirection
) => {
  return contracts.sort((a: Contract, b: Contract) =>
    direction === SortDirection.ASCENDING
      ? a.contract_id.localeCompare(b.contract_id)
      : b.contract_id.localeCompare(a.contract_id)
  );
};

export const sortByComment = (
  contracts: Contract[],
  direction: SortDirection
) => {
  return contracts.sort((a: Contract, b: Contract) =>
    direction === SortDirection.ASCENDING
      ? a.comment?.localeCompare(b.comment)
      : b.comment?.localeCompare(a.comment)
  );
};

export const sortByException = (
  contracts: Contract[],
  direction: SortDirection
) => {
  return contracts.sort((a: Contract, b: Contract) => {
    if (!a.exception) return 1;
    if (!b.exception) return -1;
    return direction === SortDirection.ASCENDING
      ? a.exception?.localeCompare(b.exception)
      : b.exception?.localeCompare(a.exception);
  });
};
