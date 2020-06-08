import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { State } from '../../store/types'
import SelectionList from './SelectionList'
import { getSelections } from '../../store/selection/actions'

interface SelectionListContainerProps extends State {
  getSelections: typeof getSelections
}

const SelectionListContainer: React.FC<SelectionListContainerProps> = ({
  selection,
  getSelections,
}) => {
  useEffect(() => {
    ;(async function anyNameFunction() {
      await getSelections()
    })()
  }, [getSelections])

  return <SelectionList {...selection} />
}

const mapStateToProps = (state: State) => state

const mapDispatchToProps = (dispatch: any) => ({
  getSelections: () => dispatch(getSelections()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionListContainer)
