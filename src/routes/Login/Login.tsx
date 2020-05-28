import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useLocalStorage } from '@iteam/hooks'
import { Form, Input, Button, ErrorMessage } from '../../components/formElemts'
import styled from 'styled-components'
import { post } from '../../utils/fetch'
import history from '../../utils/history'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const FormWrapper = styled.div`
  text-align: center;
  width: 100%;
  max-width: 300px;
`

const Logo = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 30px;
`

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Obligatorisk'),
  password: Yup.string().required('Obligatorisk'),
})

const Login: React.FC = () => {
  const [, setToken] = useLocalStorage('token')

  return (
    <Wrapper>
      <FormWrapper>
        <Logo src="/logo.png" />
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (input, { setFieldError }) => {
            try {
              const response = await post('/auth/generate-token', input)

              setToken(response.token)
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

export default Login
