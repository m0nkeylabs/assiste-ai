import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withTranslation } from 'react-i18next';
import i18n from '../../../i18n';

import { login } from '../../../store/actions/login.action';

import './modal.component.sass';

const ModalComponent = ({state, props, login, profileLoading}) => {
  const { onClose, open, typeModal } = props;
  const [value, setValue] = React.useState(typeModal);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  window.fbAsyncInit = () => {
    window.FB.init({
      appId: '2074647832674974',
      cookie: true,
      xfbml: true,
      version: 'v3.10',
    });
    window.FB.AppEvents.logPageView();
  };

  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    let js = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  const loginFacebook = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        const paramsLogin = {
          type: 'facebook',
          token: response.authResponse.accessToken,
        };
        login(paramsLogin);
      } else {
        console.log('User login failed');
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePasswordChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setValue(typeModal);

    if (profileLoading) {
      handleClose();
    }
  }, [typeModal, profileLoading]);

  const formSignIn = () => (
    <form className="form" noValidate autoComplete="off">
      <TextField
        id="text-email"
        label={i18n.t('account.form.email')}
        size="small"
        placeholder={i18n.t('account.form.email.placeholder')}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl id="text-password" size="small">
        <InputLabel htmlFor="input-password" shrink>{i18n.t('account.form.password')}</InputLabel>
        <Input
          placeholder={i18n.t('account.form.password.placeholder')}
          id="input-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handlePasswordChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
        />
      </FormControl>
      <Button
        id="btn-signIn"
        variant="contained"
        color="primary"
        size="medium"
        className="btn-primary"
      >
        {i18n.t('account.sign.in')}
      </Button>
    </form>
  );

  const formSignUp = () => (
    <form className="form" noValidate autoComplete="off">
      <TextField
        id="text-name"
        label={i18n.t('account.form.full.name')}
        size="small"
        placeholder={i18n.t('account.form.full.name.placeholder')}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        id="text-email"
        label={i18n.t('account.form.email')}
        size="small"
        placeholder={i18n.t('account.form.email.placeholder')}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl id="text-password" size="small">
        <InputLabel htmlFor="input-password" shrink>{i18n.t('account.form.password')}</InputLabel>
        <Input
          placeholder={i18n.t('account.form.password.placeholder')}
          id="input-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handlePasswordChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )}
        />
      </FormControl>
      <Button
        id="btn-signUp"
        variant="contained"
        color="primary"
        size="medium"
        className="btn-primary"
      >
        {i18n.t('account.sign.up')}
      </Button>
    </form>
  );

  return (
    <Dialog id="modal-dialog" onClose={handleClose} open={open}>
      <div className="btn-container">
        <Button
          id="btn-facebook"
          variant="contained"
          color="primary"
          size="medium"
          className="button"
          startIcon={state.isLoading || state.userLogged ? null : <FacebookIcon />}
          onClick={loginFacebook}
        >
          {state.isLoading || state.userLogged ? <CircularProgress /> : i18n.t('account.signin.with.facebook')}
        </Button>
      </div>
      <AppBar id="appbar-dialog" position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab id="tab-login" value="signIn" label={i18n.t('account.sign.in')} />
          <Tab id="tab-register" value="signUp" label={i18n.t('account.sign.up')} />
        </Tabs>
      </AppBar>
      {value === 'signIn' && (
        <div className="tab-detail">
          {formSignIn()}
        </div>
      )}
      {value === 'signUp' && (
      <div className="tab-detail">
        {formSignUp()}
      </div>
      )}
    </Dialog>
  );
};

const mapStateToProps = (state, props) => ({ state: state.login, profileLoading: state.profile.isLoading, props });
export default compose(connect(mapStateToProps, { login })(withTranslation()(ModalComponent)));