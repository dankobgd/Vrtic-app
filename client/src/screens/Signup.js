import React from 'react';
import { Formik } from 'formik';
import { Grid, Container, Form, Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import signupActions from '../modules/signup';

function Signup() {
  return (
    <div>
      <h1>Signup Page</h1>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <BasicForm />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <button>Google</button>
                <button>Facebook</button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(5)
    .max(300)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwords do not match')
    .required(),
});

const BasicForm = () => (
  <Formik
    initialValues={{ email: '', password: '', confirmPassword: '' }}
    validationSchema={signupSchema}
    onSubmit={(values, actions) => {
      console.log('form data: ', values);
    }}
    render={({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
      <Container>
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

export default Signup;
