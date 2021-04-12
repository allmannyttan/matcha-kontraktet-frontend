import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Form,
  Input,
  Button,
  ErrorMessage,
} from '../../components/FormElements'
import styled from 'styled-components'
import { post } from '../../utils/fetch'
import history from '../../utils/history'
import { connect } from 'react-redux'
import { login } from '../../store/system/actions'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const FormWrapper = styled.div`
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin-top: 30px;
`

const H1 = styled.h1`
  font-size: 24px;
`

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Obligatorisk'),
  password: Yup.string().required('Obligatorisk'),
})

interface LoginProps {
  login: typeof login
}

const Login: React.FC<LoginProps> = ({ login }) => {
  return (
    <Wrapper>
      <FormWrapper>
        <H1>Log in</H1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (input, { setFieldError }) => {
            try {
              const response = await post('/auth/generate-token', input)

              login({
                token: response.token,
              })
              history.push('/')
            } catch (err) {
              setFieldError('password', 'Inloggning misslyckades')
            }
          }}
        >
          <Form>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Användarnamn"
            />
            <ErrorMessage component="div" name="username" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Lösenord"
            />
            <ErrorMessage component="div" name="password" />
            <Button type="submit">Logga in</Button>
          </Form>
        </Formik>
      </FormWrapper>
    </Wrapper>
  )
}

export default connect(null, { login })(Login)
