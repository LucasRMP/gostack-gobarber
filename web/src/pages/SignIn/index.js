import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';

import logo from '~/assets/images/logo.svg';

const validationSchema = yup.object().shape({
  email: yup
    .string('Email must be a string')
    .email('Email must be valid')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

function SignIn() {
  const handleSubmit = data => {
    console.tron.log(data);
  };

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={validationSchema} noValidate>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />

        <button type="submit">Login</button>
        <Link to="/register">Sign Up</Link>
      </Form>
    </>
  );
}

export default SignIn;
