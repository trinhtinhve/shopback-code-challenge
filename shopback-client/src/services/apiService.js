import configs from './../configs';
import globalData from './globalData';

class APIService {
  _encodeQueryParams(params) {
    let ret = [];
    for (let d in params) {
      ret.push(encodeURIComponent(d).replace(/_/g, '%5F') + '=' + encodeURIComponent(params[d]));
    }
    return ret.join('&');
  }

  _post(url, params, successHandler, failedHandler) {
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': globalData.token
      },
      body: JSON.stringify(params),
      mode: 'cors',
    })
      .then(response => response.json())
      .then((response) => {
        if (response.statusCode !== 200) {
          throw response;
        } else {
          successHandler(response);
        }
      })
      .catch((err) => {
        if (failedHandler) failedHandler(err);
      });
  }

  _get(url, params, successHandler, failedHandler) {
    let questionMark = (url.indexOf('?') === url.length - 1) ? '' : '?';

    fetch(url + questionMark + this._encodeQueryParams(params), {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': globalData.token
      },
      mode: 'cors',
    })
      .then(response => response.json())
      .then((response) => {
        if (response.statusCode !== 200) {
          throw response;
        } else {
          successHandler(response);
        }
      })
      .catch((err) => {
        if (failedHandler) failedHandler(err);
      });
  }

  signUp(email, password, firstName, lastName, successHandler, failedHandler = null) {
    const params = { email, password, firstName, lastName };
    this._post(configs.urlSignUp, params, successHandler, failedHandler);
  }

  login(email, password, successHandler, failedHandler = null) {
    const params = {email, password};
    this._post(configs.urlLogin, params, successHandler, failedHandler);
  }

  getConnectionStringByEventCode(eventCode, successHandler, failedHandler = null) {
    const params = { eventCode };
    this._get(configs.urlGetConnectionString, params, successHandler, failedHandler);
  }

  getEvents(successHandler, failedHandler) {
    this._get(configs.urlGetEvents, {}, successHandler, failedHandler);
  }

  createEvent(eventName, eventCode, startTime, endTime, successHandler, failedHandler = null) {
    const params = { eventName, eventCode, startTime, endTime };
    this._post(configs.urlCreateEvent, params, successHandler, failedHandler)
  }

  editEvent(eventName, eventCode, startTime, endTime, oldEventCode, successHandler, failedHandler =  null) {
    const params = { eventName, eventCode, startTime, endTime, oldEventCode };
    this._post(configs.urlEditEvent, params, successHandler, failedHandler)
  }

  deleteEvent(eventCode, successHandler, failedHandler = null) {
    const params = { eventCode };
    this._post(configs.urlDeleteEvent, params, successHandler, failedHandler);
  }

}

const apiService = new APIService();
export default apiService;
