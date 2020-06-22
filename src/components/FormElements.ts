import styled from 'styled-components'
import {
  Field,
  Form as FormikForm,
  ErrorMessage as FormikErrorMessage,
} from 'formik'
import { Link as RouterLink } from 'react-router-dom'

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
`

export const Input = styled(Field)`
  padding: 15px 10px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin-bottom: 20px;
`

export const Button = styled.button`
  color: #ffffff;
  background-color: #2696a8;
  border: 1px solid #218393;
  padding: 15px;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

export const SecondaryButton = styled(Button)`
  color: #000000;
  background-color: #dddddd;
  border-color: #cccccc;
`

export const LinkButton = styled(RouterLink)`
  color: #ffffff;
  background-color: #2696a8;
  border: 1px solid #218393;
  padding: 15px;
  font-size: 14px;
  text-decoration: none;
`

export const SecondarLinkButton = styled(LinkButton)`
  color: #000000;
  background-color: #dddddd;
  border-color: #cccccc;
`

export const ErrorMessage = styled(FormikErrorMessage)`
  color: red;
  text-align: left;
  margin-bottom: 20px;
`

export const Link = styled.a`
  display: block;
  cursor: pointer;
  color: #1c1c1c;

  &:hover {
    opacity: 0.7;
  }
`

export const Label = styled.label`
  font-weight: 700;
  margin-bottom: 5px;
`
