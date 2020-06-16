import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  Input,
  Button,
  ErrorMessage,
} from '../../components/FormElements'
import { createNewSelection } from '../../store/selection/actions'
import { SelectionState } from '../../store/selection/types'
import Loader from '../../components/Loader'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
`

const Error = styled.div`
  color: red;
  margin-bottom: 20px;
`

const CreateSelectionSchema = Yup.object().shape({
  selection_term: Yup.string().required('Obligatorisk'),
  name: Yup.string().required('Obligatorisk'),
})

interface CreateSelectionProps {
  createNewSelection: typeof createNewSelection
  selection: SelectionState
}

const CreateSelection: React.FC<CreateSelectionProps> = ({
  createNewSelection,
  selection,
}) => {
  if (selection.isFetching) {
    return (
      <LoaderWrapper>
        <Loader />
        <div>Hämtar kontrakt. Detta kan ta en liten stund.</div>
      </LoaderWrapper>
    )
  }

  return (
    <>
      <h1>Skapa nytt urval</h1>
      <Formik
        initialValues={{ selection_term: '', name: '' }}
        validationSchema={CreateSelectionSchema}
        onSubmit={async (input, { setFieldError }) => {
          await createNewSelection(input.selection_term, input.name)
        }}
      >
        <Form>
          <Input
            id="selection_term"
            name="selection_term"
            type="text"
            placeholder="Sökterm"
          />
          <ErrorMessage component="div" name="selection_term" />
          <Input id="name" name="name" type="text" placeholder="Namn" />
          <ErrorMessage component="div" name="name" />
          {selection.hasError && <Error>{selection.errorMessage}</Error>}
          <Button type="submit">Skapa</Button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateSelection
