/**
 * A balanced-client example
 *
 * Steps:
 *   Creates a customer
 *   Creates a bank account
 *   Associates bank account with customer
 *   Requests bank account verification
 *   Verifies account
 *   Confirms account `can_debit` is true
 *
 * Uses some super basic flow control, similar to async series.
 * See the main function at end for this.
 */

var balanced = require('./index').config('59ef4c8ef64211e284cc026ba7cd33d0')
  , assert = require('assert')

var customer
  , account
  , verification


function createCustomer(cb) {
  balanced.post('/v1/customers', {
    name: "Some Customer",
    phone: "410-555-5555",
  }, function(err, data) {
    customer = data
    cb(err, data)
  })
}

function createAccount(cb) {
  balanced.post('/v1/bank_accounts', {
    routing_number: 121000358,
    account_number: 9900000001,
    name: "Balanced Client Example Account",
    type: "checking"
  }, function(err, data) {
    account = data
    cb(err, data)
  })
}

function associateAccountWithCustomer(cb) {
  balanced.put(customer.uri, {
    bank_account_uri: account.uri
  }, cb)
}

function requestVerification(cb) {
  balanced.post(account.verifications_uri, function(err, data) {
    verification = data
    cb(err, data)
  })
}

function verifyAccount(cb) {
  balanced.put(verification.uri, {amount_1: 1, amount_2: 1}, cb)
}

function confirmCanDebit(cb) {
  balanced.get(account.uri, function(err, a) {
    if (err) return cb(err)
    assert.ok(a.can_debit)
    cb(null, a)
  })
}





function main() {

  var step = -1

  var steps = [
    createCustomer,
    createAccount,
    associateAccountWithCustomer,
    requestVerification,
    verifyAccount,
    confirmCanDebit,
  ]

  function next(err, data) {
    step += 1
    var fn = steps[step]
    if (!fn) return console.log("\n\nDone!\n\n")
    fn(function(err, data) {
      if (err) throw err
      console.log("\n\n\n =====", fn.name, "=====\n\n", data)
      next()
    })
  }

  next()

}

main()
