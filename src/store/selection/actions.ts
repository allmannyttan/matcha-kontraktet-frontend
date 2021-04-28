import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  FETCH_SELECTIONS,
  FETCH_SELECTION,
  FETCHING_SELECTION,
  SELECTION_ERROR,
  SortOptions,
  SortDirection,
} from "./types";
import { get, post, del } from "../../utils/fetch";
import history from "../../utils/history";
import {
  sortByName,
  sortByStatus,
  sortByContractStreet,
  sortByRegistrationStreet,
  sortByDate,
  sortByContractNumber,
  sortByComment,
  sortByException,
} from "../../utils/contract";

export const isFetching = (isFetching: boolean) => {
  return { type: FETCHING_SELECTION, isFetching };
};

export const error = (hasError: boolean, errorMessage: string) => {
  return {
    type: SELECTION_ERROR,
    payload: {
      hasError,
      errorMessage,
    },
  };
};

export const getSelections = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true));

  try {
    const { token } = getState().system;
    const { data } = await get("/selection", token);

    dispatch({
      type: FETCH_SELECTIONS,
      payload: data,
    });

    dispatch(isFetching(false));
  } catch (err) {
    // TODO: show error to user
    console.log(err);
    dispatch(isFetching(false));
  }
};

export const getSelection = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true));

  try {
    const { token } = getState().system;
    const { data } = await get(`/selection/${id}`, token);
    const contracts = await get(`/selection/${id}/contracts`, token);

    data.contracts = sortByStatus(contracts.data, SortDirection.ASCENDING);

    dispatch({
      type: FETCH_SELECTION,
      payload: data,
    });

    dispatch(isFetching(false));
  } catch (err) {
    // TODO: show error to user
    console.log(err);
    dispatch(isFetching(false));
  }
};

export const createNewSelection = (
  selection_term: string | null,
  name: string,
  from: Date | null,
  to: Date | null
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
  dispatch(error(false, ""));
  dispatch(isFetching(true));

  try {
    const { token } = getState().system;
    const newSelection = await post(
      `/selection`,
      {
        selection_term: selection_term || undefined,
        name,
        from: from ? new Date(from).toISOString() : undefined,
        to: to ? new Date(to).toISOString() : undefined,
      },
      token
    );

    await get(`/selection/${newSelection.data.id}/fetch-contracts`, token);

    const { data } = await get("/selection", token);

    dispatch({
      type: FETCH_SELECTIONS,
      payload: data,
    });

    dispatch(isFetching(false));

    history.push(`/urval/${newSelection.data.id}`);
  } catch (err) {
    // TODO: show error to user
    console.log(err);
    dispatch(isFetching(false));
    dispatch(error(true, "Något gick fel. Prova igen."));
  }
};

export const checkPopulationRegistraion = (id?: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true));

  if (!id) {
    return;
  }

  try {
    const { token } = getState().system;
    const { selection } = getState().selection;
    await get(`/selection/${id}/sync-population-registration`, token);
    const { data } = await get(`/selection/${id}/contracts`, token);

    selection.contracts = sortByStatus(data, SortDirection.ASCENDING);

    dispatch({
      type: FETCH_SELECTION,
      payload: selection,
    });

    dispatch(isFetching(false));
  } catch (err) {
    // TODO: show error to user
    console.log(err);
  }
};

export const deleteSelection = (id: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: any
) => {
  dispatch(isFetching(true));

  try {
    const { token } = getState().system;
    await del(`/selection/${id}`, token);
    const { data } = await get("/selection", token);

    dispatch({
      type: FETCH_SELECTIONS,
      payload: data,
    });

    history.push("/");

    dispatch(isFetching(false));
  } catch (err) {
    // TODO: show error to user
    console.log(err);
    dispatch(isFetching(false));
  }
};

export const sortSelection = (
  newSortColumn: string,
  sortOptions: SortOptions,
  data: any
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
  if (sortOptions.column === newSortColumn) {
    // If same column, toggle direction
    sortOptions.direction =
      sortOptions.direction === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING;
  } else {
    // If new column, set ascending
    sortOptions.direction = SortDirection.ASCENDING;
  }
  sortOptions.column = newSortColumn;

  if (sortOptions.column === "name") {
    data.contracts = sortByName(data.contracts, sortOptions.direction);
  }

  if (sortOptions.column === "street") {
    data.contracts = sortByContractStreet(
      data.contracts,
      sortOptions.direction
    );
  }

  if (sortOptions.column === "regstreet") {
    data.contracts = sortByRegistrationStreet(
      data.contracts,
      sortOptions.direction
    );
  }

  if (sortOptions.column === "date") {
    data.contracts = sortByDate(data.contracts, sortOptions.direction);
  }

  if (sortOptions.column === "contractNumber") {
    data.contracts = sortByContractNumber(
      data.contracts,
      sortOptions.direction
    );
  }

  if (sortOptions.column === "status") {
    data.contracts = sortByStatus(data.contracts, sortOptions.direction);
  }

  if (sortOptions.column === "comment") {
    data.contracts = sortByComment(data.contracts, sortOptions.direction);
  }

  if (sortOptions.column === "exception") {
    data.contracts = sortByException(data.contracts, sortOptions.direction);
  }

  dispatch({
    type: FETCH_SELECTION,
    payload: data,
  });
};
