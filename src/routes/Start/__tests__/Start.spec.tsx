import React from 'react'
import { render, screen } from '../../../utils/test-utils'
import Start from '../Start'

test('renders with button', () => {
  render(<Start />)

  expect(screen.getByText(/Skapa urval/i)).toBeInTheDocument()
})
