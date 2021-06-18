import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

import * as yup from "yup";
import { Formik } from "formik";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";


const RegisterScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)


  const handleChange2= (e) => {
    setName(e.target.value);
    setEmail(e.target.value);
    setPassword(e.target.value);
    setConfirmPassword(e.target.value);

  };


  const schema2 = yup.object().shape({
    name: yup.string().required("Name"),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "term must be accepted"),
  });

  //use Dispatch
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  //what we need from userInfo we dispatch it with

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const handleSubmit2 = (e) => {
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
  return (


    <div className="App">
      <h1>Sign Up</h1>
      {/* {message && <Message variant='danger'>{message}</Message>} */}

      {/* {error && <Message variant='danger'>{error}</Message>} */}
      {loading && <Loader></Loader>}
      <Formik
        validationSchema={schema2}

        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
      >
        {({ values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit2}>
            <Form.Group md="" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={values.name}
                onChange={handleChange2}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group controlId="validationFormik02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={values.email}
                onChange={handleChange2}
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>

                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={values.password}
                  onChange={handleChange2}
                  isInvalid={!!errors.password}
                  isValid={touched.username && !errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>


            <Form.Group controlId="validationFormikPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup hasValidation>

                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={values.confirmPassword}
                  onChange={handleChange2}
                  isInvalid={!!errors.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* <Form.Group>
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                id="validationFormik0"
              />
            </Form.Group> */}
            <Button type="submit" variant='info'>Submit </Button>
          </Form>
        )}
      </Formik>
      <Row className='py-3'>
        <Col>
          Have an Account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </div>
  );
}



export default RegisterScreen
