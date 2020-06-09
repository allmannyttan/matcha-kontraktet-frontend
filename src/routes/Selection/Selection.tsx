import React from 'react'
import { Selection as SelectionType } from '../../store/selection/types'

interface SelectionProps {
  selection: SelectionType | null
}

const Selection: React.FC<SelectionProps> = ({ selection }) => {
  return (
    <>
      <h1>{selection?.selection_term}</h1>
      <p>id: {selection?.id}</p>
      <p>created by: {selection?.created_by}</p>
      <p>created at: {selection?.created_at}</p>
    </>
  )
}

export default Selection
