import React from 'react';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';

function Login() {
  return (
    <div>
      <h1>Signup Page</h1>
      <BasicForm />
    </div>
  );
}

const BasicForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values, actions) => {
      fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => console.log(data));

      actions.setSubmitting(false);
    }}
    render={props => (
      <Container>
        <Form onSubmit={props.handleSubmit}>
          <Form.Input
            type='text'
            placeholder='Email'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name='email'
          />
          {props.errors.email && <div id='feedback'>{props.errors.email}</div>}

          <Form.Input
            type='password'
            placeholder='Password'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
            name='password'
          />
          {props.errors.password && <div id='feedback'>{props.errors.password}</div>}
          <Button primary type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    )}
  />
);

export default Login;
