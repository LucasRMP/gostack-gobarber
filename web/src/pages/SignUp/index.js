import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

const validationSchema = yup.object().shape({
  name: yup.string('Name must be a string').required('Name is required'),
  email: yup
    .string('Email must be a string')
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

function SignUp() {
  const dispatch = useDispatch();

  const handleSubmit = data => {
    const { name, email, password } = data;
    dispatch(signUpRequest(name, email, password));
  };

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={validationSchema} noValidate>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />

        <button type="submit">Create account</button>
        <Link to="/">Alredy has an account? Sign in</Link>
      </Form>
    </>
  );
}

export default SignUp;
