
import * as yup from 'yup';
import { Formik } from 'formik';
import { Row , Col ,Form, InputGroup, Button } from "react-bootstrap";


import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  //use Dispatch
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  //what we need from userInfo we dispatch it with

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  });
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}

      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({ handleSubmit, onChange, values, touched, errors }) => (
          <Form noValidate onSubmit={ handleSubmit }>
            <Form.Group md="" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="First Name"
                value={values.name}
                onChange={(e) => setName(e.target.value)}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationFormikpassword">
              <Form.Label>password</Form.Label>
              <InputGroup hasValidation>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId="validationFormikpassword">
              <Form.Label>password</Form.Label>
              <InputGroup hasValidation>

                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <br />
            <Button type='submit' variant='primary'>
              Register
            </Button>
          </Form>

        )}
      </Formik>

      <Row className='py-3'>
        <Col>
        Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>

    </FormContainer>
  );
}

export default RegisterScreen; 