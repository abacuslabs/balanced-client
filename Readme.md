# Balanced Client

A minimal client for the [Balanced Payments](https://www.balancedpayments.com/) API.

* No new API: Just makes REST easier so that you can use the cURL documentation.
* Real errors: Unlike `balanced-official` this returns bona fide JavaScript errors.


## Installation

```
npm install balanced-client
```


## Usage

```js
var balanced = require('balanced-client').config('your_balanced_secret_here')

balanced.get('/v1/customers', function(err, data) {
  console.log('your customers:', data)
})
```

* Look in `index.js`, `example.js` and `test.js` for more info.
