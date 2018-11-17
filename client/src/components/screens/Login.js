import React from 'react';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <BasicForm />
    </div>
  );
}

const BasicForm = () => (
  <Formik
    initialValues={{ name: '', email: '' }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
    render={props => (
      <Container>
        <Form onSubmit={props.handleSubmit}>
          <Form.Input
            type='text'
            placeholder='Name'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
            name='name'
          />

          <Form.Input
            type='text'
            placeholder='Email'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name='email'
          />
          {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
          <Button primary type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    )}
  />
);

export default Login;
