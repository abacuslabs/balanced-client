var superagent = require('superagent')
var underscore = require('underscore')
var BASE = 'https://api.balancedpayments.com'

module.exports = BalancedClient

function BalancedClient(secret) {
  this.secret = secret
}

BalancedClient.prototype.get = function(path, data, cb) {
  if ('function' == typeof data) {
    cb = data
    data = {}
  }
  superagent
    .get(BASE+path)
    .auth(this.secret, '')
    .query(data)
    .end(responder(cb))
}

BalancedClient.prototype.post = function(path, data, cb) {
  if ('function' == typeof data) {
    cb = data
    data = {}
  }
  superagent
    .post(BASE+path)
    .auth(this.secret, '')
    .send(data)
    .end(responder(cb))
}

BalancedClient.prototype.put = function(path, data, cb) {
  superagent
    .put(BASE+path)
    .auth(this.secret, '')
    .send(data)
    .end(responder(cb))
}

BalancedClient.prototype.delete = function(path, cb) {
  superagent
    .del(BASE+path)
    .auth(this.secret, '')
    .send({})
    .end(responder(cb))
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
