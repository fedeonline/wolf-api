//var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');

var API_URL = 'http://localhost';

/**
 * <b>Wolf API Client</b>.
 * @constructor
 * @param {string}    clientID        Your account's Wolf Client Id
 * @param {string}    apiKey          Your account's Wolf API Key
 * @author Federico Pugnaloni <fedeonline2.0@gmail.com>
 */
var Wolf = function(clientID, apiKey) {
  this.credentials = {
    client_id: clientID,
    api_key: apiKey
  };
};
module.exports = Wolf;

Wolf.prototype._get = function(url, parameters, callback) {
  //parameters = extend(parameters, this.credentials); // Add credentials to parameters
  //var getURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
  var getURL = API_URL + '/' + url; // Construct URL with parameters

  request.get({
    url: getURL,
    port: 9292,
    json: true
  }, function(error, response, body) {
    if (!error && !!body.status && body.status !== 'OK') {
      error = new Error(body.description || body.error_message);
    }
    callback(error, body || {});
  });
};

Wolf.prototype.getAccountingInfo = function(callback) {
  this._get('/api/public/customer/sl-54c27fd1168614fa7eac9f82/accountingInfo/', {}, function(error, body) {
    callback(error, body.droplets);
  });
};

