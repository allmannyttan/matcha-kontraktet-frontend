import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { State } from "../../store/types";
import Selection from "./Selection";
import {
  getSelection,
  deleteSelection,
  checkPopulationRegistraion,
} from "../../store/selection/actions";

interface SelectionContainerProps extends State {
  getSelection: typeof getSelection;
  deleteSelection: typeof deleteSelection;
  checkPopulationRegistraion: typeof checkPopulationRegistraion;
}

const SelectionContainer: React.FC<SelectionContainerProps> = ({
  selection,
  getSelection,
  deleteSelection,
  checkPopulationRegistraion,
}) => {
  const { selectionId } = useParams();

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
    />
  );
};

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: any) => ({
  getSelection: (id: string) => dispatch(getSelection(id)),
  deleteSelection: (id: string) => dispatch(deleteSelection(id)),
  checkPopulationRegistraion: (id?: string) =>
    dispatch(checkPopulationRegistraion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
