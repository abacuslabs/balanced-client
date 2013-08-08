var superagent = require('superagent')
var underscore = require('underscore')
var BASE = 'https://api.balancedpayments.com'

module.exports = BalancedClient

function BalancedClient(secret) {
  this.secret = secret
}

BalancedClient.prototype.get = function(path, data, cb) {
  this.request('GET', path, data, cb)
}

BalancedClient.prototype.post = function(path, data, cb) {
  this.request('POST', path, data, cb)
}

BalancedClient.prototype.put = function(path, data, cb) {
  this.request('PUT', path, data, cb)
}

BalancedClient.prototype.delete = function(path, cb) {
  this.request('DELETE', path, {}, cb)
}

BalancedClient.prototype.request = function(method, path, data, cb) {
  if ('function' == typeof data) {
    cb = data
    data = {}
  }
  if (typeof cb !== 'function') {
    throw new Error("callback function is required")
    return
  }
  if (path.indexOf('/v1/') !== 0) {
    return cb(new Error("invalid balanced url (should start with /v1/): " + path))
  }

  var req = superagent(method, BASE+path).auth(this.secret, '')
  if (method === 'GET') {
    req.query(data)
  } else {
    req.send(data)
  }
  req.end(responder(cb))
}


function responder(cb) {
  return function(err, r) {
    if (err) return cb(err)
    if (r.error) {
      underscore.extend(r.error, r.body)
      r.error.message += " request_id: " + r.body.request_id
      return cb(r.error)
    }
    cb(null, r.body)
  }
}
