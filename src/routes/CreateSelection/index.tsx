import React from 'react'
import { connect } from 'react-redux'
import { createNewSelection } from '../../store/selection/actions'
import CreateSelection from './CreateSelection'

interface CreateSelectionContainerProps {
  createNewSelection: typeof createNewSelection
}

const CreateSelectionContainer: React.FC<CreateSelectionContainerProps> = ({
  createNewSelection,
}) => {
  return <CreateSelection createNewSelection={createNewSelection} />
}

const mapDispatchToProps = (dispatch: any) => ({
  createNewSelection: (selection_term: string, name: string) =>
    dispatch(createNewSelection(selection_term, name)),
})

export default connect(null, mapDispatchToProps)(CreateSelectionContainer)
