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
import history from '../../utils/history'

const CreateSelectionSchema = Yup.object().shape({
  selection_term: Yup.string().required('Obligatorisk'),
  name: Yup.string().required('Obligatorisk'),
})

interface CreateSelectionProps {
  createNewSelection: typeof createNewSelection
}

const CreateSelection: React.FC<CreateSelectionProps> = ({
  createNewSelection,
}) => {
  return (
    <>
      <h1>Skapa nytt urval</h1>
      <Formik
        initialValues={{ selection_term: '', name: '' }}
        validationSchema={CreateSelectionSchema}
        onSubmit={async (input) => {
          await createNewSelection(input.selection_term, input.name)
          history.push('/')
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
          <Button type="submit">Skapa</Button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateSelection
