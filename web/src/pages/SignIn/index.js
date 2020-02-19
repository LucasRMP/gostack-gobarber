import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

const validationSchema = yup.object().shape({
  email: yup
    .string('Email must be a string')
    .email('Email must be valid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = data => {
    const { email, password } = data;
    dispatch(signInRequest(email, password));
  };

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={validationSchema} noValidate>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />

        <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <Link to="/register">Sign Up</Link>
      </Form>
    </>
  );
}

export default SignIn;
