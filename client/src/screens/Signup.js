import React from 'react';
import { Formik } from 'formik';
import { Grid, Container, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as authActions from '../redux/auth';
import GoogleButton from 'react-google-login';
import FacebookButton from 'react-facebook-login';
import config from '../config';

class Signup extends React.Component {
  googleCallback = async res => {
    console.log('Google res: ', res);
    await this.props.signUserUpGoogleOauth(res.accessToken);
    if (!this.props.authError) {
      this.props.history.push('/dashboard');
    }
  };

  facebookCallback = async res => {
    console.log('Facebook res: ', res);
    await this.props.signUserUpFacebookOauth(res.accessToken);
    if (!this.props.authError) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <SignupForm {...this.props} />
              </Grid.Column>
              <Grid.Column width={8}>
                <div>
                  <div>
                    <GoogleButton
                      clientId={config.google.clientId}
                      buttonText={'Sign up with google'}
                      onSuccess={this.googleCallback}
                      onFailure={this.googleCallback}
                    />
                  </div>
                  <div>
                    <FacebookButton
                      appId={config.facebook.appId}
                      textButton={'Sign up With Facebook'}
                      fields={'name, email, picture'}
                      callback={this.facebookCallback}
                    />
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const signupSchema = Yup.object().shape({
  email: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string(),
});

// const signupSchema = Yup.object().shape({
//   email: Yup.string()
//     .email()
//     .required(),
//   password: Yup.string()
//     .min(5)
//     .max(300)
//     .required(),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'passwords do not match')
//     .required(),
// });

const SignupForm = props => {
  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={signupSchema}
      onSubmit={(formData, actions) => {
        props.signUserUpLocalAuth(formData);

        console.log('props inside onSubmit:  ', props.authError);

        if (Array.isArray(props.authError)) {
          const serverErrors = {};
          props.authError.forEach(err => {
            serverErrors[err.context.label] = err.message;
          });
          actions.setErrors(serverErrors);
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
};

function mapStateToProps(state) {
  return {
    authError: state.user.authError,
  };
}

export default connect(
  mapStateToProps,
  authActions
)(Signup);
