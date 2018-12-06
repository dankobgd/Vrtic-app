import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import { Container, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as authActions from '../redux/auth';

class ForgotPassword extends Component {
  state = {
    success: false,
  };

  setSuccess = () => {
    this.setState({ success: true });
  };

  render() {
    const { forgotPasswordRequest } = this.props;

    return (
      <div>
        <h1>forgot password page</h1>

        {this.state.success ? (
          <Message>Email has been sent</Message>
        ) : (
          <ForgotPasswordForm setSuccess={this.setSuccess} forgotPasswordRequest={forgotPasswordRequest} />
        )}
      </div>
    );
  }
}

// Validation schema
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
});

function ForgotPasswordForm(props) {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values, actions) => {
        props.forgotPasswordRequest(values).then(asd => {
          console.log('then fpr: ', asd);
          props.setSuccess();
        });
      }}
      render={({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <Form onSubmit={handleSubmit}>
            {/* Display server err later */}
            <Form.Input
              type='text'
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name='email'
            />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <Button primary type='submit' onSubmit={handleSubmit} disabled={isSubmitting}>
              Forgot Password
            </Button>
          </Form>
        </Container>
      )}
    />
  );
}

ForgotPassword.propTypes = {
  // forgotPasswordRequest: PropTypes.func.isRequired,
  // setSuccess: PropTypes.func.isRequired,
};

export default connect(
  null,
  authActions
)(ForgotPassword);
