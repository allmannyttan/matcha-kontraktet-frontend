import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  Input,
  Button,
  ErrorMessage,
  SecondarLinkButton,
} from '../../components/FormElements'
import { createNewSelection } from '../../store/selection/actions'
import { SelectionState } from '../../store/selection/types'
import Loader from '../../components/Loader'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 400px) 1fr;
`

const FormWrapper = styled.div`
  grid-column: 2/3;
  text-align: center;
`

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    width: 100%;
  }

  a {
    width: 100%;
    text-align: center;
    margin-left: 15px;
  }
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
    <Wrapper>
      <FormWrapper>
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
            <ButtonWrapper>
              <Button type="submit">Skapa</Button>
              <SecondarLinkButton to="/">Avbryt</SecondarLinkButton>
            </ButtonWrapper>
          </Form>
        </Formik>
      </FormWrapper>
    </Wrapper>
  )
}

export default CreateSelection
