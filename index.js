var superagent = require('superagent')
var underscore = require('underscore')
var BASE = 'https://api.balancedpayments.com'


var secret

exports.config = function(s) {
  secret = s
  return exports
}

exports.get = function(path, data, cb) {
  this.request('GET', path, data, cb)
}

exports.post = function(path, data, cb) {
  this.request('POST', path, data, cb)
}

exports.put = function(path, data, cb) {
  this.request('PUT', path, data, cb)
}

exports.delete = function(path, cb) {
  this.request('DELETE', path, {}, cb)
}

exports.request = function(method, path, data, cb) {
  if (!secret) {
    throw new Error("Balanced secret not set. Call `balanced.config(secret)` first.")
  }
  if ('function' == typeof data) {
    cb = data
    data = {}
  }
  if (typeof cb !== 'function') {
    throw new Error("callback function is required")
  }
  if (path.indexOf('/v1/') !== 0) {
    return cb(new Error("invalid balanced url (should start with /v1/): " + path))
  }

  var req = superagent(method, BASE+path).auth(secret, '')
  if (method === 'GET') {
    req.query(data)
  } else {
    req.send(data)
  }

  req.end(function(err, r) {
    if (err) return cb(err)
    if (r.error) {
      underscore.extend(r.error, r.body)
      r.error.message += " request_id: " + r.body.request_id
      return cb(r.error)
    }
    cb(null, r.body)
  })
}
