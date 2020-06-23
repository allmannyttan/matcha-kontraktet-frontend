import React from 'react'
import { render, screen } from '../../../utils/test-utils'
import Start from '../Start'

test('renders with content text', () => {
  render(<Start />)

  expect(screen.getByText(/Urval/i)).toBeInTheDocument()
})
