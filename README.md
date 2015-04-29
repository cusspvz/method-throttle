# method-throttle

[![Test Status](http://strider.findhit.com/findhit/method-throttle/badge)](http://strider.findhit.com/findhit/method-throttle) [![Dependency Status](https://david-dm.org/findhit/method-throttle.svg)](https://david-dm.org/findhit/method-throttle)


throttles a method for a specific time


![horse](http://www.clipartlord.com/wp-content/uploads/2014/04/horse10.png)



## Installation

```
    npm install --save method-throttle
```



## Usage

Delay your methods execution by defining an interval of idle time.

```js
var throttle = require( 'method-throttle' );

var method = throttle(function ( a, b, c ){
    // your code as usually
}, 1000 );

method( null, null, 1 );
method( null, null, 1 );
method( null, null, 1 );
method( null, null, 1 );

setTimeout( method, 1500 );

// function provided into throttle would run only twice!

```



## Example use case:

Imagine that you want to register how many times an user scrolls a page.
If you place an event listener on `window.scroll`, you would have a ton of data
since almost all browsers fire those events whenever page is modified / rendered.

```js

var timesScrolled = 0;

window.on( 'scroll', function () {
    timesScrolled++;
});

```

That would not be a bottleneck, but for most advanced use cases, you would be
some how pissed off.

With throttle you can limit how many times, within a provided interval of time,
a method could run:

```js
var throttle = require( 'method-throttle' );
var timesScrolled = 0;

window.on( 'scroll', throttle(function () {
    timesScrolled++;
}, 1000 ));

```

Now, if you were always scrolling, you would get at a maximum of 60 count!!

:mokey-face:



## Testing

We use `mocha`, `chai`, `bluebird` and `sinon` for this test suite!

```bash
npm test

```
