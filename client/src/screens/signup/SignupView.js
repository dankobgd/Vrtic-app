import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid } from 'semantic-ui-react';
import GoogleButton from 'react-google-login';
import FacebookButton from 'react-facebook-login';
import SignupForm from './SignupForm';
import config from '../../config';

function SignupView(props) {
  const { facebookResponse, googleResponse } = props;

  return (
    <div>
      <h1>Signup Page</h1>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <SignupForm {...props} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <div>
                  <GoogleButton
                    clientId={config.google.clientId}
                    buttonText={'Sign up with google'}
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                  />
                </div>
                <div>
                  <FacebookButton
                    appId={config.facebook.appId}
                    textButton={'Sign up With Facebook'}
                    fields={'name, email, picture'}
                    callback={facebookResponse}
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

SignupView.propTypes = {
  facebookResponse: PropTypes.func.isRequired,
  googleResponse: PropTypes.func.isRequired,
};

export default SignupView;
