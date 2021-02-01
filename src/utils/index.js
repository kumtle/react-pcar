import axios from 'axios';
import request from 'request'

export const blankDiv = (height) => {
  if (height) {
    var style = { height : height };
    return (<div className='blank' style={style}/>);
  }
  return (<div className='blank' />);
}

export const numberFormat = (inputNumber) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getQueryString = (data) => {
  var str = [];
  for (var p in data) {
    if (data.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
    }
  }
  return str.join('&');
}

export const getUrlParams = () => {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}

export const isNullOrEmpty = (str) => {
    return (typeof str == 'undefined' || !str || str.length === 0 || str === "");
}

function getUrl(path) {
    if (path.startsWith('www') || path.startsWith('http')) {
        return path;
    }
    if (window.location.hostname === 'localhost') {

      //return 'http://localhost:5001/pcar-fc2aa/us-central1/api/' + path;
      return 'http://localhost/api/' + path;
    }
    else {
      /*var uri = window.location.protocol + '//' + window.location.hostname;
      return uri + '/api/' + path;*/
        return window.location.origin + '/api/' + path;
    }
    return path;
}

async function requestGet(url, data, success, fail) {
  url = getUrl(url);
  console.log('request get => ' + url + '?' + getQueryString(data));
  axios.get(url + '?' + getQueryString(data))
      .then(response => {
          if (success) {
              //success(JSON.parse(response.data.message).data);
              success(response.data.message);
          }
          console.log('response complete: ' + url);
      })
      .catch(error => {
          if (fail) {
              fail(error);
          }
          console.log(error);
      });
}

async function requestPost(url, data, success, fail) {
  console.log('request : ' + url);
  url = getUrl(url);
  axios.post(url, data)
      .then(response => {
          if (success) {
              success(response.data.data);
          }
          console.log('response complete: ' + url);
      })
      .catch(error => {
          if (fail) {
              fail(error);
          }
          console.error(error);
      });
}

export const get = (url, data, success, fail) => {
  //data.fbuid = fire.getUid();
  requestGet(url, data, success, fail);
}

export const post = (url, data, success, fail) => {
  //data.fbuid = fire.getUid();
  requestPost(url, data, success, fail);
}

const authKey = '8q3WELhSGkqUm454ueMo0YT5G9zNUXs%2BNMTcZsudRJJjqNiFg1ndC2BrwzH8wZGT02erhWKigm76GCtTpZA5bQ%3D%3D';
export const getTourAuthKey = () => {
  return decodeURIComponent(authKey);
}

export const getRequest = (url, data, success, fail) => {
  request(url + '?' + getQueryString(data), function (error, response, body) {
    
    if (response && response.statusCode) {
      if (success) {
        const result = JSON.parse(body);
        success(JSON.parse(result.message).data);
      }
    }
    else {
      if (fail) {
        fail(error);
      }
    }
  });
}

export default this;