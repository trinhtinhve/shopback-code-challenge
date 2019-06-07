const utils = {
  readCookie: (name) => {
    let cookieValue = '';
    let search = name + '=';
    if (document.cookie.length > 0) {
      let offset = document.cookie.indexOf(search);
      if (offset !== -1) {
        offset += search.length;
        let end = document.cookie.indexOf(';', offset);
        if (end === -1) {
          end = document.cookie.length;
        }
        cookieValue = decodeURI(document.cookie.substring(offset, end));
      }
    }

    return cookieValue;
  },

  setCookie: (name, value, expirationSecs=24*60*60) => {
    let expDate = new Date(new Date().getTime() + (1000*expirationSecs));
    let expires = '; expires=' + expDate.toGMTString();
    let firstDot = window.location.host.indexOf('.');
    let domainWithoutSubDomain = window.location.host.slice(firstDot + 1);
    let domain = '; domain=' + domainWithoutSubDomain;
    document.cookie = name + "=" + value + expires + domain + '; path=/';
  },

};

export default utils;
