import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';
import signupSchema from './validation';

function SignupForm(props) {
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={signupSchema}
      onSubmit={(formData, actions) => {
        props.signUserUpLocalAuth(formData);
        if (props.authError !== null && props.authError !== undefined) {
          actions.setSubmitting(false);
          props.history.push('/dashboard');
        }
      }}
      render={({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <Form onSubmit={handleSubmit}>
            {props.authError ? <div style={{ color: 'red' }}>{props.authError.error}</div> : null}

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

            <Form.Input
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              name='confirmPassword'
            />
            {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}

            <Button primary type='submit' onSubmit={handleSubmit} disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </Container>
      )}
    />
  );
}

SignupForm.propTypes = {
  logUserInLocalAuth: PropTypes.func.isRequired,
  authError: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default SignupForm;
