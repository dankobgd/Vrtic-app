import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';
import loginSchema from './validation';
import FlashMessagesList from '../../components/flash/FlashMessagesList';
import { Link } from 'react-router-dom';

function LoginForm(props) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(formData, actions) => {
        props.logUserInLocalAuth(formData).then(data => {
          if (data !== null && data !== undefined) {
            const errors = {};
            if (data.payload) {
              data.payload.forEach(errObj => {
                errors[errObj.context.label] = errObj.message;
                actions.setErrors(errors);
              });
            } else {
              props.history.push('/dashboard');
            }
            actions.setSubmitting(false);
          } else {
            props.setFlashMessage({ type: 'success', text: 'You successfuly Logged in' });
          }
        });
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

            <Link to='/forgotPassword'>forgot password?</Link>
          </Form>
        </Container>
      )}
    />
  );
}

LoginForm.propTypes = {
  logUserInLocalAuth: PropTypes.func.isRequired,
  authError: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  setFlashMessage: PropTypes.func.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
  flashMessages: PropTypes.array,
};

export default LoginForm;
