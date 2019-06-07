import * as actionCreators from './../actions/generalDataActions';

const generalDataDefault = {
  token: '',
  eventCode: ''
};

export default (generalData = generalDataDefault, action) => {
  switch (action.type) {
    case actionCreators.SET_TOKEN:
      return handleSetToken(generalData, action.payload);
    case actionCreators.SET_EVENT_CODE:
      return handleSetEventCode(generalData, action.payload);
    default:
      return generalData;
  }
};

function handleSetToken(generalData, { token }) {
  return { ...generalData, token };
}

function handleSetEventCode(generalData, { eventCode }) {
  return { ...generalData, eventCode };
}
