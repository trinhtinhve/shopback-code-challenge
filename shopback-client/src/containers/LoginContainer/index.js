import { connect } from 'react-redux';
import Login from './../../components/Login';

import apiService from './../../services/apiService';
import globalData from './../../services/globalData';

import {showEventsScreen, showSignUpScreen} from "../../actions/screenStatesActions";

const handleNotHaveAccountClick = (dispatch) => {
  dispatch(showSignUpScreen());
};

const handleLoginClick = (email, password, dispatch) => {
  apiService.login(email, password,
    (response) => {
      globalData.token = response.token;
      dispatch(showEventsScreen());
    },
    (error) => {
      alert(error.message);
    }
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    handleNotHaveAccountClick: () => handleNotHaveAccountClick(dispatch),
    handleLoginClick: (email, password) => handleLoginClick(email, password, dispatch),
  }
);

export default connect(null, mapDispatchToProps)(Login);
