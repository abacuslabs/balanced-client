# Balanced Client

A minimal client for the [Balanced Payments](https://www.balancedpayments.com/) API.

Features:

* No new API: Just makes REST easier so that you can use the cURL documentation.
* Real errors: Unlike `balanced-official` this uses bona fide JavaScript errors instead of objects <em>(you can use the balanced dashboard to look up the request ID if you need more information)</em>.

Please read the source in `index.js` and look `example.js` for a use case.
