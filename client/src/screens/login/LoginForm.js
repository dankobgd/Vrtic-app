import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';
import loginSchema from './validation';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

function LoginForm(props) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(formData, actions) => {
        props.logUserInLocalAuth(formData);
        props.setFlashMessage({ type: 'success', text: 'You successfuly logged in' });

        if (props.authError !== null && props.authError !== undefined) {
          actions.setSubmitting(false);
          props.history.push('/dashboard');
        }
      }}
      render={({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          {props.authError ? <div style={{ color: 'red' }}>{props.authError.error}</div> : null}

          <FlashMessagesList />

          <Form onSubmit={handleSubmit}>
            <Form.Input
              type='text'
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name='email'
            />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <Form.Input
              type='password'
              placeholder='Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name='password'
            />
            {errors.password && touched.password && <div>{errors.password}</div>}

            <Button primary type='submit' onSubmit={handleSubmit} disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </Container>
      )}
    />
  );
}

LoginForm.propTypes = {
  logUserInLocalAuth: PropTypes.func.isRequired,
  authError: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  setFlashMessage: PropTypes.func.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
  flashMessages: PropTypes.array,
};

export default LoginForm;
