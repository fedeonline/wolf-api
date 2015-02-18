var request = require('request');
var querystring = require('querystring');

/**
 * <b>Wolf API Client</b>.
 * @constructor
 * @param {string}    endpoint          API endpoint
 * @author Federico Pugnaloni <fedeonline2.0@gmail.com>
 */
var Wolf = function(endpoint) {
  this.config = {
    endpoint: endpoint
  };
};
module.exports = Wolf;

Wolf.prototype._get = function(url, parameters, callback) {
  var getURL = this.config.endpoint + '/' + url; // Construct URL with parameters

  request.get({
    url: getURL,
    json: true
  }, function(error, response, body) {
    if (!error && !!body.status && body.status !== '1') {
      error = new Error(body.description || body.error_message);
    }
    callback(error, body || {});
  });
};

Wolf.prototype.getAccountingInfo = function(id, callback) {
  this._get('api/public/customer/'+id+'/accountingInfo/', {}, function(error, body) {
    callback(error, body);
  });
};

