import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { State } from "../../store/types";
import Selection from "./Selection";
import {
  getSelection,
  deleteSelection,
  checkPopulationRegistraion,
  sortSelection,
} from "../../store/selection/actions";
import { SortOptions } from "../../store/selection/types";

interface SelectionContainerProps extends State {
  getSelection: typeof getSelection;
  deleteSelection: typeof deleteSelection;
  sortSelection: typeof sortSelection;
  checkPopulationRegistraion: typeof checkPopulationRegistraion;
}

const SelectionContainer: React.FC<SelectionContainerProps> = ({
  selection,
  getSelection,
  deleteSelection,
  sortSelection,
  checkPopulationRegistraion,
}) => {
  const { selectionId } = useParams<{ selectionId: string }>();

  useEffect(() => {
    (async function anyNameFunction() {
      await getSelection(selectionId);
    })();
  }, [getSelection, selectionId]);

  return (
    <Selection
      selection={selection.selection}
      deleteSelection={deleteSelection}
      checkPopulationRegistraion={checkPopulationRegistraion}
      sortSelection={sortSelection}
    />
  );
};

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: any) => ({
  getSelection: (id: string) => dispatch(getSelection(id)),
  deleteSelection: (id: string) => dispatch(deleteSelection(id)),
  checkPopulationRegistraion: (id?: string) =>
    dispatch(checkPopulationRegistraion(id)),
  sortSelection: (id: string, sortOptions: SortOptions, data: any) =>
    dispatch(sortSelection(id, sortOptions, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
