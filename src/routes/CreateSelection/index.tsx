import React from "react";
import { connect } from "react-redux";
import { createNewSelection } from "../../store/selection/actions";
import CreateSelection from "./CreateSelection";
import { State } from "../../store/types";

interface CreateSelectionContainerProps extends State {
  createNewSelection: typeof createNewSelection;
}

const CreateSelectionContainer: React.FC<CreateSelectionContainerProps> = ({
  createNewSelection,
  selection,
}) => {
  return (
    <CreateSelection
      createNewSelection={createNewSelection}
      selection={selection}
    />
  );
};

const mapStateToProps = (state: State) => state;

const mapDispatchToProps = (dispatch: any) => ({
  createNewSelection: (
    selection_term: string | null,
    name: string,
    from: Date | null,
    to: Date | null
  ) => dispatch(createNewSelection(selection_term, name, from, to)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSelectionContainer);
