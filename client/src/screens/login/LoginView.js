import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react';
import GoogleButton from 'react-google-login';
import FacebookButton from 'react-facebook-login';
import LoginForm from './LoginForm';
import config from '../../config';

function LoginView(props) {
  const { facebookResponse, googleResponse } = props;

  return (
    <div>
      <h1>Login Page</h1>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <LoginForm {...props} />
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <div>
                  <GoogleButton
                    clientId={config.google.clientId}
                    buttonText={'Login with Google'}
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                  />
                </div>
                <div>
                  <FacebookButton
                    appId={config.facebook.appId}
                    textButton={'Login with Facebook'}
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

LoginView.propTypes = {
  facebookResponse: PropTypes.func.isRequired,
  googleResponse: PropTypes.func.isRequired,
};

export default LoginView;
