import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as authActions from '../redux/auth';

class ResetPassword extends Component {
  state = {
    loading: true,
    success: false,
  };

  setSuccess = () => {
    this.setState({ success: true });
  };

  componentDidMount() {
    const token = this.props.match.params.resetToken;
    this.props
      .validateResetTokenRequest(token)
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        this.setState({ loading: false, success: false });
      });
  }

  render() {
    const { loading, success } = this.state;
    const { resetPasswordRequest } = this.props;
    const token = this.props.match.params.resetToken;

    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading && success && (
          <ResetPasswordForm
            setSuccess={this.setSuccess}
            resetPasswordRequest={resetPasswordRequest}
            token={token}
            history={this.props.history}
          />
        )}
        {!loading && !success && <Message>Invalid token</Message>}
      </div>
    );
  }
}

// Validation schema
const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'passwords do not match'),
});

function ResetPasswordForm(props) {
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={resetPasswordSchema}
      onSubmit={(values, actions) => {
        const obj = {
          ...values,
          token: props.token,
        };

        console.log('obj:', obj);

        props.resetPasswordRequest(obj).then(asd => {
          props.history.push('/login');
          props.setSuccess();
        });
      }}
      render={({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <Container>
          <h1>Reset Password</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Input
              type='password'
              placeholder='New password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name='password'
            />
            {errors.password && touched.password && <div>{errors.password}</div>}

            <Form.Input
              type='password'
              placeholder='Retype new password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              name='confirmPassword'
            />
            {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}

            <Button primary type='submit' onSubmit={handleSubmit} disabled={isSubmitting}>
              Reset Password
            </Button>
          </Form>
        </Container>
      )}
    />
  );
}

ResetPasswordForm.propTypes = {
  // validateResetTokenRequest: PropTypes.func.isRequired,
  // setSuccess: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      resetToken: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default connect(
  null,
  authActions
)(ResetPassword);
