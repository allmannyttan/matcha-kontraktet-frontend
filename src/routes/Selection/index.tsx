import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { State } from '../../store/types'
import Selection from './Selection'
import { getSelection } from '../../store/selection/actions'

interface SelectionContainerProps extends State {
  getSelection: typeof getSelection
}

const SelectionContainer: React.FC<SelectionContainerProps> = ({
  selection,
  getSelection,
}) => {
  const { selectionId } = useParams()

  useEffect(() => {
    ;(async function anyNameFunction() {
      await getSelection(selectionId)
    })()
  }, [getSelection, selectionId])

  return <Selection selection={selection.selection} />
}

const mapStateToProps = (state: State) => state

const mapDispatchToProps = (dispatch: any) => ({
  getSelection: (id: string) => dispatch(getSelection(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer)
