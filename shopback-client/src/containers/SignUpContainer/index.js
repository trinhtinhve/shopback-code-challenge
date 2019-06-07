import { connect } from 'react-redux';
import SignUp from './../../components/SignUp';

import apiService from './../../services/apiService';
import globalData from './../../services/globalData';

import {showEventsScreen, showLoginScreen} from "../../actions/screenStatesActions";

const handleHaveAccountClick = (dispatch) => {
  dispatch(showLoginScreen());
};

const handleCreateAccountClick = (email, password, firstName, lastName, dispatch) => {
  apiService.signUp(email, password, firstName, lastName,
    (response) => {
      globalData.token = response.token;
      dispatch(showEventsScreen());
    },
    (error) => {
      alert(error.message);
    }
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleHaveAccountClick: () => handleHaveAccountClick(dispatch),
    handleCreateAccountClick: (email, password, firstName, lastName) => handleCreateAccountClick(email, password, firstName, lastName, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
