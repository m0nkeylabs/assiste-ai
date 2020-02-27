import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Avatar from '@material-ui/core/Avatar';

import { updateMobileMenuActive } from '../../../store/actions/main-status.action';

import './header.component.sass';
import { logo } from '../../../assets/img/images';
import { Modal } from '../../shared-components';

import i18n from '../../../i18n';


const HeaderComponent = ({ status, profile, updateMobileMenuActive }) => {
  const [open, setOpen] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState('signIn');

  const handleClickOpen = (type) => {
    setTypeModal(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openMenuMobile = () => updateMobileMenuActive(!status);

  const loginMenu = () => (
    <div className="auth-menu">
      <span className="link" onClick={() => handleClickOpen('signIn')}>{i18n.t('account.sign.in')}</span>
      {i18n.t('global.or')}
      <span className="link" onClick={() => handleClickOpen('signUp')}>{i18n.t('account.sign.up')}</span>
    </div>
  );

  const loggedMenu = () => (
    <div className="logged-menu">
      <Avatar alt="User photo" src={profile.avatar} />
    </div>
  );

  return (
    <header id="header">
      <nav id="header-container">
        <div id="nav-web">
          <div id="logo">
            <Link to="/" className="logo"><img src={logo} alt="logo Assiste ai" /></Link>
          </div>
          <div id="hamburger-menu">
            <FontAwesomeIcon icon={faBars} onClick={openMenuMobile} />
          </div>
          <div id="menu">
            <div className="main-menu">
              <Link to="/">{i18n.t('global.indications')}</Link>
              <Link to="/how-it-works">{i18n.t('global.how.it.works')}</Link>
              <Link to="/contact">{i18n.t('global.contact')}</Link>
            </div>

            {profile ? loggedMenu() : loginMenu() }

          </div>
        </div>
      </nav>

      <Modal open={open} onClose={handleClose} typeModal={typeModal} />
    </header>
  );
};

const mapStateToProps = state => ({ status: state.mainStatus.mobileMenuActive, profile: state.profile.profile });
export default compose(connect(mapStateToProps, { updateMobileMenuActive })(withTranslation()(HeaderComponent)));
