var request = require('request');

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

Wolf.prototype._get = function(url, callback) {
  var getURL = this.config.endpoint + '/' + url; // Construct URL with parameters

  request.get({
    url: getURL,
    json: true
  }, function(error, response, body) {
    if (!error && !!body.status && body.status !== 1) {
      error = new Error(body.response.msg || body.response.code);
    }
    callback(error, body || {});
  });
};

Wolf.prototype._put = function(url, data, callback) {
  var putURL = this.config.endpoint + '/' + url;

  request.put({
    url: putURL,
    json: true,
    body: data
  }, function(error, response, body) {
    if (!error && !!body.status && body.status !== 1) {
      error = new Error(body.response.msg || body.esponse.code);
    }
    callback(error, body || {});
  });
};

// AccountingInfo
Wolf.prototype.getAccountingInfo = function(id, callback) {
  this._get('api/public/customer/'+id+'/accountingInfo/', function(error, body) {
    callback(error, body.response);
  });
};

Wolf.prototype.updateAccountingInfo = function(id, data, callback) {
  data.submittedBy = 'streetlib';
  data.approvedBy = 'streetlib';
  console.log(JSON.stringify(data));
  this._put('api/public/customer/'+id+'/accountingInfo/', data, function(error, body) {
    callback(error);
  });
};

// Drafts
Wolf.prototype.getDrafts = function(id, callback) {
  this._get('api/public/v1/customer/'+id+'/streetlib/draft/', function(error, body) {
    callback(error, body.response);
  });
};

Wolf.prototype.getDraft = function(id, guid, callback) {
  this._get('api/public/v1/customer/'+id+'/streetlib/draft/'+guid+'/', function(error, body) {
    callback(error, body.response);
  });
};

// Invoices
Wolf.prototype.getInvoices = function(id, callback) {
  this._get('api/public/v1/customer/'+id+'/streetlib/invoice/', function(error, body) {
    callback(error, body.response);
  });
};