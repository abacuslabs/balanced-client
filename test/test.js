var assert = require('assert')
var Balanced = require('../index')
var balanced = new Balanced('59ef4c8ef64211e284cc026ba7cd33d0')

describe('Error handling', function() {

  it('Returns proper JavaScript error including Balanced error info', function(done) {
    balanced.get('/v1/notfound', function(err, data) {
      assert.ok(err)
      assert.ok(err instanceof Error)
      assert.equal(err.method, 'GET')
      assert.equal(err.path, '/v1/notfound')
      assert.equal(err.status, 'Not Found')
      assert.equal(err.status_code, 404)
      assert.ok(err.description.indexOf("Your request id is") > -1)
      assert.ok(err.request_id)
      done()
    })
  })

})
