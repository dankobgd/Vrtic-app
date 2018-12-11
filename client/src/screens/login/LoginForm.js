import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Container, Form, Card, Button, Divider, Message } from 'semantic-ui-react';
import loginSchema from './validation';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-login';
import FacebookButton from 'react-facebook-login/dist/facebook-login-render-props';
import FlashMessagesList from '../../components/flash/FlashMessagesList';
import config from '../../config';
import styles from './LoginForm.module.css';

function LoginForm(props) {
  const { facebookResponse, googleResponse } = props;

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
          <h1>Login</h1>

          <Card centered>
            <Card.Content>
              <Card.Description>Login with email and password</Card.Description>
            </Card.Content>

            {props.authError ? (
              <Card.Content>
                {' '}
                <Message negative>{props.authError.error}</Message>
              </Card.Content>
            ) : null}
            <FlashMessagesList />

            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  type='text'
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name='email'
                />
                {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>}

                <Form.Input
                  type='password'
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name='password'
                />
                {errors.password && touched.password && <div className={styles.error}>{errors.password}</div>}

                <Button fluid primary type='submit' onSubmit={handleSubmit} disabled={isSubmitting}>
                  Login
                </Button>

                <Divider horizontal>Or</Divider>

                <GoogleButton
                  clientId={config.google.clientId}
                  onSuccess={googleResponse}
                  onFailure={googleResponse}
                  render={props => (
                    <button onClick={props.onClick} className={`${styles.btnSocial} ${styles.btnGoogle}`}>
                      Login with Google
                    </button>
                  )}
                />

                <FacebookButton
                  appId={config.facebook.appId}
                  fields={'name, email, picture'}
                  callback={facebookResponse}
                  render={props => (
                    <button onClick={props.onClick} className={`${styles.btnSocial} ${styles.btnFacebook}`}>
                      Login with Facebook
                    </button>
                  )}
                />

                <Link to='/forgotPassword'>forgot password?</Link>
              </Form>
            </Card.Content>
          </Card>
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
  facebookResponse: PropTypes.func.isRequired,
  googleResponse: PropTypes.func.isRequired,
};

export default LoginForm;
