/*! 1.0.0 */
/*
 * http://www.myersdaily.org/joseph/javascript/md5-text.html
 */

function md5cycle(x, k) {
  var a = x[0], b = x[1], c = x[2], d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17,  606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12,  1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7,  1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7,  1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22,  1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14,  643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9,  38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5,  568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20,  1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14,  1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16,  1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11,  1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4,  681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23,  76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16,  530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10,  1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6,  1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6,  1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21,  1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15,  718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
  txt = '';
  var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878], i;
  for (i=64; i<=s.length; i+=64) {
    md5cycle(state, md5blk(s.substring(i-64, i)));
  }
  s = s.substring(i-64);
  var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  for (i=0; i<s.length; i++)
    tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
  tail[i>>2] |= 0x80 << ((i%4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i=0; i<16; i++) tail[i] = 0;
  }
  tail[14] = n*8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
  var md5blks = [], i; /* Andy King said do it this way. */
  for (i=0; i<64; i+=4) {
    md5blks[i>>2] = s.charCodeAt(i)
    + (s.charCodeAt(i+1) << 8)
    + (s.charCodeAt(i+2) << 16)
    + (s.charCodeAt(i+3) << 24);
  }
  return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
  var s='', j=0;
  for(; j<4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
    + hex_chr[(n >> (j * 8)) & 0x0F];
  return s;
}

function hex(x) {
  for (var i=0; i<x.length; i++)
    x[i] = rhex(x[i]);
  return x.join('');
}

function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
 so if possible we use it. Some IEs
 are the only ones I know of that
 need the idiotic second function,
 generated by an if clause.  */

function add32(a, b) {
  return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
};/*
 html2canvas 0.5.0-alpha2 <http://html2canvas.hertzen.com>
 Copyright (c) 2015 Niklas von Hertzen

 Released under MIT License
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.html2canvas=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  (function (process,global){
    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
     * @version   2.0.1
     */

    (function() {
      "use strict";

      function $$utils$$objectOrFunction(x) {
        return typeof x === 'function' || (typeof x === 'object' && x !== null);
      }

      function $$utils$$isFunction(x) {
        return typeof x === 'function';
      }

      function $$utils$$isMaybeThenable(x) {
        return typeof x === 'object' && x !== null;
      }

      var $$utils$$_isArray;

      if (!Array.isArray) {
        $$utils$$_isArray = function (x) {
          return Object.prototype.toString.call(x) === '[object Array]';
        };
      } else {
        $$utils$$_isArray = Array.isArray;
      }

      var $$utils$$isArray = $$utils$$_isArray;
      var $$utils$$now = Date.now || function() { return new Date().getTime(); };
      function $$utils$$F() { }

      var $$utils$$o_create = (Object.create || function (o) {
        if (arguments.length > 1) {
          throw new Error('Second argument not supported');
        }
        if (typeof o !== 'object') {
          throw new TypeError('Argument must be an object');
        }
        $$utils$$F.prototype = o;
        return new $$utils$$F();
      });

      var $$asap$$len = 0;

      var $$asap$$default = function asap(callback, arg) {
        $$asap$$queue[$$asap$$len] = callback;
        $$asap$$queue[$$asap$$len + 1] = arg;
        $$asap$$len += 2;
        if ($$asap$$len === 2) {
          // If len is 1, that means that we need to schedule an async flush.
          // If additional callbacks are queued before the queue is flushed, they
          // will be processed by this flush that we are scheduling.
          $$asap$$scheduleFlush();
        }
      };

      var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
      var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

      // test for web worker but not in IE10
      var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
          typeof importScripts !== 'undefined' &&
          typeof MessageChannel !== 'undefined';

      // node
      function $$asap$$useNextTick() {
        return function() {
          process.nextTick($$asap$$flush);
        };
      }

      function $$asap$$useMutationObserver() {
        var iterations = 0;
        var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
        var node = document.createTextNode('');
        observer.observe(node, { characterData: true });

        return function() {
          node.data = (iterations = ++iterations % 2);
        };
      }

      // web worker
      function $$asap$$useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = $$asap$$flush;
        return function () {
          channel.port2.postMessage(0);
        };
      }

      function $$asap$$useSetTimeout() {
        return function() {
          setTimeout($$asap$$flush, 1);
        };
      }

      var $$asap$$queue = new Array(1000);

      function $$asap$$flush() {
        for (var i = 0; i < $$asap$$len; i+=2) {
          var callback = $$asap$$queue[i];
          var arg = $$asap$$queue[i+1];

          callback(arg);

          $$asap$$queue[i] = undefined;
          $$asap$$queue[i+1] = undefined;
        }

        $$asap$$len = 0;
      }

      var $$asap$$scheduleFlush;

      // Decide what async method to use to triggering processing of queued callbacks:
      if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
        $$asap$$scheduleFlush = $$asap$$useNextTick();
      } else if ($$asap$$BrowserMutationObserver) {
        $$asap$$scheduleFlush = $$asap$$useMutationObserver();
      } else if ($$asap$$isWorker) {
        $$asap$$scheduleFlush = $$asap$$useMessageChannel();
      } else {
        $$asap$$scheduleFlush = $$asap$$useSetTimeout();
      }

      function $$$internal$$noop() {}
      var $$$internal$$PENDING   = void 0;
      var $$$internal$$FULFILLED = 1;
      var $$$internal$$REJECTED  = 2;
      var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

      function $$$internal$$selfFullfillment() {
        return new TypeError("You cannot resolve a promise with itself");
      }

      function $$$internal$$cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.')
      }

      function $$$internal$$getThen(promise) {
        try {
          return promise.then;
        } catch(error) {
          $$$internal$$GET_THEN_ERROR.error = error;
          return $$$internal$$GET_THEN_ERROR;
        }
      }

      function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
          then.call(value, fulfillmentHandler, rejectionHandler);
        } catch(e) {
          return e;
        }
      }

      function $$$internal$$handleForeignThenable(promise, thenable, then) {
        $$asap$$default(function(promise) {
          var sealed = false;
          var error = $$$internal$$tryThen(then, thenable, function(value) {
            if (sealed) { return; }
            sealed = true;
            if (thenable !== value) {
              $$$internal$$resolve(promise, value);
            } else {
              $$$internal$$fulfill(promise, value);
            }
          }, function(reason) {
            if (sealed) { return; }
            sealed = true;

            $$$internal$$reject(promise, reason);
          }, 'Settle: ' + (promise._label || ' unknown promise'));

          if (!sealed && error) {
            sealed = true;
            $$$internal$$reject(promise, error);
          }
        }, promise);
      }

      function $$$internal$$handleOwnThenable(promise, thenable) {
        if (thenable._state === $$$internal$$FULFILLED) {
          $$$internal$$fulfill(promise, thenable._result);
        } else if (promise._state === $$$internal$$REJECTED) {
          $$$internal$$reject(promise, thenable._result);
        } else {
          $$$internal$$subscribe(thenable, undefined, function(value) {
            $$$internal$$resolve(promise, value);
          }, function(reason) {
            $$$internal$$reject(promise, reason);
          });
        }
      }

      function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
        if (maybeThenable.constructor === promise.constructor) {
          $$$internal$$handleOwnThenable(promise, maybeThenable);
        } else {
          var then = $$$internal$$getThen(maybeThenable);

          if (then === $$$internal$$GET_THEN_ERROR) {
            $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
          } else if (then === undefined) {
            $$$internal$$fulfill(promise, maybeThenable);
          } else if ($$utils$$isFunction(then)) {
            $$$internal$$handleForeignThenable(promise, maybeThenable, then);
          } else {
            $$$internal$$fulfill(promise, maybeThenable);
          }
        }
      }

      function $$$internal$$resolve(promise, value) {
        if (promise === value) {
          $$$internal$$reject(promise, $$$internal$$selfFullfillment());
        } else if ($$utils$$objectOrFunction(value)) {
          $$$internal$$handleMaybeThenable(promise, value);
        } else {
          $$$internal$$fulfill(promise, value);
        }
      }

      function $$$internal$$publishRejection(promise) {
        if (promise._onerror) {
          promise._onerror(promise._result);
        }

        $$$internal$$publish(promise);
      }

      function $$$internal$$fulfill(promise, value) {
        if (promise._state !== $$$internal$$PENDING) { return; }

        promise._result = value;
        promise._state = $$$internal$$FULFILLED;

        if (promise._subscribers.length === 0) {
        } else {
          $$asap$$default($$$internal$$publish, promise);
        }
      }

      function $$$internal$$reject(promise, reason) {
        if (promise._state !== $$$internal$$PENDING) { return; }
        promise._state = $$$internal$$REJECTED;
        promise._result = reason;

        $$asap$$default($$$internal$$publishRejection, promise);
      }

      function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
        var subscribers = parent._subscribers;
        var length = subscribers.length;

        parent._onerror = null;

        subscribers[length] = child;
        subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
        subscribers[length + $$$internal$$REJECTED]  = onRejection;

        if (length === 0 && parent._state) {
          $$asap$$default($$$internal$$publish, parent);
        }
      }

      function $$$internal$$publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;

        if (subscribers.length === 0) { return; }

        var child, callback, detail = promise._result;

        for (var i = 0; i < subscribers.length; i += 3) {
          child = subscribers[i];
          callback = subscribers[i + settled];

          if (child) {
            $$$internal$$invokeCallback(settled, child, callback, detail);
          } else {
            callback(detail);
          }
        }

        promise._subscribers.length = 0;
      }

      function $$$internal$$ErrorObject() {
        this.error = null;
      }

      var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

      function $$$internal$$tryCatch(callback, detail) {
        try {
          return callback(detail);
        } catch(e) {
          $$$internal$$TRY_CATCH_ERROR.error = e;
          return $$$internal$$TRY_CATCH_ERROR;
        }
      }

      function $$$internal$$invokeCallback(settled, promise, callback, detail) {
        var hasCallback = $$utils$$isFunction(callback),
            value, error, succeeded, failed;

        if (hasCallback) {
          value = $$$internal$$tryCatch(callback, detail);

          if (value === $$$internal$$TRY_CATCH_ERROR) {
            failed = true;
            error = value.error;
            value = null;
          } else {
            succeeded = true;
          }

          if (promise === value) {
            $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
            return;
          }

        } else {
          value = detail;
          succeeded = true;
        }

        if (promise._state !== $$$internal$$PENDING) {
          // noop
        } else if (hasCallback && succeeded) {
          $$$internal$$resolve(promise, value);
        } else if (failed) {
          $$$internal$$reject(promise, error);
        } else if (settled === $$$internal$$FULFILLED) {
          $$$internal$$fulfill(promise, value);
        } else if (settled === $$$internal$$REJECTED) {
          $$$internal$$reject(promise, value);
        }
      }

      function $$$internal$$initializePromise(promise, resolver) {
        try {
          resolver(function resolvePromise(value){
            $$$internal$$resolve(promise, value);
          }, function rejectPromise(reason) {
            $$$internal$$reject(promise, reason);
          });
        } catch(e) {
          $$$internal$$reject(promise, e);
        }
      }

      function $$$enumerator$$makeSettledResult(state, position, value) {
        if (state === $$$internal$$FULFILLED) {
          return {
            state: 'fulfilled',
            value: value
          };
        } else {
          return {
            state: 'rejected',
            reason: value
          };
        }
      }

      function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor($$$internal$$noop, label);
        this._abortOnReject = abortOnReject;

        if (this._validateInput(input)) {
          this._input     = input;
          this.length     = input.length;
          this._remaining = input.length;

          this._init();

          if (this.length === 0) {
            $$$internal$$fulfill(this.promise, this._result);
          } else {
            this.length = this.length || 0;
            this._enumerate();
            if (this._remaining === 0) {
              $$$internal$$fulfill(this.promise, this._result);
            }
          }
        } else {
          $$$internal$$reject(this.promise, this._validationError());
        }
      }

      $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
        return $$utils$$isArray(input);
      };

      $$$enumerator$$Enumerator.prototype._validationError = function() {
        return new Error('Array Methods must be provided an Array');
      };

      $$$enumerator$$Enumerator.prototype._init = function() {
        this._result = new Array(this.length);
      };

      var $$$enumerator$$default = $$$enumerator$$Enumerator;

      $$$enumerator$$Enumerator.prototype._enumerate = function() {
        var length  = this.length;
        var promise = this.promise;
        var input   = this._input;

        for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
          this._eachEntry(input[i], i);
        }
      };

      $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
        var c = this._instanceConstructor;
        if ($$utils$$isMaybeThenable(entry)) {
          if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
            entry._onerror = null;
            this._settledAt(entry._state, i, entry._result);
          } else {
            this._willSettleAt(c.resolve(entry), i);
          }
        } else {
          this._remaining--;
          this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
        }
      };

      $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
        var promise = this.promise;

        if (promise._state === $$$internal$$PENDING) {
          this._remaining--;

          if (this._abortOnReject && state === $$$internal$$REJECTED) {
            $$$internal$$reject(promise, value);
          } else {
            this._result[i] = this._makeResult(state, i, value);
          }
        }

        if (this._remaining === 0) {
          $$$internal$$fulfill(promise, this._result);
        }
      };

      $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
        return value;
      };

      $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
        var enumerator = this;

        $$$internal$$subscribe(promise, undefined, function(value) {
          enumerator._settledAt($$$internal$$FULFILLED, i, value);
        }, function(reason) {
          enumerator._settledAt($$$internal$$REJECTED, i, reason);
        });
      };

      var $$promise$all$$default = function all(entries, label) {
        return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
      };

      var $$promise$race$$default = function race(entries, label) {
        /*jshint validthis:true */
        var Constructor = this;

        var promise = new Constructor($$$internal$$noop, label);

        if (!$$utils$$isArray(entries)) {
          $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
          return promise;
        }

        var length = entries.length;

        function onFulfillment(value) {
          $$$internal$$resolve(promise, value);
        }

        function onRejection(reason) {
          $$$internal$$reject(promise, reason);
        }

        for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
          $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
        }

        return promise;
      };

      var $$promise$resolve$$default = function resolve(object, label) {
        /*jshint validthis:true */
        var Constructor = this;

        if (object && typeof object === 'object' && object.constructor === Constructor) {
          return object;
        }

        var promise = new Constructor($$$internal$$noop, label);
        $$$internal$$resolve(promise, object);
        return promise;
      };

      var $$promise$reject$$default = function reject(reason, label) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor($$$internal$$noop, label);
        $$$internal$$reject(promise, reason);
        return promise;
      };

      var $$es6$promise$promise$$counter = 0;

      function $$es6$promise$promise$$needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      }

      function $$es6$promise$promise$$needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }

      var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

      /**
       Promise objects represent the eventual result of an asynchronous operation. The
       primary way of interacting with a promise is through its `then` method, which
       registers callbacks to receive either a promise’s eventual value or the reason
       why the promise cannot be fulfilled.

       Terminology
       -----------

       - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
       - `thenable` is an object or function that defines a `then` method.
       - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
       - `exception` is a value that is thrown using the throw statement.
       - `reason` is a value that indicates why a promise was rejected.
       - `settled` the final resting state of a promise, fulfilled or rejected.

       A promise can be in one of three states: pending, fulfilled, or rejected.

       Promises that are fulfilled have a fulfillment value and are in the fulfilled
       state.  Promises that are rejected have a rejection reason and are in the
       rejected state.  A fulfillment value is never a thenable.

       Promises can also be said to *resolve* a value.  If this value is also a
       promise, then the original promise's settled state will match the value's
       settled state.  So a promise that *resolves* a promise that rejects will
       itself reject, and a promise that *resolves* a promise that fulfills will
       itself fulfill.


       Basic Usage:
       ------------

       ```js
       var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

       promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
       ```

       Advanced Usage:
       ---------------

       Promises shine when abstracting away asynchronous interactions such as
       `XMLHttpRequest`s.

       ```js
       function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

       getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
       ```

       Unlike callbacks, promises are great composable primitives.

       ```js
       Promise.all([
       getJSON('/posts'),
       getJSON('/comments')
       ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
       ```

       @class Promise
       @param {function} resolver
       Useful for tooling.
       @constructor
       */
      function $$es6$promise$promise$$Promise(resolver) {
        this._id = $$es6$promise$promise$$counter++;
        this._state = undefined;
        this._result = undefined;
        this._subscribers = [];

        if ($$$internal$$noop !== resolver) {
          if (!$$utils$$isFunction(resolver)) {
            $$es6$promise$promise$$needsResolver();
          }

          if (!(this instanceof $$es6$promise$promise$$Promise)) {
            $$es6$promise$promise$$needsNew();
          }

          $$$internal$$initializePromise(this, resolver);
        }
      }

      $$es6$promise$promise$$Promise.all = $$promise$all$$default;
      $$es6$promise$promise$$Promise.race = $$promise$race$$default;
      $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
      $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

      $$es6$promise$promise$$Promise.prototype = {
        constructor: $$es6$promise$promise$$Promise,

        /**
         The primary way of interacting with a promise is through its `then` method,
         which registers callbacks to receive either a promise's eventual value or the
         reason why the promise cannot be fulfilled.

         ```js
         findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
         ```

         Chaining
         --------

         The return value of `then` is itself a promise.  This second, 'downstream'
         promise is resolved with the return value of the first promise's fulfillment
         or rejection handler, or rejected if the handler throws an exception.

         ```js
         findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

         findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
         ```
         If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

         ```js
         findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
         ```

         Assimilation
         ------------

         Sometimes the value you want to propagate to a downstream promise can only be
         retrieved asynchronously. This can be achieved by returning a promise in the
         fulfillment or rejection handler. The downstream promise will then be pending
         until the returned promise is settled. This is called *assimilation*.

         ```js
         findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
         ```

         If the assimliated promise rejects, then the downstream promise will also reject.

         ```js
         findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
         ```

         Simple Example
         --------------

         Synchronous Example

         ```javascript
         var result;

         try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
         ```

         Errback Example

         ```js
         findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
         ```

         Promise Example;

         ```javascript
         findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
         ```

         Advanced Example
         --------------

         Synchronous Example

         ```javascript
         var author, books;

         try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
         ```

         Errback Example

         ```js

         function foundBooks(books) {

      }

         function failure(reason) {

      }

         findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
         ```

         Promise Example;

         ```javascript
         findAuthor().
         then(findBooksByAuthor).
         then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
         ```

         @method then
         @param {Function} onFulfilled
         @param {Function} onRejected
         Useful for tooling.
         @return {Promise}
         */
        then: function(onFulfillment, onRejection) {
          var parent = this;
          var state = parent._state;

          if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
            return this;
          }

          var child = new this.constructor($$$internal$$noop);
          var result = parent._result;

          if (state) {
            var callback = arguments[state - 1];
            $$asap$$default(function(){
              $$$internal$$invokeCallback(state, child, callback, result);
            });
          } else {
            $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
          }

          return child;
        },

        /**
         `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
         as the catch block of a try/catch statement.

         ```js
         function findAuthor(){
        throw new Error('couldn't find that author');
      }

         // synchronous
         try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

         // async with promises
         findAuthor().catch(function(reason){
        // something went wrong
      });
         ```

         @method catch
         @param {Function} onRejection
         Useful for tooling.
         @return {Promise}
         */
        'catch': function(onRejection) {
          return this.then(null, onRejection);
        }
      };

      var $$es6$promise$polyfill$$default = function polyfill() {
        var local;

        if (typeof global !== 'undefined') {
          local = global;
        } else if (typeof window !== 'undefined' && window.document) {
          local = window;
        } else {
          local = self;
        }

        var es6PromiseSupport =
            "Promise" in local &&
              // Some of these methods are missing from
              // Firefox/Chrome experimental implementations
            "resolve" in local.Promise &&
            "reject" in local.Promise &&
            "all" in local.Promise &&
            "race" in local.Promise &&
              // Older version of the spec had a resolver object
              // as the arg rather than a function
            (function() {
              var resolve;
              new local.Promise(function(r) { resolve = r; });
              return $$utils$$isFunction(resolve);
            }());

        if (!es6PromiseSupport) {
          local.Promise = $$es6$promise$promise$$default;
        }
      };

      var es6$promise$umd$$ES6Promise = {
        'Promise': $$es6$promise$promise$$default,
        'polyfill': $$es6$promise$polyfill$$default
      };

      /* global define:true module:true window: true */
      if (typeof define === 'function' && define['amd']) {
        define(function() { return es6$promise$umd$$ES6Promise; });
      } else if (typeof module !== 'undefined' && module['exports']) {
        module['exports'] = es6$promise$umd$$ES6Promise;
      } else if (typeof this !== 'undefined') {
        this['ES6Promise'] = es6$promise$umd$$ES6Promise;
      }
    }).call(this);
  }).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

  var process = module.exports = {};
  var queue = [];
  var draining = false;

  function drainQueue() {
    if (draining) {
      return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };

  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues

  function noop() {}

  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;

  process.binding = function (name) {
    throw new Error('process.binding is not supported');
  };

// TODO(shtylman)
  process.cwd = function () { return '/' };
  process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
  (function (global){
    /*! http://mths.be/punycode v1.2.4 by @mathias */
    ;(function(root) {

      /** Detect free variables */
      var freeExports = typeof exports == 'object' && exports;
      var freeModule = typeof module == 'object' && module &&
          module.exports == freeExports && module;
      var freeGlobal = typeof global == 'object' && global;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }

      /**
       * The `punycode` object.
       * @name punycode
       * @type Object
       */
      var punycode,

          /** Highest positive signed 32-bit float value */
          maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

          /** Bootstring parameters */
          base = 36,
          tMin = 1,
          tMax = 26,
          skew = 38,
          damp = 700,
          initialBias = 72,
          initialN = 128, // 0x80
          delimiter = '-', // '\x2D'

          /** Regular expressions */
          regexPunycode = /^xn--/,
          regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
          regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

          /** Error messages */
          errors = {
            'overflow': 'Overflow: input needs wider integers to process',
            'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
            'invalid-input': 'Invalid input'
          },

          /** Convenience shortcuts */
          baseMinusTMin = base - tMin,
          floor = Math.floor,
          stringFromCharCode = String.fromCharCode,

          /** Temporary variable */
          key;

      /*--------------------------------------------------------------------------*/

      /**
       * A generic error utility function.
       * @private
       * @param {String} type The error type.
       * @returns {Error} Throws a `RangeError` with the applicable error message.
       */
      function error(type) {
        throw RangeError(errors[type]);
      }

      /**
       * A generic `Array#map` utility function.
       * @private
       * @param {Array} array The array to iterate over.
       * @param {Function} callback The function that gets called for every array
       * item.
       * @returns {Array} A new array of values returned by the callback function.
       */
      function map(array, fn) {
        var length = array.length;
        while (length--) {
          array[length] = fn(array[length]);
        }
        return array;
      }

      /**
       * A simple `Array#map`-like wrapper to work with domain name strings.
       * @private
       * @param {String} domain The domain name.
       * @param {Function} callback The function that gets called for every
       * character.
       * @returns {Array} A new string of characters returned by the callback
       * function.
       */
      function mapDomain(string, fn) {
        return map(string.split(regexSeparators), fn).join('.');
      }

      /**
       * Creates an array containing the numeric code points of each Unicode
       * character in the string. While JavaScript uses UCS-2 internally,
       * this function will convert a pair of surrogate halves (each of which
       * UCS-2 exposes as separate characters) into a single code point,
       * matching UTF-16.
       * @see `punycode.ucs2.encode`
       * @see <http://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode.ucs2
       * @name decode
       * @param {String} string The Unicode input string (UCS-2).
       * @returns {Array} The new array of code points.
       */
      function ucs2decode(string) {
        var output = [],
            counter = 0,
            length = string.length,
            value,
            extra;
        while (counter < length) {
          value = string.charCodeAt(counter++);
          if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // high surrogate, and there is a next character
            extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) { // low surrogate
              output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
              // unmatched surrogate; only append this code unit, in case the next
              // code unit is the high surrogate of a surrogate pair
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }

      /**
       * Creates a string based on an array of numeric code points.
       * @see `punycode.ucs2.decode`
       * @memberOf punycode.ucs2
       * @name encode
       * @param {Array} codePoints The array of numeric code points.
       * @returns {String} The new Unicode string (UCS-2).
       */
      function ucs2encode(array) {
        return map(array, function(value) {
          var output = '';
          if (value > 0xFFFF) {
            value -= 0x10000;
            output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
            value = 0xDC00 | value & 0x3FF;
          }
          output += stringFromCharCode(value);
          return output;
        }).join('');
      }

      /**
       * Converts a basic code point into a digit/integer.
       * @see `digitToBasic()`
       * @private
       * @param {Number} codePoint The basic numeric code point value.
       * @returns {Number} The numeric value of a basic code point (for use in
       * representing integers) in the range `0` to `base - 1`, or `base` if
       * the code point does not represent a value.
       */
      function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      }

      /**
       * Converts a digit/integer into a basic code point.
       * @see `basicToDigit()`
       * @private
       * @param {Number} digit The numeric value of a basic code point.
       * @returns {Number} The basic code point whose value (when used for
       * representing integers) is `digit`, which needs to be in the range
       * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
       * used; else, the lowercase form is used. The behavior is undefined
       * if `flag` is non-zero and `digit` has no uppercase form.
       */
      function digitToBasic(digit, flag) {
        //  0..25 map to ASCII a..z or A..Z
        // 26..35 map to ASCII 0..9
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      }

      /**
       * Bias adaptation function as per section 3.4 of RFC 3492.
       * http://tools.ietf.org/html/rfc3492#section-3.4
       * @private
       */
      function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      }

      /**
       * Converts a Punycode string of ASCII-only symbols to a string of Unicode
       * symbols.
       * @memberOf punycode
       * @param {String} input The Punycode string of ASCII-only symbols.
       * @returns {String} The resulting string of Unicode symbols.
       */
      function decode(input) {
        // Don't use UCS-2
        var output = [],
            inputLength = input.length,
            out,
            i = 0,
            n = initialN,
            bias = initialBias,
            basic,
            j,
            index,
            oldi,
            w,
            k,
            digit,
            t,
            /** Cached calculation results */
            baseMinusT;

        // Handle the basic code points: let `basic` be the number of input code
        // points before the last delimiter, or `0` if there is none, then copy
        // the first basic code points to the output.

        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }

        for (j = 0; j < basic; ++j) {
          // if it's not a basic code point
          if (input.charCodeAt(j) >= 0x80) {
            error('not-basic');
          }
          output.push(input.charCodeAt(j));
        }

        // Main decoding loop: start just after the last delimiter if any basic code
        // points were copied; start at the beginning otherwise.

        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

          // `index` is the index of the next character to be consumed.
          // Decode a generalized variable-length integer into `delta`,
          // which gets added to `i`. The overflow checking is easier
          // if we increase `i` as we go, then subtract off its starting
          // value at the end to obtain `delta`.
          for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

            if (index >= inputLength) {
              error('invalid-input');
            }

            digit = basicToDigit(input.charCodeAt(index++));

            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error('overflow');
            }

            i += digit * w;
            t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

            if (digit < t) {
              break;
            }

            baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error('overflow');
            }

            w *= baseMinusT;

          }

          out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);

          // `i` was supposed to wrap around from `out` to `0`,
          // incrementing `n` each time, so we'll fix that now:
          if (floor(i / out) > maxInt - n) {
            error('overflow');
          }

          n += floor(i / out);
          i %= out;

          // Insert `n` at position `i` of the output
          output.splice(i++, 0, n);

        }

        return ucs2encode(output);
      }

      /**
       * Converts a string of Unicode symbols to a Punycode string of ASCII-only
       * symbols.
       * @memberOf punycode
       * @param {String} input The string of Unicode symbols.
       * @returns {String} The resulting Punycode string of ASCII-only symbols.
       */
      function encode(input) {
        var n,
            delta,
            handledCPCount,
            basicLength,
            bias,
            j,
            m,
            q,
            k,
            t,
            currentValue,
            output = [],
            /** `inputLength` will hold the number of code points in `input`. */
            inputLength,
            /** Cached calculation results */
            handledCPCountPlusOne,
            baseMinusT,
            qMinusT;

        // Convert the input in UCS-2 to Unicode
        input = ucs2decode(input);

        // Cache the length
        inputLength = input.length;

        // Initialize the state
        n = initialN;
        delta = 0;
        bias = initialBias;

        // Handle the basic code points
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < 0x80) {
            output.push(stringFromCharCode(currentValue));
          }
        }

        handledCPCount = basicLength = output.length;

        // `handledCPCount` is the number of code points that have been handled;
        // `basicLength` is the number of basic code points.

        // Finish the basic string - if it is not empty - with a delimiter
        if (basicLength) {
          output.push(delimiter);
        }

        // Main encoding loop:
        while (handledCPCount < inputLength) {

          // All non-basic code points < n have been handled already. Find the next
          // larger one:
          for (m = maxInt, j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue >= n && currentValue < m) {
              m = currentValue;
            }
          }

          // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
          // but guard against overflow
          handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error('overflow');
          }

          delta += (m - n) * handledCPCountPlusOne;
          n = m;

          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];

            if (currentValue < n && ++delta > maxInt) {
              error('overflow');
            }

            if (currentValue == n) {
              // Represent delta as a generalized variable-length integer
              for (q = delta, k = base; /* no condition */; k += base) {
                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                if (q < t) {
                  break;
                }
                qMinusT = q - t;
                baseMinusT = base - t;
                output.push(
                    stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                );
                q = floor(qMinusT / baseMinusT);
              }

              output.push(stringFromCharCode(digitToBasic(q, 0)));
              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
              delta = 0;
              ++handledCPCount;
            }
          }

          ++delta;
          ++n;

        }
        return output.join('');
      }

      /**
       * Converts a Punycode string representing a domain name to Unicode. Only the
       * Punycoded parts of the domain name will be converted, i.e. it doesn't
       * matter if you call it on a string that has already been converted to
       * Unicode.
       * @memberOf punycode
       * @param {String} domain The Punycode domain name to convert to Unicode.
       * @returns {String} The Unicode representation of the given Punycode
       * string.
       */
      function toUnicode(domain) {
        return mapDomain(domain, function(string) {
          return regexPunycode.test(string)
              ? decode(string.slice(4).toLowerCase())
              : string;
        });
      }

      /**
       * Converts a Unicode string representing a domain name to Punycode. Only the
       * non-ASCII parts of the domain name will be converted, i.e. it doesn't
       * matter if you call it with a domain that's already in ASCII.
       * @memberOf punycode
       * @param {String} domain The domain name to convert, as a Unicode string.
       * @returns {String} The Punycode representation of the given domain name.
       */
      function toASCII(domain) {
        return mapDomain(domain, function(string) {
          return regexNonASCII.test(string)
              ? 'xn--' + encode(string)
              : string;
        });
      }

      /*--------------------------------------------------------------------------*/

      /** Define the public API */
      punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        'version': '1.2.4',
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <http://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        'ucs2': {
          'decode': ucs2decode,
          'encode': ucs2encode
        },
        'decode': decode,
        'encode': encode,
        'toASCII': toASCII,
        'toUnicode': toUnicode
      };

      /** Expose `punycode` */
      // Some AMD build optimizers, like r.js, check for specific condition patterns
      // like the following:
      if (
          typeof define == 'function' &&
          typeof define.amd == 'object' &&
          define.amd
      ) {
        define('punycode', function() {
          return punycode;
        });
      } else if (freeExports && !freeExports.nodeType) {
        if (freeModule) { // in Node.js or RingoJS v0.8.0+
          freeModule.exports = punycode;
        } else { // in Narwhal or RingoJS v0.7.0-
          for (key in punycode) {
            punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
          }
        }
      } else { // in Rhino or a web browser
        root.punycode = punycode;
      }

    }(this));

  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
  var log = require('./log');
  var Promise = require('./promise');

  function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
      ownerDocument.defaultView.scrollTo(x, y);
    }
  }

  function cloneCanvasContents(canvas, clonedCanvas) {
    try {
      if (clonedCanvas) {
        clonedCanvas.width = canvas.width;
        clonedCanvas.height = canvas.height;
        clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
      }
    } catch(e) {
      log("Unable to copy canvas content from", canvas, e);
    }
  }

  function cloneNode(node, javascriptEnabled) {
    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

    var child = node.firstChild;
    while(child) {
      if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
        clone.appendChild(cloneNode(child, javascriptEnabled));
      }
      child = child.nextSibling;
    }

    if (node.nodeType === 1) {
      clone._scrollTop = node.scrollTop;
      clone._scrollLeft = node.scrollLeft;
      if (node.nodeName === "CANVAS") {
        cloneCanvasContents(node, clone);
      } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
        clone.value = node.value;
      }
    }

    return clone;
  }

  function initNode(node) {
    if (node.nodeType === 1) {
      node.scrollTop = node._scrollTop;
      node.scrollLeft = node._scrollLeft;

      var child = node.firstChild;
      while(child) {
        initNode(child);
        child = child.nextSibling;
      }
    }
  }

  module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
    var container = containerDocument.createElement("iframe");

    container.className = "html2canvas-container";
    container.style.visibility = "hidden";
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0px";
    container.style.border = "0";
    container.width = width;
    container.height = height;
    container.scrolling = "no"; // ios won't scroll without it
    containerDocument.body.appendChild(container);

    return new Promise(function(resolve) {
      var documentClone = container.contentWindow.document;

      /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
       if window url is about:blank, we can assign the url to current by writing onto the document
       */
      container.contentWindow.onload = container.onload = function() {
        var interval = setInterval(function() {
          if (documentClone.body.childNodes.length > 0) {
            initNode(documentClone.documentElement);
            clearInterval(interval);
            if (options.type === "view") {
              container.contentWindow.scrollTo(x, y);
            }
            resolve(container);
          }
        }, 50);
      };

      documentClone.open();
      documentClone.write("<!DOCTYPE html><html></html>");
      // Chrome scrolls the parent document for some reason after the write to the cloned window???
      restoreOwnerScroll(ownerDocument, x, y);
      documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
      documentClone.close();
    });
  };

},{"./log":15,"./promise":18}],5:[function(require,module,exports){
// http://dev.w3.org/csswg/css-color/

  function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = null;
    var result = this.fromArray(value) ||
        this.namedColor(value) ||
        this.rgb(value) ||
        this.rgba(value) ||
        this.hex6(value) ||
        this.hex3(value);
  }

  Color.prototype.darken = function(amount) {
    var a = 1 - amount;
    return  new Color([
      Math.round(this.r * a),
      Math.round(this.g * a),
      Math.round(this.b * a),
      this.a
    ]);
  };

  Color.prototype.isTransparent = function() {
    return this.a === 0;
  };

  Color.prototype.isBlack = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
  };

  Color.prototype.fromArray = function(array) {
    if (Array.isArray(array)) {
      this.r = Math.min(array[0], 255);
      this.g = Math.min(array[1], 255);
      this.b = Math.min(array[2], 255);
      if (array.length > 3) {
        this.a = array[3];
      }
    }

    return (Array.isArray(array));
  };

  var _hex3 = /^#([a-f0-9]{3})$/i;

  Color.prototype.hex3 = function(value) {
    var match = null;
    if ((match = value.match(_hex3)) !== null) {
      this.r = parseInt(match[1][0] + match[1][0], 16);
      this.g = parseInt(match[1][1] + match[1][1], 16);
      this.b = parseInt(match[1][2] + match[1][2], 16);
    }
    return match !== null;
  };

  var _hex6 = /^#([a-f0-9]{6})$/i;

  Color.prototype.hex6 = function(value) {
    var match = null;
    if ((match = value.match(_hex6)) !== null) {
      this.r = parseInt(match[1].substring(0, 2), 16);
      this.g = parseInt(match[1].substring(2, 4), 16);
      this.b = parseInt(match[1].substring(4, 6), 16);
    }
    return match !== null;
  };


  var _rgb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;

  Color.prototype.rgb = function(value) {
    var match = null;
    if ((match = value.match(_rgb)) !== null) {
      this.r = Number(match[1]);
      this.g = Number(match[2]);
      this.b = Number(match[3]);
    }
    return match !== null;
  };

  var _rgba = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;

  Color.prototype.rgba = function(value) {
    var match = null;
    if ((match = value.match(_rgba)) !== null) {
      this.r = Number(match[1]);
      this.g = Number(match[2]);
      this.b = Number(match[3]);
      this.a = Number(match[4]);
    }
    return match !== null;
  };

  Color.prototype.toString = function() {
    return this.a !== null && this.a !== 1 ?
    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
  };

  Color.prototype.namedColor = function(value) {
    var color = colors[value.toLowerCase()];
    if (color) {
      this.r = color[0];
      this.g = color[1];
      this.b = color[2];
    } else if (value.toLowerCase() === "transparent") {
      this.r = this.g = this.b = this.a = 0;
      return true;
    }

    return !!color;
  };

  Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
  var colors = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };

  module.exports = Color;

},{}],6:[function(require,module,exports){
  var Promise = require('./promise');
  var Support = require('./support');
  var CanvasRenderer = require('./renderers/canvas');
  var ImageLoader = require('./imageloader');
  var NodeParser = require('./nodeparser');
  var NodeContainer = require('./nodecontainer');
  var log = require('./log');
  var utils = require('./utils');
  var createWindowClone = require('./clone');
  var loadUrlDocument = require('./proxy').loadUrlDocument;
  var getBounds = utils.getBounds;

  var html2canvasNodeAttribute = "data-html2canvas-node";
  var html2canvasCloneIndex = 0;

  function html2canvas(nodeList, options) {
    var index = html2canvasCloneIndex++;
    options = options || {};
    if (options.logging) {
      window.html2canvas.logging = true;
      window.html2canvas.start = Date.now();
    }

    options.async = typeof(options.async) === "undefined" ? true : options.async;
    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
    options.strict = !!options.strict;

    if (typeof(nodeList) === "string") {
      if (typeof(options.proxy) !== "string") {
        return Promise.reject("Proxy must be used when rendering url");
      }
      var width = options.width != null ? options.width : window.innerWidth;
      var height = options.height != null ? options.height : window.innerHeight;
      return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
        return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
      });
    }

    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
    node.setAttribute(html2canvasNodeAttribute + index, index);
    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
      if (typeof(options.onrendered) === "function") {
        log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
        options.onrendered(canvas);
      }
      return canvas;
    });
  }

  html2canvas.Promise = Promise;
  html2canvas.CanvasRenderer = CanvasRenderer;
  html2canvas.NodeContainer = NodeContainer;
  html2canvas.log = log;
  html2canvas.utils = utils;

  module.exports = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
    return Promise.reject("No canvas support");
  } : html2canvas;

  function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
      log("Document cloned");
      var attributeName = html2canvasNodeAttribute + html2canvasIndex;
      var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
      document.querySelector(selector).removeAttribute(attributeName);
      var clonedWindow = container.contentWindow;
      var node = clonedWindow.document.querySelector(selector);
      var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
      return oncloneHandler.then(function() {
        return renderWindow(node, container, options, windowWidth, windowHeight);
      });
    });
  }

  function renderWindow(node, container, options, windowWidth, windowHeight) {
    var clonedWindow = container.contentWindow;
    var support = new Support(clonedWindow.document);
    var imageLoader = new ImageLoader(options, support);
    var bounds = getBounds(node);
    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
    var renderer = new options.renderer(width, height, imageLoader, options, document);
    var parser = new NodeParser(node, renderer, support, imageLoader, options);
    return parser.ready.then(function() {
      log("Finished rendering");
      var canvas;

      if (options.type === "view") {
        canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
      } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
        canvas = renderer.canvas;
      } else {
        canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: clonedWindow.pageXOffset, y: clonedWindow.pageYOffset});
      }

      cleanupContainer(container, options);
      return canvas;
    });
  }

  function cleanupContainer(container, options) {
    if (options.removeContainer) {
      container.parentNode.removeChild(container);
      log("Cleaned up container");
    }
  }

  function crop(canvas, bounds) {
    var croppedCanvas = document.createElement("canvas");
    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
    croppedCanvas.width = bounds.width;
    croppedCanvas.height =  bounds.height;
    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", (x2-x1), "height:", (y2-y1));
    log("Resulting crop with width", bounds.width, "and height", bounds.height, " with x", x1, "and y", y1);
    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, x2-x1, y2-y1, bounds.x, bounds.y, x2-x1, y2-y1);
    return croppedCanvas;
  }

  function documentWidth (doc) {
    return Math.max(
        Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
        Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
        Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
    );
  }

  function documentHeight (doc) {
    return Math.max(
        Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
        Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
        Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    );
  }

  function absoluteUrl(url) {
    var link = document.createElement("a");
    link.href = url;
    link.href = link.href;
    return link;
  }

},{"./clone":4,"./imageloader":13,"./log":15,"./nodecontainer":16,"./nodeparser":17,"./promise":18,"./proxy":19,"./renderers/canvas":23,"./support":25,"./utils":29}],7:[function(require,module,exports){
  var Promise = require('./promise');
  var log = require('./log');
  var smallImage = require('./utils').smallImage;

  function DummyImageContainer(src) {
    this.src = src;
    log("DummyImageContainer for", src);
    if (!this.promise || !this.image) {
      log("Initiating DummyImageContainer");
      DummyImageContainer.prototype.image = new Image();
      var image = this.image;
      DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
        image.onload = resolve;
        image.onerror = reject;
        image.src = smallImage();
        if (image.complete === true) {
          resolve(image);
        }
      });
    }
  }

  module.exports = DummyImageContainer;

},{"./log":15,"./promise":18,"./utils":29}],8:[function(require,module,exports){
  var smallImage = require('./utils').smallImage;

  function Font(family, size) {
    var container = document.createElement('div'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        sampleText = 'Hidden Text',
        baseline,
        middle;

    container.style.visibility = "hidden";
    container.style.fontFamily = family;
    container.style.fontSize = size;
    container.style.margin = 0;
    container.style.padding = 0;

    document.body.appendChild(container);

    img.src = smallImage();
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = family;
    span.style.fontSize = size;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(document.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(document.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;

    document.body.removeChild(container);

    this.baseline = baseline;
    this.lineWidth = 1;
    this.middle = middle;
  }

  module.exports = Font;

},{"./utils":29}],9:[function(require,module,exports){
  var Font = require('./font');

  function FontMetrics() {
    this.data = {};
  }

  FontMetrics.prototype.getMetrics = function(family, size) {
    if (this.data[family + "-" + size] === undefined) {
      this.data[family + "-" + size] = new Font(family, size);
    }
    return this.data[family + "-" + size];
  };

  module.exports = FontMetrics;

},{"./font":8}],10:[function(require,module,exports){
  var utils = require('./utils');
  var Promise = require('./promise');
  var getBounds = utils.getBounds;
  var loadUrlDocument = require('./proxy').loadUrlDocument;

  function FrameContainer(container, sameOrigin, options) {
    this.image = null;
    this.src = container;
    var self = this;
    var bounds = getBounds(container);
    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
      if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
        container.contentWindow.onload = container.onload = function() {
          resolve(container);
        };
      } else {
        resolve(container);
      }
    })).then(function(container) {
          var html2canvas = require('./core');
          return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
        }).then(function(canvas) {
          return self.image = canvas;
        });
  }

  FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
    var container = this.src;
    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
  };

  module.exports = FrameContainer;

},{"./core":6,"./promise":18,"./proxy":19,"./utils":29}],11:[function(require,module,exports){
  var Promise = require('./promise');

  function GradientContainer(imageData) {
    this.src = imageData.value;
    this.colorStops = [];
    this.type = null;
    this.x0 = 0.5;
    this.y0 = 0.5;
    this.x1 = 0.5;
    this.y1 = 0.5;
    this.promise = Promise.resolve(true);
  }

  GradientContainer.prototype.TYPES = {
    LINEAR: 1,
    RADIAL: 2
  };

  module.exports = GradientContainer;

},{"./promise":18}],12:[function(require,module,exports){
  var Promise = require('./promise');

  function ImageContainer(src, cors) {
    this.src = src;
    this.image = new Image();
    var self = this;
    this.tainted = null;
    this.promise = new Promise(function(resolve, reject) {
      self.image.onload = resolve;
      self.image.onerror = reject;
      if (cors) {
        self.image.crossOrigin = "anonymous";
      }
      self.image.src = src;
      if (self.image.complete === true) {
        resolve(self.image);
      }
    });
  }

  module.exports = ImageContainer;

},{"./promise":18}],13:[function(require,module,exports){
  var Promise = require('./promise');
  var log = require('./log');
  var ImageContainer = require('./imagecontainer');
  var DummyImageContainer = require('./dummyimagecontainer');
  var ProxyImageContainer = require('./proxyimagecontainer');
  var FrameContainer = require('./framecontainer');
  var SVGContainer = require('./svgcontainer');
  var SVGNodeContainer = require('./svgnodecontainer');
  var LinearGradientContainer = require('./lineargradientcontainer');
  var WebkitGradientContainer = require('./webkitgradientcontainer');
  var bind = require('./utils').bind;

  function ImageLoader(options, support) {
    this.link = null;
    this.options = options;
    this.support = support;
    this.origin = this.getOrigin(window.location.href);
  }

  ImageLoader.prototype.findImages = function(nodes) {
    var images = [];
    nodes.reduce(function(imageNodes, container) {
      switch(container.node.nodeName) {
        case "IMG":
          return imageNodes.concat([{
            args: [container.node.src],
            method: "url"
          }]);
        case "svg":
        case "IFRAME":
          return imageNodes.concat([{
            args: [container.node],
            method: container.node.nodeName
          }]);
      }
      return imageNodes;
    }, []).forEach(this.addImage(images, this.loadImage), this);
    return images;
  };

  ImageLoader.prototype.findBackgroundImage = function(images, container) {
    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
    return images;
  };

  ImageLoader.prototype.addImage = function(images, callback) {
    return function(newImage) {
      newImage.args.forEach(function(image) {
        if (!this.imageExists(images, image)) {
          images.splice(0, 0, callback.call(this, newImage));
          log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
        }
      }, this);
    };
  };

  ImageLoader.prototype.hasImageBackground = function(imageData) {
    return imageData.method !== "none";
  };

  ImageLoader.prototype.loadImage = function(imageData) {
    if (imageData.method === "url") {
      var src = imageData.args[0];
      if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
        return new SVGContainer(src);
      } else if (src.match(/data:image\/.*;base64,/i)) {
        return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
      } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
        return new ImageContainer(src, false);
      } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
        return new ImageContainer(src, true);
      } else if (this.options.proxy) {
        return new ProxyImageContainer(src, this.options.proxy);
      } else {
        return new DummyImageContainer(src);
      }
    } else if (imageData.method === "linear-gradient") {
      return new LinearGradientContainer(imageData);
    } else if (imageData.method === "gradient") {
      return new WebkitGradientContainer(imageData);
    } else if (imageData.method === "svg") {
      return new SVGNodeContainer(imageData.args[0], this.support.svg);
    } else if (imageData.method === "IFRAME") {
      return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
    } else {
      return new DummyImageContainer(imageData);
    }
  };

  ImageLoader.prototype.isSVG = function(src) {
    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
  };

  ImageLoader.prototype.imageExists = function(images, src) {
    return images.some(function(image) {
      return image.src === src;
    });
  };

  ImageLoader.prototype.isSameOrigin = function(url) {
    return (this.getOrigin(url) === this.origin);
  };

  ImageLoader.prototype.getOrigin = function(url) {
    var link = this.link || (this.link = document.createElement("a"));
    link.href = url;
    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
    return link.protocol + link.hostname + link.port;
  };

  ImageLoader.prototype.getPromise = function(container) {
    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
      var dummy = new DummyImageContainer(container.src);
      return dummy.promise.then(function(image) {
        container.image = image;
      });
    });
  };

  ImageLoader.prototype.get = function(src) {
    var found = null;
    return this.images.some(function(img) {
      return (found = img).src === src;
    }) ? found : null;
  };

  ImageLoader.prototype.fetch = function(nodes) {
    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
    this.images.forEach(function(image, index) {
      image.promise.then(function() {
        log("Succesfully loaded image #"+ (index+1), image);
      }, function(e) {
        log("Failed loading image #"+ (index+1), image, e);
      });
    });
    this.ready = Promise.all(this.images.map(this.getPromise, this));
    log("Finished searching images");
    return this;
  };

  ImageLoader.prototype.timeout = function(container, timeout) {
    var timer;
    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
      timer = setTimeout(function() {
        log("Timed out loading image", container);
        reject(container);
      }, timeout);
    })]).then(function(container) {
      clearTimeout(timer);
      return container;
    });
    promise['catch'](function() {
      clearTimeout(timer);
    });
    return promise;
  };

  module.exports = ImageLoader;

},{"./dummyimagecontainer":7,"./framecontainer":10,"./imagecontainer":12,"./lineargradientcontainer":14,"./log":15,"./promise":18,"./proxyimagecontainer":20,"./svgcontainer":26,"./svgnodecontainer":27,"./utils":29,"./webkitgradientcontainer":30}],14:[function(require,module,exports){
  var GradientContainer = require('./gradientcontainer');
  var Color = require('./color');

  function LinearGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = this.TYPES.LINEAR;

    var hasDirection = imageData.args[0].match(this.stepRegExp) === null;

    if (hasDirection) {
      imageData.args[0].split(" ").reverse().forEach(function(position) {
        switch(position) {
          case "left":
            this.x0 = 0;
            this.x1 = 1;
            break;
          case "top":
            this.y0 = 0;
            this.y1 = 1;
            break;
          case "right":
            this.x0 = 1;
            this.x1 = 0;
            break;
          case "bottom":
            this.y0 = 1;
            this.y1 = 0;
            break;
          case "to":
            var y0 = this.y0;
            var x0 = this.x0;
            this.y0 = this.y1;
            this.x0 = this.x1;
            this.x1 = x0;
            this.y1 = y0;
            break;
        }
      }, this);
    } else {
      this.y0 = 0;
      this.y1 = 1;
    }

    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
      var colorStopMatch = colorStop.replace(/transparent/g, 'rgba(0, 0, 0, 0.0)').match(this.stepRegExp);
      return {
        color: new Color(colorStopMatch[1]),
        stop: colorStopMatch[3] === "%" ? colorStopMatch[2] / 100 : null
      };
    }, this);

    if (this.colorStops[0].stop === null) {
      this.colorStops[0].stop = 0;
    }

    if (this.colorStops[this.colorStops.length - 1].stop === null) {
      this.colorStops[this.colorStops.length - 1].stop = 1;
    }

    this.colorStops.forEach(function(colorStop, index) {
      if (colorStop.stop === null) {
        this.colorStops.slice(index).some(function(find, count) {
          if (find.stop !== null) {
            colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
            return true;
          } else {
            return false;
          }
        }, this);
      }
    }, this);
  }

  LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

  LinearGradientContainer.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;

  module.exports = LinearGradientContainer;

},{"./color":5,"./gradientcontainer":11}],15:[function(require,module,exports){
  module.exports = function() {
    if (window.html2canvas.logging && window.console && window.console.log) {
      Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - window.html2canvas.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
    }
  };

},{}],16:[function(require,module,exports){
  var Color = require('./color');
  var utils = require('./utils');
  var getBounds = utils.getBounds;
  var parseBackgrounds = utils.parseBackgrounds;
  var offsetBounds = utils.offsetBounds;

  function NodeContainer(node, parent) {
    this.node = node;
    this.parent = parent;
    this.stack = null;
    this.bounds = null;
    this.borders = null;
    this.clip = [];
    this.backgroundClip = [];
    this.offsetBounds = null;
    this.visible = null;
    this.computedStyles = null;
    this.colors = {};
    this.styles = {};
    this.backgroundImages = null;
    this.transformData = null;
    this.transformMatrix = null;
    this.isPseudoElement = false;
    this.opacity = null;
  }

  NodeContainer.prototype.cloneTo = function(stack) {
    stack.visible = this.visible;
    stack.borders = this.borders;
    stack.bounds = this.bounds;
    stack.clip = this.clip;
    stack.backgroundClip = this.backgroundClip;
    stack.computedStyles = this.computedStyles;
    stack.styles = this.styles;
    stack.backgroundImages = this.backgroundImages;
    stack.opacity = this.opacity;
  };

  NodeContainer.prototype.getOpacity = function() {
    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
  };

  NodeContainer.prototype.assignStack = function(stack) {
    this.stack = stack;
    stack.children.push(this);
  };

  NodeContainer.prototype.isElementVisible = function() {
    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
    this.css('display') !== "none" &&
    this.css('visibility') !== "hidden" &&
    !this.node.hasAttribute("data-html2canvas-ignore") &&
    (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
    );
  };

  NodeContainer.prototype.css = function(attribute) {
    if (!this.computedStyles) {
      this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
    }

    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
  };

  NodeContainer.prototype.prefixedCss = function(attribute) {
    var prefixes = ["webkit", "moz", "ms", "o"];
    var value = this.css(attribute);
    if (value === undefined) {
      prefixes.some(function(prefix) {
        value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
        return value !== undefined;
      }, this);
    }
    return value === undefined ? null : value;
  };

  NodeContainer.prototype.computedStyle = function(type) {
    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
  };

  NodeContainer.prototype.cssInt = function(attribute) {
    var value = parseInt(this.css(attribute), 10);
    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
  };

  NodeContainer.prototype.color = function(attribute) {
    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
  };

  NodeContainer.prototype.cssFloat = function(attribute) {
    var value = parseFloat(this.css(attribute));
    return (isNaN(value)) ? 0 : value;
  };

  NodeContainer.prototype.fontWeight = function() {
    var weight = this.css("fontWeight");
    switch(parseInt(weight, 10)){
      case 401:
        weight = "bold";
        break;
      case 400:
        weight = "normal";
        break;
    }
    return weight;
  };

  NodeContainer.prototype.parseClip = function() {
    var matches = this.css('clip').match(this.CLIP);
    if (matches) {
      return {
        top: parseInt(matches[1], 10),
        right: parseInt(matches[2], 10),
        bottom: parseInt(matches[3], 10),
        left: parseInt(matches[4], 10)
      };
    }
    return null;
  };

  NodeContainer.prototype.parseBackgroundImages = function() {
    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
  };

  NodeContainer.prototype.cssList = function(property, index) {
    var value = (this.css(property) || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = value.trim().split(' ');
    if (value.length === 1) {
      value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
    }
    return value;
  };

  NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
    var size = this.cssList("backgroundSize", index);
    var width, height;

    if (isPercentage(size[0])) {
      width = bounds.width * parseFloat(size[0]) / 100;
    } else if (/contain|cover/.test(size[0])) {
      var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
      return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
    } else {
      width = parseInt(size[0], 10);
    }

    if (size[0] === 'auto' && size[1] === 'auto') {
      height = image.height;
    } else if (size[1] === 'auto') {
      height = width / image.width * image.height;
    } else if (isPercentage(size[1])) {
      height =  bounds.height * parseFloat(size[1]) / 100;
    } else {
      height = parseInt(size[1], 10);
    }

    if (size[0] === 'auto') {
      width = height / image.height * image.width;
    }

    return {width: width, height: height};
  };

  NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
    var position = this.cssList('backgroundPosition', index);
    var left, top;

    if (isPercentage(position[0])){
      left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
    } else {
      left = parseInt(position[0], 10);
    }

    if (position[1] === 'auto') {
      top = left / image.width * image.height;
    } else if (isPercentage(position[1])){
      top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
    } else {
      top = parseInt(position[1], 10);
    }

    if (position[0] === 'auto') {
      left = top / image.height * image.width;
    }

    return {left: left, top: top};
  };

  NodeContainer.prototype.parseBackgroundRepeat = function(index) {
    return this.cssList("backgroundRepeat", index)[0];
  };

  NodeContainer.prototype.parseTextShadows = function() {
    var textShadow = this.css("textShadow");
    var results = [];

    if (textShadow && textShadow !== 'none') {
      var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
      for (var i = 0; shadows && (i < shadows.length); i++) {
        var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
        results.push({
          color: new Color(s[0]),
          offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
          offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
          blur: s[3] ? s[3].replace('px', '') : 0
        });
      }
    }
    return results;
  };

  NodeContainer.prototype.parseTransform = function() {
    if (!this.transformData) {
      if (this.hasTransform()) {
        var offset = this.parseBounds();
        var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
        origin[0] += offset.left;
        origin[1] += offset.top;
        this.transformData = {
          origin: origin,
          matrix: this.parseTransformMatrix()
        };
      } else {
        this.transformData = {
          origin: [0, 0],
          matrix: [1, 0, 0, 1, 0, 0]
        };
      }
    }
    return this.transformData;
  };

  NodeContainer.prototype.parseTransformMatrix = function() {
    if (!this.transformMatrix) {
      var transform = this.prefixedCss("transform");
      var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
      this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
    }
    return this.transformMatrix;
  };

  NodeContainer.prototype.parseBounds = function() {
    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
  };

  NodeContainer.prototype.hasTransform = function() {
    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
  };

  NodeContainer.prototype.getValue = function() {
    var value = this.node.value || "";
    if (this.node.tagName === "SELECT") {
      value = selectionValue(this.node);
    } else if (this.node.type === "password") {
      value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
    }
    return value.length === 0 ? (this.node.placeholder || "") : value;
  };

  NodeContainer.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
  NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
  NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
  NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

  function selectionValue(node) {
    var option = node.options[node.selectedIndex || 0];
    return option ? (option.text || "") : "";
  }

  function parseMatrix(match) {
    if (match && match[1] === "matrix") {
      return match[2].split(",").map(function(s) {
        return parseFloat(s.trim());
      });
    }
  }

  function isPercentage(value) {
    return value.toString().indexOf("%") !== -1;
  }

  function removePx(str) {
    return str.replace("px", "");
  }

  function asFloat(str) {
    return parseFloat(str);
  }

  module.exports = NodeContainer;

},{"./color":5,"./utils":29}],17:[function(require,module,exports){
  var log = require('./log');
  var punycode = require('punycode');
  var NodeContainer = require('./nodecontainer');
  var TextContainer = require('./textcontainer');
  var PseudoElementContainer = require('./pseudoelementcontainer');
  var FontMetrics = require('./fontmetrics');
  var Color = require('./color');
  var Promise = require('./promise');
  var StackingContext = require('./stackingcontext');
  var utils = require('./utils');
  var bind = utils.bind;
  var getBounds = utils.getBounds;
  var parseBackgrounds = utils.parseBackgrounds;
  var offsetBounds = utils.offsetBounds;

  function NodeParser(element, renderer, support, imageLoader, options) {
    log("Starting NodeParser");
    this.renderer = renderer;
    this.options = options;
    this.range = null;
    this.support = support;
    this.renderQueue = [];
    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
    var parent = new NodeContainer(element, null);
    if (options.background) {
      renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
    }
    if (element === element.ownerDocument.documentElement) {
      // http://www.w3.org/TR/css3-background/#special-backgrounds
      var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
      renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
    }
    parent.visibile = parent.isElementVisible();
    this.createPseudoHideStyles(element.ownerDocument);
    this.disableAnimations(element.ownerDocument);
    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
      return container.visible = container.isElementVisible();
    }).map(this.getPseudoElements, this));
    this.fontMetrics = new FontMetrics();
    log("Fetched nodes, total:", this.nodes.length);
    log("Calculate overflow clips");
    this.calculateOverflowClips();
    log("Start fetching images");
    this.images = imageLoader.fetch(this.nodes.filter(isElement));
    this.ready = this.images.ready.then(bind(function() {
      log("Images loaded, starting parsing");
      log("Creating stacking contexts");
      this.createStackingContexts();
      log("Sorting stacking contexts");
      this.sortStackingContexts(this.stack);
      this.parse(this.stack);
      log("Render queue created with " + this.renderQueue.length + " items");
      return new Promise(bind(function(resolve) {
        if (!options.async) {
          this.renderQueue.forEach(this.paint, this);
          resolve();
        } else if (typeof(options.async) === "function") {
          options.async.call(this, this.renderQueue, resolve);
        } else if (this.renderQueue.length > 0){
          this.renderIndex = 0;
          this.asyncRenderer(this.renderQueue, resolve);
        } else {
          resolve();
        }
      }, this));
    }, this));
  }

  NodeParser.prototype.calculateOverflowClips = function() {
    this.nodes.forEach(function(container) {
      if (isElement(container)) {
        if (isPseudoElement(container)) {
          container.appendToDOM();
        }
        container.borders = this.parseBorders(container);
        var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
        var cssClip = container.parseClip();
        if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
          clip.push([["rect",
            container.bounds.left + cssClip.left,
            container.bounds.top + cssClip.top,
            cssClip.right - cssClip.left,
            cssClip.bottom - cssClip.top
          ]]);
        }
        container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
        container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
        if (isPseudoElement(container)) {
          container.cleanDOM();
        }
      } else if (isTextNode(container)) {
        container.clip = hasParentClip(container) ? container.parent.clip : [];
      }
      if (!isPseudoElement(container)) {
        container.bounds = null;
      }
    }, this);
  };

  function hasParentClip(container) {
    return container.parent && container.parent.clip.length;
  }

  NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
    asyncTimer = asyncTimer || Date.now();
    this.paint(queue[this.renderIndex++]);
    if (queue.length === this.renderIndex) {
      resolve();
    } else if (asyncTimer + 20 > Date.now()) {
      this.asyncRenderer(queue, resolve, asyncTimer);
    } else {
      setTimeout(bind(function() {
        this.asyncRenderer(queue, resolve);
      }, this), 0);
    }
  };

  NodeParser.prototype.createPseudoHideStyles = function(document) {
    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
    '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
  };

  NodeParser.prototype.disableAnimations = function(document) {
    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
    '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
  };

  NodeParser.prototype.createStyles = function(document, styles) {
    var hidePseudoElements = document.createElement('style');
    hidePseudoElements.innerHTML = styles;
    document.body.appendChild(hidePseudoElements);
  };

  NodeParser.prototype.getPseudoElements = function(container) {
    var nodes = [[container]];
    if (container.node.nodeType === Node.ELEMENT_NODE) {
      var before = this.getPseudoElement(container, ":before");
      var after = this.getPseudoElement(container, ":after");

      if (before) {
        nodes.push(before);
      }

      if (after) {
        nodes.push(after);
      }
    }
    return flatten(nodes);
  };

  function toCamelCase(str) {
    return str.replace(/(\-[a-z])/g, function(match){
      return match.toUpperCase().replace('-','');
    });
  }

  NodeParser.prototype.getPseudoElement = function(container, type) {
    var style = container.computedStyle(type);
    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
      return null;
    }

    var content = stripQuotes(style.content);
    var isImage = content.substr(0, 3) === 'url';
    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

    for (var i = style.length-1; i >= 0; i--) {
      var property = toCamelCase(style.item(i));
      pseudoNode.style[property] = style[property];
    }

    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

    if (isImage) {
      pseudoNode.src = parseBackgrounds(content)[0].args[0];
      return [pseudoContainer];
    } else {
      var text = document.createTextNode(content);
      pseudoNode.appendChild(text);
      return [pseudoContainer, new TextContainer(text, pseudoContainer)];
    }
  };


  NodeParser.prototype.getChildren = function(parentContainer) {
    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
      var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
      return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
    }, this));
  };

  NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
    container.cloneTo(stack);
    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
    parentStack.contexts.push(stack);
    container.stack = stack;
  };

  NodeParser.prototype.createStackingContexts = function() {
    this.nodes.forEach(function(container) {
      if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
        this.newStackingContext(container, true);
      } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
        this.newStackingContext(container, false);
      } else {
        container.assignStack(container.parent.stack);
      }
    }, this);
  };

  NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
  };

  NodeParser.prototype.isRootElement = function(container) {
    return container.parent === null;
  };

  NodeParser.prototype.sortStackingContexts = function(stack) {
    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
    stack.contexts.forEach(this.sortStackingContexts, this);
  };

  NodeParser.prototype.parseTextBounds = function(container) {
    return function(text, index, textList) {
      if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
        if (this.support.rangeBounds && !container.parent.hasTransform()) {
          var offset = textList.slice(0, index).join("").length;
          return this.getRangeBounds(container.node, offset, text.length);
        } else if (container.node && typeof(container.node.data) === "string") {
          var replacementNode = container.node.splitText(text.length);
          var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
          container.node = replacementNode;
          return bounds;
        }
      } else if(!this.support.rangeBounds || container.parent.hasTransform()){
        container.node = container.node.splitText(text.length);
      }
      return {};
    };
  };

  NodeParser.prototype.getWrapperBounds = function(node, transform) {
    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
    var parent = node.parentNode,
        backupText = node.cloneNode(true);

    wrapper.appendChild(node.cloneNode(true));
    parent.replaceChild(wrapper, node);
    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
    parent.replaceChild(backupText, wrapper);
    return bounds;
  };

  NodeParser.prototype.getRangeBounds = function(node, offset, length) {
    var range = this.range || (this.range = node.ownerDocument.createRange());
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return range.getBoundingClientRect();
  };

  function ClearTransform() {}

  NodeParser.prototype.parse = function(stack) {
    // http://www.w3.org/TR/CSS21/visuren.html#z-index
    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
    var descendantElements = stack.children.filter(isElement);
    var descendantNonFloats = descendantElements.filter(not(isFloating));
    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
    var text = stack.children.filter(isTextNode).filter(hasText);
    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
          this.renderQueue.push(container);
          if (isStackingContext(container)) {
            this.parse(container);
            this.renderQueue.push(new ClearTransform());
          }
        }, this);
  };

  NodeParser.prototype.paint = function(container) {
    try {
      if (container instanceof ClearTransform) {
        this.renderer.ctx.restore();
      } else if (isTextNode(container)) {
        if (isPseudoElement(container.parent)) {
          container.parent.appendToDOM();
        }
        this.paintText(container);
        if (isPseudoElement(container.parent)) {
          container.parent.cleanDOM();
        }
      } else {
        this.paintNode(container);
      }
    } catch(e) {
      log(e);
      if (this.options.strict) {
        throw e;
      }
    }
  };

  NodeParser.prototype.paintNode = function(container) {
    if (isStackingContext(container)) {
      this.renderer.setOpacity(container.opacity);
      this.renderer.ctx.save();
      if (container.hasTransform()) {
        this.renderer.setTransform(container.parseTransform());
      }
    }

    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
      this.paintCheckbox(container);
    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
      this.paintRadio(container);
    } else {
      this.paintElement(container);
    }
  };

  NodeParser.prototype.paintElement = function(container) {
    var bounds = container.parseBounds();
    this.renderer.clip(container.backgroundClip, function() {
      this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
    }, this);

    this.renderer.clip(container.clip, function() {
      this.renderer.renderBorders(container.borders.borders);
    }, this);

    this.renderer.clip(container.backgroundClip, function() {
      switch (container.node.nodeName) {
        case "svg":
        case "IFRAME":
          var imgContainer = this.images.get(container.node);
          if (imgContainer) {
            this.renderer.renderImage(container, bounds, container.borders, imgContainer);
          } else {
            log("Error loading <" + container.node.nodeName + ">", container.node);
          }
          break;
        case "IMG":
          var imageContainer = this.images.get(container.node.src);
          if (imageContainer) {
            this.renderer.renderImage(container, bounds, container.borders, imageContainer);
          } else {
            log("Error loading <img>", container.node.src);
          }
          break;
        case "CANVAS":
          this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
          break;
        case "SELECT":
        case "INPUT":
        case "TEXTAREA":
          this.paintFormValue(container);
          break;
      }
    }, this);
  };

  NodeParser.prototype.paintCheckbox = function(container) {
    var b = container.parseBounds();

    var size = Math.min(b.width, b.height);
    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
    var r = [3, 3];
    var radius = [r, r, r, r];
    var borders = [1,1,1,1].map(function(w) {
      return {color: new Color('#A5A5A5'), width: w};
    });

    var borderPoints = calculateCurvePoints(bounds, radius, borders);

    this.renderer.clip(container.backgroundClip, function() {
      this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
      this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
      if (container.node.checked) {
        this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
        this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
      }
    }, this);
  };

  NodeParser.prototype.paintRadio = function(container) {
    var bounds = container.parseBounds();

    var size = Math.min(bounds.width, bounds.height) - 2;

    this.renderer.clip(container.backgroundClip, function() {
      this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
      if (container.node.checked) {
        this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
      }
    }, this);
  };

  NodeParser.prototype.paintFormValue = function(container) {
    var value = container.getValue();
    if (value.length > 0) {
      var document = container.node.ownerDocument;
      var wrapper = document.createElement('html2canvaswrapper');
      var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
        'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
        'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
        'boxSizing', 'whiteSpace', 'wordWrap'];

      properties.forEach(function(property) {
        try {
          wrapper.style[property] = container.css(property);
        } catch(e) {
          // Older IE has issues with "border"
          log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
        }
      });
      var bounds = container.parseBounds();
      wrapper.style.position = "fixed";
      wrapper.style.left = bounds.left + "px";
      wrapper.style.top = bounds.top + "px";
      wrapper.textContent = value;
      document.body.appendChild(wrapper);
      this.paintText(new TextContainer(wrapper.firstChild, container));
      document.body.removeChild(wrapper);
    }
  };

  NodeParser.prototype.paintText = function(container) {
    container.applyTextTransform();
    var characters = punycode.ucs2.decode(container.node.data);
    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
      return punycode.ucs2.encode([character]);
    });

    var weight = container.parent.fontWeight();
    var size = container.parent.css('fontSize');
    var family = container.parent.css('fontFamily');
    var shadows = container.parent.parseTextShadows();

    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
    if (shadows.length) {
      // TODO: support multiple text shadows
      this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
    } else {
      this.renderer.clearShadow();
    }

    this.renderer.clip(container.parent.clip, function() {
      textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
        if (bounds) {
          this.renderer.text(textList[index], bounds.left, bounds.bottom);
          this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
        }
      }, this);
    }, this);
  };

  NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
    switch(container.css("textDecoration").split(" ")[0]) {
      case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
      case "overline":
        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
        break;
      case "line-through":
        // TODO try and find exact position for line-through
        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
        break;
    }
  };

  var borderColorTransforms = {
    inset: [
      ["darken", 0.60],
      ["darken", 0.10],
      ["darken", 0.10],
      ["darken", 0.60]
    ]
  };

  NodeParser.prototype.parseBorders = function(container) {
    var nodeBounds = container.parseBounds();
    var radius = getBorderRadiusData(container);
    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
      var style = container.css('border' + side + 'Style');
      var color = container.color('border' + side + 'Color');
      if (style === "inset" && color.isBlack()) {
        color = new Color([255, 255, 255, color.a]); // this is wrong, but
      }
      var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
      return {
        width: container.cssInt('border' + side + 'Width'),
        color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
        args: null
      };
    });
    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

    return {
      clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
      borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
    };
  };

  function calculateBorders(borders, nodeBounds, borderPoints, radius) {
    return borders.map(function(border, borderSide) {
      if (border.width > 0) {
        var bx = nodeBounds.left;
        var by = nodeBounds.top;
        var bw = nodeBounds.width;
        var bh = nodeBounds.height - (borders[2].width);

        switch(borderSide) {
          case 0:
            // top border
            bh = borders[0].width;
            border.args = drawSide({
                  c1: [bx, by],
                  c2: [bx + bw, by],
                  c3: [bx + bw - borders[1].width, by + bh],
                  c4: [bx + borders[3].width, by + bh]
                }, radius[0], radius[1],
                borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
            break;
          case 1:
            // right border
            bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
            bw = borders[1].width;

            border.args = drawSide({
                  c1: [bx + bw, by],
                  c2: [bx + bw, by + bh + borders[2].width],
                  c3: [bx, by + bh],
                  c4: [bx, by + borders[0].width]
                }, radius[1], radius[2],
                borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
            break;
          case 2:
            // bottom border
            by = (by + nodeBounds.height) - (borders[2].width);
            bh = borders[2].width;
            border.args = drawSide({
                  c1: [bx + bw, by + bh],
                  c2: [bx, by + bh],
                  c3: [bx + borders[3].width, by],
                  c4: [bx + bw - borders[3].width, by]
                }, radius[2], radius[3],
                borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
            break;
          case 3:
            // left border
            bw = borders[3].width;
            border.args = drawSide({
                  c1: [bx, by + bh + borders[2].width],
                  c2: [bx, by],
                  c3: [bx + bw, by + borders[0].width],
                  c4: [bx + bw, by + bh]
                }, radius[3], radius[0],
                borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
            break;
        }
      }
      return border;
    });
  }

  NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
    var backgroundClip = container.css('backgroundClip'),
        borderArgs = [];

    switch(backgroundClip) {
      case "content-box":
      case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

      default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
  };

  function getCurvePoints(x, y, r1, r2) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = (r1) * kappa, // control point offset horizontal
        oy = (r2) * kappa, // control point offset vertical
        xm = x + r1, // x-middle
        ym = y + r2; // y-middle
    return {
      topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
      topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
      bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
      bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
    };
  }

  function calculateCurvePoints(bounds, borderRadius, borders) {
    var x = bounds.left,
        y = bounds.top,
        width = bounds.width,
        height = bounds.height,

        tlh = borderRadius[0][0],
        tlv = borderRadius[0][1],
        trh = borderRadius[1][0],
        trv = borderRadius[1][1],
        brh = borderRadius[2][0],
        brv = borderRadius[2][1],
        blh = borderRadius[3][0],
        blv = borderRadius[3][1];

    var topWidth = width - trh,
        rightHeight = height - brv,
        bottomWidth = width - brh,
        leftHeight = height - blv;

    return {
      topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
      topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
      topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
      topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
      bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
      bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
      bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
      bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
    };
  }

  function bezierCurve(start, startControl, endControl, end) {
    var lerp = function (a, b, t) {
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t
      };
    };

    return {
      start: start,
      startControl: startControl,
      endControl: endControl,
      end: end,
      subdivide: function(t) {
        var ab = lerp(start, startControl, t),
            bc = lerp(startControl, endControl, t),
            cd = lerp(endControl, end, t),
            abbc = lerp(ab, bc, t),
            bccd = lerp(bc, cd, t),
            dest = lerp(abbc, bccd, t);
        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
      },
      curveTo: function(borderArgs) {
        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
      },
      curveToReversed: function(borderArgs) {
        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
      }
    };
  }

  function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
      outer1[1].curveTo(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
      outer2[0].curveTo(borderArgs);
      borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
      inner2[0].curveToReversed(borderArgs);
    } else {
      borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
      borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
      inner1[1].curveToReversed(borderArgs);
    } else {
      borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
  }

  function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
      corner1[0].curveTo(borderArgs);
      corner1[1].curveTo(borderArgs);
    } else {
      borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
  }

  function negativeZIndex(container) {
    return container.cssInt("zIndex") < 0;
  }

  function positiveZIndex(container) {
    return container.cssInt("zIndex") > 0;
  }

  function zIndex0(container) {
    return container.cssInt("zIndex") === 0;
  }

  function inlineLevel(container) {
    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
  }

  function isStackingContext(container) {
    return (container instanceof StackingContext);
  }

  function hasText(container) {
    return container.node.data.trim().length > 0;
  }

  function noLetterSpacing(container) {
    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
  }

  function getBorderRadiusData(container) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
      var value = container.css('border' + side + 'Radius');
      var arr = value.split(" ");
      if (arr.length <= 1) {
        arr[1] = arr[0];
      }
      return arr.map(asInt);
    });
  }

  function renderableNode(node) {
    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
  }

  function isPositionedForStacking(container) {
    var position = container.css("position");
    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
    return zIndex !== "auto";
  }

  function isPositioned(container) {
    return container.css("position") !== "static";
  }

  function isFloating(container) {
    return container.css("float") !== "none";
  }

  function isInlineBlock(container) {
    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
  }

  function not(callback) {
    var context = this;
    return function() {
      return !callback.apply(context, arguments);
    };
  }

  function isElement(container) {
    return container.node.nodeType === Node.ELEMENT_NODE;
  }

  function isPseudoElement(container) {
    return container.isPseudoElement === true;
  }

  function isTextNode(container) {
    return container.node.nodeType === Node.TEXT_NODE;
  }

  function zIndexSort(contexts) {
    return function(a, b) {
      return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
    };
  }

  function hasOpacity(container) {
    return container.getOpacity() < 1;
  }

  function asInt(value) {
    return parseInt(value, 10);
  }

  function getWidth(border) {
    return border.width;
  }

  function nonIgnoredElement(nodeContainer) {
    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
  }

  function flatten(arrays) {
    return [].concat.apply([], arrays);
  }

  function stripQuotes(content) {
    var first = content.substr(0, 1);
    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
  }

  function getWords(characters) {
    var words = [], i = 0, onWordBoundary = false, word;
    while(characters.length) {
      if (isWordBoundary(characters[i]) === onWordBoundary) {
        word = characters.splice(0, i);
        if (word.length) {
          words.push(punycode.ucs2.encode(word));
        }
        onWordBoundary =! onWordBoundary;
        i = 0;
      } else {
        i++;
      }

      if (i >= characters.length) {
        word = characters.splice(0, i);
        if (word.length) {
          words.push(punycode.ucs2.encode(word));
        }
      }
    }
    return words;
  }

  function isWordBoundary(characterCode) {
    return [
          32, // <space>
          13, // \r
          10, // \n
          9, // \t
          45 // -
        ].indexOf(characterCode) !== -1;
  }

  function hasUnicode(string) {
    return (/[^\u0000-\u00ff]/).test(string);
  }

  module.exports = NodeParser;

},{"./color":5,"./fontmetrics":9,"./log":15,"./nodecontainer":16,"./promise":18,"./pseudoelementcontainer":21,"./stackingcontext":24,"./textcontainer":28,"./utils":29,"punycode":3}],18:[function(require,module,exports){
  module.exports = require('es6-promise').Promise;

},{"es6-promise":1}],19:[function(require,module,exports){
  var Promise = require('./promise');
  var XHR = require('./xhr');
  var utils = require('./utils');
  var log = require('./log');
  var createWindowClone = require('./clone');
  var decode64 = utils.decode64;

  function Proxy(src, proxyUrl, document) {
    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
    if (!proxyUrl) {
      return Promise.reject("No proxy configured");
    }
    var callback = createCallback(supportsCORS);
    var url = createProxyUrl(proxyUrl, src, callback);

    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
      return decode64(response.content);
    }));
  }
  var proxyCount = 0;

  function ProxyURL(src, proxyUrl, document) {
    var supportsCORSImage = ('crossOrigin' in new Image());
    var callback = createCallback(supportsCORSImage);
    var url = createProxyUrl(proxyUrl, src, callback);
    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
      return "data:" + response.type + ";base64," + response.content;
    }));
  }

  function jsonp(document, url, callback) {
    return new Promise(function(resolve, reject) {
      var s = document.createElement("script");
      var cleanup = function() {
        delete window.html2canvas.proxy[callback];
        document.body.removeChild(s);
      };
      window.html2canvas.proxy[callback] = function(response) {
        cleanup();
        resolve(response);
      };
      s.src = url;
      s.onerror = function(e) {
        cleanup();
        reject(e);
      };
      document.body.appendChild(s);
    });
  }

  function createCallback(useCORS) {
    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
  }

  function createProxyUrl(proxyUrl, src, callback) {
    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
  }

  function documentFromHTML(src) {
    return function(html) {
      var parser = new DOMParser(), doc;
      try {
        doc = parser.parseFromString(html, "text/html");
      } catch(e) {
        log("DOMParser not supported, falling back to createHTMLDocument");
        doc = document.implementation.createHTMLDocument("");
        try {
          doc.open();
          doc.write(html);
          doc.close();
        } catch(ee) {
          log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
          doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
        }
      }

      var b = doc.querySelector("base");
      if (!b || !b.href.host) {
        var base = doc.createElement("base");
        base.href = src;
        doc.head.insertBefore(base, doc.head.firstChild);
      }

      return doc;
    };
  }

  function loadUrlDocument(src, proxy, document, width, height, options) {
    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
      return createWindowClone(doc, document, width, height, options, 0, 0);
    });
  }

  exports.Proxy = Proxy;
  exports.ProxyURL = ProxyURL;
  exports.loadUrlDocument = loadUrlDocument;

},{"./clone":4,"./log":15,"./promise":18,"./utils":29,"./xhr":31}],20:[function(require,module,exports){
  var ProxyURL = require('./proxy').ProxyURL;
  var Promise = require('./promise');

  function ProxyImageContainer(src, proxy) {
    var link = document.createElement("a");
    link.href = src;
    src = link.href;
    this.src = src;
    this.image = new Image();
    var self = this;
    this.promise = new Promise(function(resolve, reject) {
      self.image.crossOrigin = "Anonymous";
      self.image.onload = resolve;
      self.image.onerror = reject;

      new ProxyURL(src, proxy, document).then(function(url) {
        self.image.src = url;
      })['catch'](reject);
    });
  }

  module.exports = ProxyImageContainer;

},{"./promise":18,"./proxy":19}],21:[function(require,module,exports){
  var NodeContainer = require('./nodecontainer');

  function PseudoElementContainer(node, parent, type) {
    NodeContainer.call(this, node, parent);
    this.isPseudoElement = true;
    this.before = type === ":before";
  }

  PseudoElementContainer.prototype.cloneTo = function(stack) {
    PseudoElementContainer.prototype.cloneTo.call(this, stack);
    stack.isPseudoElement = true;
    stack.before = this.before;
  };

  PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

  PseudoElementContainer.prototype.appendToDOM = function() {
    if (this.before) {
      this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
    } else {
      this.parent.node.appendChild(this.node);
    }
    this.parent.node.className += " " + this.getHideClass();
  };

  PseudoElementContainer.prototype.cleanDOM = function() {
    this.node.parentNode.removeChild(this.node);
    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
  };

  PseudoElementContainer.prototype.getHideClass = function() {
    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
  };

  PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
  PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

  module.exports = PseudoElementContainer;

},{"./nodecontainer":16}],22:[function(require,module,exports){
  var log = require('./log');

  function Renderer(width, height, images, options, document) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.options = options;
    this.document = document;
  }

  Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
    var paddingLeft = container.cssInt('paddingLeft'),
        paddingTop = container.cssInt('paddingTop'),
        paddingRight = container.cssInt('paddingRight'),
        paddingBottom = container.cssInt('paddingBottom'),
        borders = borderData.borders;

    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
    this.drawImage(
        imageContainer,
        0,
        0,
        imageContainer.image.width || width,
        imageContainer.image.height || height,
        bounds.left + paddingLeft + borders[3].width,
        bounds.top + paddingTop + borders[0].width,
        width,
        height
    );
  };

  Renderer.prototype.renderBackground = function(container, bounds, borderData) {
    if (bounds.height > 0 && bounds.width > 0) {
      this.renderBackgroundColor(container, bounds);
      this.renderBackgroundImage(container, bounds, borderData);
    }
  };

  Renderer.prototype.renderBackgroundColor = function(container, bounds) {
    var color = container.color("backgroundColor");
    if (!color.isTransparent()) {
      this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
    }
  };

  Renderer.prototype.renderBorders = function(borders) {
    borders.forEach(this.renderBorder, this);
  };

  Renderer.prototype.renderBorder = function(data) {
    if (!data.color.isTransparent() && data.args !== null) {
      this.drawShape(data.args, data.color);
    }
  };

  Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
    var backgroundImages = container.parseBackgroundImages();
    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
      switch(backgroundImage.method) {
        case "url":
          var image = this.images.get(backgroundImage.args[0]);
          if (image) {
            this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
          } else {
            log("Error loading background-image", backgroundImage.args[0]);
          }
          break;
        case "linear-gradient":
        case "gradient":
          var gradientImage = this.images.get(backgroundImage.value);
          if (gradientImage) {
            this.renderBackgroundGradient(gradientImage, bounds, borderData);
          } else {
            log("Error loading background-image", backgroundImage.args[0]);
          }
          break;
        case "none":
          break;
        default:
          log("Unknown background-image type", backgroundImage.args[0]);
      }
    }, this);
  };

  Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
    var repeat = container.parseBackgroundRepeat(index);
    switch (repeat) {
      case "repeat-x":
      case "repeat no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
        break;
      case "repeat-y":
      case "no-repeat repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
        break;
      case "no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
        break;
      default:
        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
        break;
    }
  };

  module.exports = Renderer;

},{"./log":15}],23:[function(require,module,exports){
  var Renderer = require('../renderer');
  var LinearGradientContainer = require('../lineargradientcontainer');
  var log = require('../log');

  function CanvasRenderer(width, height) {
    Renderer.apply(this, arguments);
    this.canvas = this.options.canvas || this.document.createElement("canvas");
    if (!this.options.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    this.ctx = this.canvas.getContext("2d");
    this.taintCtx = this.document.createElement("canvas").getContext("2d");
    this.ctx.textBaseline = "bottom";
    this.variables = {};
    log("Initialized CanvasRenderer with size", width, "x", height);
  }

  CanvasRenderer.prototype = Object.create(Renderer.prototype);

  CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
    return this.ctx;
  };

  CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
    this.setFillStyle(color).fillRect(left, top, width, height);
  };

  CanvasRenderer.prototype.circle = function(left, top, size, color) {
    this.setFillStyle(color);
    this.ctx.beginPath();
    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fill();
  };

  CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
    this.circle(left, top, size, color);
    this.ctx.strokeStyle = strokeColor.toString();
    this.ctx.stroke();
  };

  CanvasRenderer.prototype.drawShape = function(shape, color) {
    this.shape(shape);
    this.setFillStyle(color).fill();
  };

  CanvasRenderer.prototype.taints = function(imageContainer) {
    if (imageContainer.tainted === null) {
      this.taintCtx.drawImage(imageContainer.image, 0, 0);
      try {
        this.taintCtx.getImageData(0, 0, 1, 1);
        imageContainer.tainted = false;
      } catch(e) {
        this.taintCtx = document.createElement("canvas").getContext("2d");
        imageContainer.tainted = true;
      }
    }

    return imageContainer.tainted;
  };

  CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!this.taints(imageContainer) || this.options.allowTaint) {
      this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  };

  CanvasRenderer.prototype.clip = function(shapes, callback, context) {
    this.ctx.save();
    shapes.filter(hasEntries).forEach(function(shape) {
      this.shape(shape).clip();
    }, this);
    callback.call(context);
    this.ctx.restore();
  };

  CanvasRenderer.prototype.shape = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
      if (point[0] === "rect") {
        this.ctx.rect.apply(this.ctx, point.slice(1));
      } else {
        this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
      }
    }, this);
    this.ctx.closePath();
    return this.ctx;
  };

  CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
  };

  CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
    this.setVariable("shadowColor", color.toString())
        .setVariable("shadowOffsetY", offsetX)
        .setVariable("shadowOffsetX", offsetY)
        .setVariable("shadowBlur", blur);
  };

  CanvasRenderer.prototype.clearShadow = function() {
    this.setVariable("shadowColor", "rgba(0,0,0,0)");
  };

  CanvasRenderer.prototype.setOpacity = function(opacity) {
    this.ctx.globalAlpha = opacity;
  };

  CanvasRenderer.prototype.setTransform = function(transform) {
    this.ctx.translate(transform.origin[0], transform.origin[1]);
    this.ctx.transform.apply(this.ctx, transform.matrix);
    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
  };

  CanvasRenderer.prototype.setVariable = function(property, value) {
    if (this.variables[property] !== value) {
      this.variables[property] = this.ctx[property] = value;
    }

    return this;
  };

  CanvasRenderer.prototype.text = function(text, left, bottom) {
    this.ctx.fillText(text, left, bottom);
  };

  CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    var shape = [
      ["line", Math.round(left), Math.round(top)],
      ["line", Math.round(left + width), Math.round(top)],
      ["line", Math.round(left + width), Math.round(height + top)],
      ["line", Math.round(left), Math.round(height + top)]
    ];
    this.clip([shape], function() {
      this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
    }, this);
  };

  CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
    this.ctx.translate(offsetX, offsetY);
    this.ctx.fill();
    this.ctx.translate(-offsetX, -offsetY);
  };

  CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
      var gradient = this.ctx.createLinearGradient(
          bounds.left + bounds.width * gradientImage.x0,
          bounds.top + bounds.height * gradientImage.y0,
          bounds.left +  bounds.width * gradientImage.x1,
          bounds.top +  bounds.height * gradientImage.y1);
      gradientImage.colorStops.forEach(function(colorStop) {
        gradient.addColorStop(colorStop.stop, colorStop.color.toString());
      });
      this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
    }
  };

  CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
    var image = imageContainer.image;
    if(image.width === size.width && image.height === size.height) {
      return image;
    }

    var ctx, canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
    return canvas;
  };

  function hasEntries(array) {
    return array.length > 0;
  }

  module.exports = CanvasRenderer;

},{"../lineargradientcontainer":14,"../log":15,"../renderer":22}],24:[function(require,module,exports){
  var NodeContainer = require('./nodecontainer');

  function StackingContext(hasOwnStacking, opacity, element, parent) {
    NodeContainer.call(this, element, parent);
    this.ownStacking = hasOwnStacking;
    this.contexts = [];
    this.children = [];
    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
  }

  StackingContext.prototype = Object.create(NodeContainer.prototype);

  StackingContext.prototype.getParentStack = function(context) {
    var parentStack = (this.parent) ? this.parent.stack : null;
    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
  };

  module.exports = StackingContext;

},{"./nodecontainer":16}],25:[function(require,module,exports){
  function Support(document) {
    this.rangeBounds = this.testRangeBounds(document);
    this.cors = this.testCORS();
    this.svg = this.testSVG();
  }

  Support.prototype.testRangeBounds = function(document) {
    var range, testElement, rangeBounds, rangeHeight, support = false;

    if (document.createRange) {
      range = document.createRange();
      if (range.getBoundingClientRect) {
        testElement = document.createElement('boundtest');
        testElement.style.height = "123px";
        testElement.style.display = "block";
        document.body.appendChild(testElement);

        range.selectNode(testElement);
        rangeBounds = range.getBoundingClientRect();
        rangeHeight = rangeBounds.height;

        if (rangeHeight === 123) {
          support = true;
        }
        document.body.removeChild(testElement);
      }
    }

    return support;
  };

  Support.prototype.testCORS = function() {
    return typeof((new Image()).crossOrigin) !== "undefined";
  };

  Support.prototype.testSVG = function() {
    var img = new Image();
    var canvas = document.createElement("canvas");
    var ctx =  canvas.getContext("2d");
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    } catch(e) {
      return false;
    }
    return true;
  };

  module.exports = Support;

},{}],26:[function(require,module,exports){
  var Promise = require('./promise');
  var XHR = require('./xhr');
  var decode64 = require('./utils').decode64;

  function SVGContainer(src) {
    this.src = src;
    this.image = null;
    var self = this;

    this.promise = this.hasFabric().then(function() {
      return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
    }).then(function(svg) {
      return new Promise(function(resolve) {
        window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
      });
    });
  }

  SVGContainer.prototype.hasFabric = function() {
    return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
  };

  SVGContainer.prototype.inlineFormatting = function(src) {
    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
  };

  SVGContainer.prototype.removeContentType = function(src) {
    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
  };

  SVGContainer.prototype.isInline = function(src) {
    return (/^data:image\/svg\+xml/i.test(src));
  };

  SVGContainer.prototype.createCanvas = function(resolve) {
    var self = this;
    return function (objects, options) {
      var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
      self.image = canvas.lowerCanvasEl;
      canvas
          .setWidth(options.width)
          .setHeight(options.height)
          .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
          .renderAll();
      resolve(canvas.lowerCanvasEl);
    };
  };

  SVGContainer.prototype.decode64 = function(str) {
    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
  };

  module.exports = SVGContainer;

},{"./promise":18,"./utils":29,"./xhr":31}],27:[function(require,module,exports){
  var SVGContainer = require('./svgcontainer');
  var Promise = require('./promise');

  function SVGNodeContainer(node, _native) {
    this.src = node;
    this.image = null;
    var self = this;

    this.promise = _native ? new Promise(function(resolve, reject) {
      self.image = new Image();
      self.image.onload = resolve;
      self.image.onerror = reject;
      self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
      if (self.image.complete === true) {
        resolve(self.image);
      }
    }) : this.hasFabric().then(function() {
      return new Promise(function(resolve) {
        window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
      });
    });
  }

  SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

  module.exports = SVGNodeContainer;

},{"./promise":18,"./svgcontainer":26}],28:[function(require,module,exports){
  var NodeContainer = require('./nodecontainer');

  function TextContainer(node, parent) {
    NodeContainer.call(this, node, parent);
  }

  TextContainer.prototype = Object.create(NodeContainer.prototype);

  TextContainer.prototype.applyTextTransform = function() {
    this.node.data = this.transform(this.parent.css("textTransform"));
  };

  TextContainer.prototype.transform = function(transform) {
    var text = this.node.data;
    switch(transform){
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
      case "uppercase":
        return text.toUpperCase();
      default:
        return text;
    }
  };

  function capitalize(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
  }

  module.exports = TextContainer;

},{"./nodecontainer":16}],29:[function(require,module,exports){
  exports.smallImage = function smallImage() {
    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  };

  exports.bind = function(callback, context) {
    return function() {
      return callback.apply(context, arguments);
    };
  };

  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */

  exports.decode64 = function(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

    var output = "";

    for (i = 0; i < len; i+=4) {
      encoded1 = chars.indexOf(base64[i]);
      encoded2 = chars.indexOf(base64[i+1]);
      encoded3 = chars.indexOf(base64[i+2]);
      encoded4 = chars.indexOf(base64[i+3]);

      byte1 = (encoded1 << 2) | (encoded2 >> 4);
      byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      byte3 = ((encoded3 & 3) << 6) | encoded4;
      if (encoded3 === 64) {
        output += String.fromCharCode(byte1);
      } else if (encoded4 === 64 || encoded4 === -1) {
        output += String.fromCharCode(byte1, byte2);
      } else{
        output += String.fromCharCode(byte1, byte2, byte3);
      }
    }

    return output;
  };

  exports.getBounds = function(node) {
    if (node.getBoundingClientRect) {
      var clientRect = node.getBoundingClientRect();
      var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
      return {
        top: clientRect.top,
        bottom: clientRect.bottom || (clientRect.top + clientRect.height),
        right: clientRect.left + width,
        left: clientRect.left,
        width:  width,
        height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
      };
    }
    return {};
  };

  exports.offsetBounds = function(node) {
    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

    return {
      top: node.offsetTop + parent.top,
      bottom: node.offsetTop + node.offsetHeight + parent.top,
      right: node.offsetLeft + parent.left + node.offsetWidth,
      left: node.offsetLeft + parent.left,
      width: node.offsetWidth,
      height: node.offsetHeight
    };
  };

  exports.parseBackgrounds = function(backgroundImage) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        mode = 0, numParen = 0, quote, args;
    var appendResult = function() {
      if(method) {
        if (definition.substr(0, 1) === '"') {
          definition = definition.substr(1, definition.length - 2);
        }
        if (definition) {
          args.push(definition);
        }
        if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
          prefix = method.substr(0, prefix_i);
          method = method.substr(prefix_i);
        }
        results.push({
          prefix: prefix,
          method: method.toLowerCase(),
          value: block,
          args: args,
          image: null
        });
      }
      args = [];
      method = prefix = definition = block = '';
    };
    args = [];
    method = prefix = definition = block = '';
    backgroundImage.split("").forEach(function(c) {
      if (mode === 0 && whitespace.indexOf(c) > -1) {
        return;
      }
      switch(c) {
        case '"':
          if(!quote) {
            quote = c;
          } else if(quote === c) {
            quote = null;
          }
          break;
        case '(':
          if(quote) {
            break;
          } else if(mode === 0) {
            mode = 1;
            block += c;
            return;
          } else {
            numParen++;
          }
          break;
        case ')':
          if (quote) {
            break;
          } else if(mode === 1) {
            if(numParen === 0) {
              mode = 0;
              block += c;
              appendResult();
              return;
            } else {
              numParen--;
            }
          }
          break;

        case ',':
          if (quote) {
            break;
          } else if(mode === 0) {
            appendResult();
            return;
          } else if (mode === 1) {
            if (numParen === 0 && !method.match(/^url$/i)) {
              args.push(definition);
              definition = '';
              block += c;
              return;
            }
          }
          break;
      }

      block += c;
      if (mode === 0) {
        method += c;
      } else {
        definition += c;
      }
    });

    appendResult();
    return results;
  };

},{}],30:[function(require,module,exports){
  var GradientContainer = require('./gradientcontainer');

  function WebkitGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = (imageData.args[0] === "linear") ? this.TYPES.LINEAR : this.TYPES.RADIAL;
  }

  WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

  module.exports = WebkitGradientContainer;

},{"./gradientcontainer":11}],31:[function(require,module,exports){
  var Promise = require('./promise');

  function XHR(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.statusText));
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };

      xhr.send();
    });
  }

  module.exports = XHR;

},{"./promise":18}]},{},[6])(6)
});;/*
 var vid = new Whammy.Video();
 vid.add(canvas or data url)
 vid.compile()
 */

window.Whammy = (function(){
  // in this case, frames has a very specific meaning, which will be
  // detailed once i finish writing the code

  function toWebM(frames, outputAsArray){
    var info = checkFrames(frames);

    //max duration by cluster in milliseconds
    var CLUSTER_MAX_DURATION = 30000;

    var EBML = [
      {
        "id": 0x1a45dfa3, // EBML
        "data": [
          {
            "data": 1,
            "id": 0x4286 // EBMLVersion
          },
          {
            "data": 1,
            "id": 0x42f7 // EBMLReadVersion
          },
          {
            "data": 4,
            "id": 0x42f2 // EBMLMaxIDLength
          },
          {
            "data": 8,
            "id": 0x42f3 // EBMLMaxSizeLength
          },
          {
            "data": "webm",
            "id": 0x4282 // DocType
          },
          {
            "data": 2,
            "id": 0x4287 // DocTypeVersion
          },
          {
            "data": 2,
            "id": 0x4285 // DocTypeReadVersion
          }
        ]
      },
      {
        "id": 0x18538067, // Segment
        "data": [
          {
            "id": 0x1549a966, // Info
            "data": [
              {
                "data": 1e6, //do things in millisecs (num of nanosecs for duration scale)
                "id": 0x2ad7b1 // TimecodeScale
              },
              {
                "data": "whammy",
                "id": 0x4d80 // MuxingApp
              },
              {
                "data": "whammy",
                "id": 0x5741 // WritingApp
              },
              {
                "data": doubleToString(info.duration),
                "id": 0x4489 // Duration
              }
            ]
          },
          {
            "id": 0x1654ae6b, // Tracks
            "data": [
              {
                "id": 0xae, // TrackEntry
                "data": [
                  {
                    "data": 1,
                    "id": 0xd7 // TrackNumber
                  },
                  {
                    "data": 1,
                    "id": 0x73c5 // TrackUID
                  },
                  {
                    "data": 0,
                    "id": 0x9c // FlagLacing
                  },
                  {
                    "data": "und",
                    "id": 0x22b59c // Language
                  },
                  {
                    "data": "V_VP8",
                    "id": 0x86 // CodecID
                  },
                  {
                    "data": "VP8",
                    "id": 0x258688 // CodecName
                  },
                  {
                    "data": 1,
                    "id": 0x83 // TrackType
                  },
                  {
                    "id": 0xe0,  // Video
                    "data": [
                      {
                        "data": info.width,
                        "id": 0xb0 // PixelWidth
                      },
                      {
                        "data": info.height,
                        "id": 0xba // PixelHeight
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 0x1c53bb6b, // Cues
            "data": [
              //cue insertion point
            ]
          }

          //cluster insertion point
        ]
      }
    ];


    var segment = EBML[1];
    var cues = segment.data[2];

    //Generate clusters (max duration)
    var frameNumber = 0;
    var clusterTimecode = 0;
    while(frameNumber < frames.length){

      var cuePoint = {
        "id": 0xbb, // CuePoint
        "data": [
          {
            "data": Math.round(clusterTimecode),
            "id": 0xb3 // CueTime
          },
          {
            "id": 0xb7, // CueTrackPositions
            "data": [
              {
                "data": 1,
                "id": 0xf7 // CueTrack
              },
              {
                "data": 0, // to be filled in when we know it
                "size": 8,
                "id": 0xf1 // CueClusterPosition
              }
            ]
          }
        ]
      };

      cues.data.push(cuePoint);

      var clusterFrames = [];
      var clusterDuration = 0;
      do {
        clusterFrames.push(frames[frameNumber]);
        clusterDuration += frames[frameNumber].duration;
        frameNumber++;
      }while(frameNumber < frames.length && clusterDuration < CLUSTER_MAX_DURATION);

      var clusterCounter = 0;
      var cluster = {
        "id": 0x1f43b675, // Cluster
        "data": [
          {
            "data": Math.round(clusterTimecode),
            "id": 0xe7 // Timecode
          }
        ].concat(clusterFrames.map(function(webp){
              var block = makeSimpleBlock({
                discardable: 0,
                frame: webp.data.slice(4),
                invisible: 0,
                keyframe: 1,
                lacing: 0,
                trackNum: 1,
                timecode: Math.round(clusterCounter)
              });
              clusterCounter += webp.duration;
              return {
                data: block,
                id: 0xa3
              };
            }))
      }

      //Add cluster to segment
      segment.data.push(cluster);
      clusterTimecode += clusterDuration;
    }

    //First pass to compute cluster positions
    var position = 0;
    for(var i = 0; i < segment.data.length; i++){
      if (i >= 3) {
        cues.data[i-3].data[1].data[1].data = position;
      }
      var data = generateEBML([segment.data[i]], outputAsArray);
      position += data.size || data.byteLength || data.length;
      if (i != 2) { // not cues
        //Save results to avoid having to encode everything twice
        segment.data[i] = data;
      }
    }

    return generateEBML(EBML, outputAsArray)
  }

  // sums the lengths of all the frames and gets the duration, woo

  function checkFrames(frames){
    var width = frames[0].width,
        height = frames[0].height,
        duration = frames[0].duration;
    for(var i = 1; i < frames.length; i++){
      if(frames[i].width != width) throw "Frame " + (i + 1) + " has a different width";
      if(frames[i].height != height) throw "Frame " + (i + 1) + " has a different height";
      if(frames[i].duration < 0 || frames[i].duration > 0x7fff) throw "Frame " + (i + 1) + " has a weird duration (must be between 0 and 32767)";
      duration += frames[i].duration;
    }
    return {
      duration: duration,
      width: width,
      height: height
    };
  }


  function numToBuffer(num){
    var parts = [];
    while(num > 0){
      parts.push(num & 0xff)
      num = num >> 8
    }
    return new Uint8Array(parts.reverse());
  }

  function numToFixedBuffer(num, size){
    var parts = new Uint8Array(size);
    for(var i = size - 1; i >= 0; i--){
      parts[i] = num & 0xff;
      num = num >> 8;
    }
    return parts;
  }

  function strToBuffer(str){
    // return new Blob([str]);

    var arr = new Uint8Array(str.length);
    for(var i = 0; i < str.length; i++){
      arr[i] = str.charCodeAt(i)
    }
    return arr;
    // this is slower
    // return new Uint8Array(str.split('').map(function(e){
    // 	return e.charCodeAt(0)
    // }))
  }


  //sorry this is ugly, and sort of hard to understand exactly why this was done
  // at all really, but the reason is that there's some code below that i dont really
  // feel like understanding, and this is easier than using my brain.

  function bitsToBuffer(bits){
    var data = [];
    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
    bits = pad + bits;
    for(var i = 0; i < bits.length; i+= 8){
      data.push(parseInt(bits.substr(i,8),2))
    }
    return new Uint8Array(data);
  }

  function generateEBML(json, outputAsArray){
    var ebml = [];
    for(var i = 0; i < json.length; i++){
      if (!('id' in json[i])){
        //already encoded blob or byteArray
        ebml.push(json[i]);
        continue;
      }

      var data = json[i].data;
      if(typeof data == 'object') data = generateEBML(data, outputAsArray);
      if(typeof data == 'number') data = ('size' in json[i]) ? numToFixedBuffer(data, json[i].size) : bitsToBuffer(data.toString(2));
      if(typeof data == 'string') data = strToBuffer(data);

      if(data.length){
        var z = z;
      }

      var len = data.size || data.byteLength || data.length;
      var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
      var size_str = len.toString(2);
      var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
      var size = (new Array(zeroes)).join('0') + '1' + padded;

      //i actually dont quite understand what went on up there, so I'm not really
      //going to fix this, i'm probably just going to write some hacky thing which
      //converts that string into a buffer-esque thing

      ebml.push(numToBuffer(json[i].id));
      ebml.push(bitsToBuffer(size));
      ebml.push(data)


    }

    //output as blob or byteArray
    if(outputAsArray){
      //convert ebml to an array
      var buffer = toFlatArray(ebml)
      return new Uint8Array(buffer);
    }else{
      return new Blob(ebml, {type: "video/webm"});
    }
  }

  function toFlatArray(arr, outBuffer){
    if(outBuffer == null){
      outBuffer = [];
    }
    for(var i = 0; i < arr.length; i++){
      if(typeof arr[i] == 'object'){
        //an array
        toFlatArray(arr[i], outBuffer)
      }else{
        //a simple element
        outBuffer.push(arr[i]);
      }
    }
    return outBuffer;
  }

  //OKAY, so the following two functions are the string-based old stuff, the reason they're
  //still sort of in here, is that they're actually faster than the new blob stuff because
  //getAsFile isn't widely implemented, or at least, it doesn't work in chrome, which is the
  // only browser which supports get as webp

  //Converting between a string of 0010101001's and binary back and forth is probably inefficient
  //TODO: get rid of this function
  function toBinStr_old(bits){
    var data = '';
    var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
    bits = pad + bits;
    for(var i = 0; i < bits.length; i+= 8){
      data += String.fromCharCode(parseInt(bits.substr(i,8),2))
    }
    return data;
  }

  function generateEBML_old(json){
    var ebml = '';
    for(var i = 0; i < json.length; i++){
      var data = json[i].data;
      if(typeof data == 'object') data = generateEBML_old(data);
      if(typeof data == 'number') data = toBinStr_old(data.toString(2));

      var len = data.length;
      var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
      var size_str = len.toString(2);
      var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
      var size = (new Array(zeroes)).join('0') + '1' + padded;

      ebml += toBinStr_old(json[i].id.toString(2)) + toBinStr_old(size) + data;

    }
    return ebml;
  }

  //woot, a function that's actually written for this project!
  //this parses some json markup and makes it into that binary magic
  //which can then get shoved into the matroska comtainer (peaceably)

  function makeSimpleBlock(data){
    var flags = 0;
    if (data.keyframe) flags |= 128;
    if (data.invisible) flags |= 8;
    if (data.lacing) flags |= (data.lacing << 1);
    if (data.discardable) flags |= 1;
    if (data.trackNum > 127) {
      throw "TrackNumber > 127 not supported";
    }
    var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e){
          return String.fromCharCode(e)
        }).join('') + data.frame;

    return out;
  }

  // here's something else taken verbatim from weppy, awesome rite?

  function parseWebP(riff){
    var VP8 = riff.RIFF[0].WEBP[0];

    var frame_start = VP8.indexOf('\x9d\x01\x2a'); //A VP8 keyframe starts with the 0x9d012a header
    for(var i = 0, c = []; i < 4; i++) c[i] = VP8.charCodeAt(frame_start + 3 + i);

    var width, horizontal_scale, height, vertical_scale, tmp;

    //the code below is literally copied verbatim from the bitstream spec
    tmp = (c[1] << 8) | c[0];
    width = tmp & 0x3FFF;
    horizontal_scale = tmp >> 14;
    tmp = (c[3] << 8) | c[2];
    height = tmp & 0x3FFF;
    vertical_scale = tmp >> 14;
    return {
      width: width,
      height: height,
      data: VP8,
      riff: riff
    }
  }

  // i think i'm going off on a riff by pretending this is some known
  // idiom which i'm making a casual and brilliant pun about, but since
  // i can't find anything on google which conforms to this idiomatic
  // usage, I'm assuming this is just a consequence of some psychotic
  // break which makes me make up puns. well, enough riff-raff (aha a
  // rescue of sorts), this function was ripped wholesale from weppy

  function parseRIFF(string){
    var offset = 0;
    var chunks = {};

    while (offset < string.length) {
      var id = string.substr(offset, 4);
      var len = parseInt(string.substr(offset + 4, 4).split('').map(function(i){
        var unpadded = i.charCodeAt(0).toString(2);
        return (new Array(8 - unpadded.length + 1)).join('0') + unpadded
      }).join(''),2);
      var data = string.substr(offset + 4 + 4, len);
      offset += 4 + 4 + len;
      chunks[id] = chunks[id] || [];

      if (id == 'RIFF' || id == 'LIST') {
        chunks[id].push(parseRIFF(data));
      } else {
        chunks[id].push(data);
      }
    }
    return chunks;
  }

  // here's a little utility function that acts as a utility for other functions
  // basically, the only purpose is for encoding "Duration", which is encoded as
  // a double (considerably more difficult to encode than an integer)
  function doubleToString(num){
    return [].slice.call(
        new Uint8Array(
            (
                new Float64Array([num]) //create a float64 array
            ).buffer) //extract the array buffer
        , 0) // convert the Uint8Array into a regular array
        .map(function(e){ //since it's a regular array, we can now use map
          return String.fromCharCode(e) // encode all the bytes individually
        })
        .reverse() //correct the byte endianness (assume it's little endian for now)
        .join('') // join the bytes in holy matrimony as a string
  }

  function WhammyVideo(speed, quality){ // a more abstract-ish API
    this.frames = [];
    this.duration = 1000 / speed;
    this.quality = quality || 0.8;
  }

  WhammyVideo.prototype.add = function(frame, duration){
    if(typeof duration != 'undefined' && this.duration) throw "you can't pass a duration if the fps is set";
    if(typeof duration == 'undefined' && !this.duration) throw "if you don't have the fps set, you ned to have durations here.";
    if(frame.canvas){ //CanvasRenderingContext2D
      frame = frame.canvas;
    }
    if(frame.toDataURL){
      frame = frame.toDataURL('image/webp', this.quality)
    }else if(typeof frame != "string"){
      throw "frame must be a a HTMLCanvasElement, a CanvasRenderingContext2D or a DataURI formatted string"
    }
    if (!(/^data:image\/webp;base64,/ig).test(frame)) {
      throw "Input must be formatted properly as a base64 encoded DataURI of type image/webp";
    }
    this.frames.push({
      image: frame,
      duration: duration || this.duration
    })
  }

  WhammyVideo.prototype.compile = function(outputAsArray){
    return new toWebM(this.frames.map(function(frame){
      var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
      webp.duration = frame.duration;
      return webp;
    }), outputAsArray)
  }

  return {
    Video: WhammyVideo,
    fromImageArray: function(images, fps, outputAsArray){
      return toWebM(images.map(function(image){
        var webp = parseWebP(parseRIFF(atob(image.slice(23))))
        webp.duration = 1000 / fps;
        return webp;
      }), outputAsArray)
    },
    toWebM: toWebM
    // expose methods of madness
  }
})();// Last time updated at Feb 12, 2015, 08:32:23

// links:
// Open-Sourced: https://github.com/muaz-khan/RecordRTC
// http://cdn.WebRTC-Experiment.com/RecordRTC.js
// http://www.WebRTC-Experiment.com/RecordRTC.js (for China users)
// http://RecordRTC.org/latest.js (for China users)
// npm install recordrtc
// http://recordrtc.org/

// updates?
/*
 -. Fixed echo.
 -. You can pass "recorderType" - RecordRTC(stream, { recorderType: window.WhammyRecorder });
 -. If MediaStream is suddenly stopped in Firefox.
 -. Added "disableLogs"         - RecordRTC(stream, { disableLogs: true });
 -. You can pass "bufferSize:0" - RecordRTC(stream, { bufferSize: 0 });
 -. You can set "leftChannel"   - RecordRTC(stream, { leftChannel: true });
 -. Fixed MRecordRTC.
 -. Added functionality for analyse black frames and cut them - pull#293
 -. if you're recording GIF, you must link: https://cdn.webrtc-experiment.com/gif-recorder.js
 */

//------------------------------------

// Browsers Support::
// Chrome (all versions) [ audio/video separately ]
// Firefox ( >= 29 ) [ audio/video in single webm/mp4 container or only audio in ogg ]
// Opera (all versions) [ same as chrome ]
// Android (Chrome) [ only video ]
// Android (Opera) [ only video ]
// Android (Firefox) [ only video ]

//------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
//------------------------------------
// Note: RecordRTC.js is using 3 other libraries; you need to accept their licences as well.
//------------------------------------
// 1. RecordRTC.js
// 2. MRecordRTC.js
// 3. Cross-Browser-Declarations.js
// 4. Storage.js
// 5. MediaStreamRecorder.js
// 6. StereoRecorder.js
// 7. StereoAudioRecorder.js
// 8. CanvasRecorder.js
// 9. WhammyRecorder.js
// 10. Whammy.js
// 11. DiskStorage.js
// 12. GifRecorder.js
//------------------------------------

'use strict';
// ____________
// RecordRTC.js

/**
 * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a JavaScript-based media-recording library for modern web-browsers (supporting WebRTC getUserMedia API). It is optimized for different devices and browsers to bring all client-side (pluginfree) recording solutions in single place.
 * @summary JavaScript audio/video recording library runs top over WebRTC getUserMedia API.
 * @license {@link https://www.webrtc-experiment.com/licence/|MIT}
 * @author {@link https://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTC
 * @class
 * @example
 * var recordRTC = RecordRTC(mediaStream, {
 *     type: 'video' // audio or video or gif or canvas
 * });
 *
 * // or, you can even use keyword "new"
 * var recordRTC = new RecordRTC(mediaStream[, config]);
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

function RecordRTC(mediaStream, config) {
  config = config || {};

  if (!mediaStream) {
    throw 'MediaStream is mandatory.';
  }

  if (!config.type) {
    config.type = 'audio';
  }

  var self = this;

  function startRecording() {
    if (!config.disableLogs) {
      console.debug('started recording ' + config.type + ' stream.');
    }

    // Media Stream Recording API has not been implemented in chrome yet;
    // That's why using WebAudio API to record stereo audio in WAV format
    var Recorder = isChrome ? window.StereoRecorder : window.MediaStreamRecorder;

    // video recorder (in WebM format)
    if (config.type === 'video' && isChrome) {
      Recorder = window.WhammyRecorder;
    }

    // video recorder (in Gif format)
    if (config.type === 'gif') {
      Recorder = window.GifRecorder;
    }

    // html2canvas recording!
    if (config.type === 'canvas') {
      Recorder = window.CanvasRecorder;
    }

    if (config.recorderType) {
      Recorder = config.recorderType;
    }

    mediaRecorder = new Recorder(mediaStream);

    // Merge all data-types except "function"
    mediaRecorder = mergeProps(mediaRecorder, config);

    mediaRecorder.onAudioProcessStarted = function() {
      if (config.onAudioProcessStarted) {
        config.onAudioProcessStarted();
      }
    };

    mediaRecorder.onGifPreview = function(gif) {
      if (config.onGifPreview) {
        config.onGifPreview(gif);
      }
    };

    mediaRecorder.record();

    return self;
  }

  function stopRecording(callback) {
    if (!mediaRecorder) {
      return console.warn(WARNING);
    }

    /*jshint validthis:true */
    var recordRTC = this;

    if (!config.disableLogs) {
      console.warn('Stopped recording ' + config.type + ' stream.');
    }

    if (config.type !== 'gif') {
      mediaRecorder.stop(_callback);
    } else {
      mediaRecorder.stop();
      _callback();
    }

    function _callback() {
      for (var item in mediaRecorder) {
        if (self) {
          self[item] = mediaRecorder[item];
        }

        if (recordRTC) {
          recordRTC[item] = mediaRecorder[item];
        }
      }

      var blob = mediaRecorder.blob;
      if (callback) {
        var url = URL.createObjectURL(blob);
        callback(url);
      }

      if (!config.disableLogs) {
        console.debug(blob.type, '->', bytesToSize(blob.size));
      }

      if (!config.autoWriteToDisk) {
        return;
      }

      getDataURL(function(dataURL) {
        var parameter = {};
        parameter[config.type + 'Blob'] = dataURL;
        DiskStorage.Store(parameter);
      });
    }
  }

  function pauseRecording() {
    if (!mediaRecorder) {
      return console.warn(WARNING);
    }

    // not all libs yet having  this method
    if (mediaRecorder.pause) {
      mediaRecorder.pause();
    } else if (!config.disableLogs) {
      console.warn('This recording library is having no "pause" method.');
    }
  }

  function resumeRecording() {
    if (!mediaRecorder) {
      return console.warn(WARNING);
    }

    // not all libs yet having  this method
    if (mediaRecorder.resume) {
      mediaRecorder.resume();
    } else if (!config.disableLogs) {
      console.warn('This recording library is having no "resume" method.');
    }
  }

  function getDataURL(callback, _mediaRecorder) {
    if (!callback) {
      throw 'Pass a callback function over getDataURL.';
    }

    var blob = _mediaRecorder ? _mediaRecorder.blob : mediaRecorder.blob;

    if (!blob) {
      if (!config.disableLogs) {
        console.warn('Blob encoder did not yet finished its job.');
      }

      setTimeout(function() {
        getDataURL(callback, _mediaRecorder);
      }, 1000);
      return;
    }

    if (!!window.Worker) {
      var webWorker = processInWebWorker(function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
      });

      webWorker.onmessage = function(event) {
        callback(event.data);
      };

      webWorker.postMessage(blob);
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function(event) {
        callback(event.target.result);
      };
    }

    function processInWebWorker(_function) {
      var blob = URL.createObjectURL(new Blob([_function.toString(),
        'this.onmessage =  function (e) {readFile(e.data);}'
      ], {
        type: 'application/javascript'
      }));

      var worker = new Worker(blob);
      URL.revokeObjectURL(blob);
      return worker;
    }
  }

  var WARNING = 'It seems that "startRecording" is not invoked for ' + config.type + ' recorder.';

  var mediaRecorder;

  var returnObject = {
    /**
     * This method starts recording. It doesn't take any argument.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.startRecording();
     */
    startRecording: startRecording,

    /**
     * This method stops recording. It takes single "callback" argument. It is suggested to get blob or URI in the callback to make sure all encoders finished their jobs.
     * @param {function} callback - This callback function is invoked after completion of all encoding jobs.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function(videoURL) {
         *     video.src = videoURL;
         *     recordRTC.blob; recordRTC.buffer;
         * });
     */
    stopRecording: stopRecording,

    /**
     * This method pauses the recording process.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.pauseRecording();
     */
    pauseRecording: pauseRecording,

    /**
     * This method resumes the recording process.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.resumeRecording();
     */
    resumeRecording: resumeRecording,

    /**
     * It is equivalent to <code class="str">"recordRTC.blob"</code> property.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var blob = recordRTC.getBlob();
         *
         *     // equivalent to: recordRTC.blob property
         *     var blob = recordRTC.blob;
         * });
     */
    getBlob: function() {
      if (!mediaRecorder) {
        return console.warn(WARNING);
      }

      return mediaRecorder.blob;
    },

    /**
     * This method returns DataURL. It takes single "callback" argument.
     * @param {function} callback - DataURL is passed back over this callback.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     recordRTC.getDataURL(function(dataURL) {
         *         video.src = dataURL;
         *     });
         * });
     */
    getDataURL: getDataURL,

    /**
     * This method returns Virutal/Blob URL. It doesn't take any argument.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     video.src = recordRTC.toURL();
         * });
     */
    toURL: function() {
      if (!mediaRecorder) {
        return console.warn(WARNING);
      }

      return URL.createObjectURL(mediaRecorder.blob);
    },

    /**
     * This method saves blob/file into disk (by inovking save-as dialog). It takes single (optional) argument i.e. FileName
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     recordRTC.save('file-name');
         * });
     */
    save: function(fileName) {
      if (!mediaRecorder) {
        var that = this;
        setTimeout(function() {
          that.save(fileName);
        }, 2000);
        return console.warn(WARNING);
      }

      var hyperlink = document.createElement('a');
      hyperlink.href = URL.createObjectURL(mediaRecorder.blob);
      hyperlink.target = '_blank';
      hyperlink.download = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + mediaRecorder.blob.type.split('/')[1];

      var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });

      hyperlink.dispatchEvent(evt);

      (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
    },

    /**
     * This method gets blob from indexed-DB storage. It takes single "callback" argument.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
     */
    getFromDisk: function(callback) {
      if (!mediaRecorder) {
        return console.warn(WARNING);
      }

      RecordRTC.getFromDisk(config.type, callback);
    },

    /**
     * This method appends prepends array of webp images to the recorded video-blob. It takes an "array" object.
     * @type {Array.<Array>}
     * @param {Array} arrayOfWebPImages - Array of webp images.
     * @method
     * @memberof RecordRTC
     * @instance
     * @example
     * var arrayOfWebPImages = [];
     * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
     * recordRTC.setAdvertisementArray(arrayOfWebPImages);
     */
    setAdvertisementArray: function(arrayOfWebPImages) {
      this.advertisement = [];

      var length = arrayOfWebPImages.length;
      for (var i = 0; i < length; i++) {
        this.advertisement.push({
          duration: i,
          image: arrayOfWebPImages[i]
        });
      }
    },

    /**
     * It is equivalent to <code class="str">"recordRTC.getBlob()"</code> method.
     * @property {Blob} blob - Recorded Blob can be accessed using this property.
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var blob = recordRTC.blob;
         *
         *     // equivalent to: recordRTC.getBlob() method
         *     var blob = recordRTC.getBlob();
         * });
     */
    blob: null,

    /**
     * @todo Add descriptions.
     * @property {number} bufferSize - Either audio device's default buffer-size, or your custom value.
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var bufferSize = recordRTC.bufferSize;
         * });
     */
    bufferSize: 0,

    /**
     * @todo Add descriptions.
     * @property {number} sampleRate - Audio device's default sample rates.
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var sampleRate = recordRTC.sampleRate;
         * });
     */
    sampleRate: 0,

    /**
     * @todo Add descriptions.
     * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var buffer = recordRTC.buffer;
         * });
     */
    buffer: null,

    /**
     * @todo Add descriptions.
     * @property {DataView} view - Audio DataView, supported only in Chrome.
     * @memberof RecordRTC
     * @instance
     * @example
     * recordRTC.stopRecording(function() {
         *     var dataView = recordRTC.view;
         * });
     */
    view: null
  };

  if (!this) {
    return returnObject;
  }

  // if someone wanna use RecordRTC with "new" keyword.
  for (var prop in returnObject) {
    this[prop] = returnObject[prop];
  }

  return returnObject;
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
RecordRTC.getFromDisk = function(type, callback) {
  if (!callback) {
    throw 'callback is mandatory.';
  }

  console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
  DiskStorage.Fetch(function(dataURL, _type) {
    if (type !== 'all' && _type === type + 'Blob' && callback) {
      callback(dataURL);
    }

    if (type === 'all' && callback) {
      callback(dataURL, _type.replace('Blob', ''));
    }
  });
};

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
RecordRTC.writeToDisk = function(options) {
  console.log('Writing recorded blob(s) to disk!');
  options = options || {};
  if (options.audio && options.video && options.gif) {
    options.audio.getDataURL(function(audioDataURL) {
      options.video.getDataURL(function(videoDataURL) {
        options.gif.getDataURL(function(gifDataURL) {
          DiskStorage.Store({
            audioBlob: audioDataURL,
            videoBlob: videoDataURL,
            gifBlob: gifDataURL
          });
        });
      });
    });
  } else if (options.audio && options.video) {
    options.audio.getDataURL(function(audioDataURL) {
      options.video.getDataURL(function(videoDataURL) {
        DiskStorage.Store({
          audioBlob: audioDataURL,
          videoBlob: videoDataURL
        });
      });
    });
  } else if (options.audio && options.gif) {
    options.audio.getDataURL(function(audioDataURL) {
      options.gif.getDataURL(function(gifDataURL) {
        DiskStorage.Store({
          audioBlob: audioDataURL,
          gifBlob: gifDataURL
        });
      });
    });
  } else if (options.video && options.gif) {
    options.video.getDataURL(function(videoDataURL) {
      options.gif.getDataURL(function(gifDataURL) {
        DiskStorage.Store({
          videoBlob: videoDataURL,
          gifBlob: gifDataURL
        });
      });
    });
  } else if (options.audio) {
    options.audio.getDataURL(function(audioDataURL) {
      DiskStorage.Store({
        audioBlob: audioDataURL
      });
    });
  } else if (options.video) {
    options.video.getDataURL(function(videoDataURL) {
      DiskStorage.Store({
        videoBlob: videoDataURL
      });
    });
  } else if (options.gif) {
    options.gif.getDataURL(function(gifDataURL) {
      DiskStorage.Store({
        gifBlob: gifDataURL
      });
    });
  }
};
// _____________
// MRecordRTC.js

/**
 * MRecordRTC runs top over {@link RecordRTC} to bring multiple recordings in single place, by providing simple API.
 * @summary MRecordRTC stands for "Multiple-RecordRTC".
 * @license {@link https://www.webrtc-experiment.com/licence/|MIT}
 * @author {@link https://www.MuazKhan.com|Muaz Khan}
 * @typedef MRecordRTC
 * @class
 * @example
 * var recorder = new MRecordRTC();
 * recorder.addStream(MediaStream);
 * recorder.mediaType = {
 *     audio: true,
 *     video: true,
 *     gif: true
 * };
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
 */

function MRecordRTC(mediaStream) {

  /**
   * This method attaches MediaStream object to {@link MRecordRTC}.
   * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.addStream(MediaStream);
   */
  this.addStream = function(_mediaStream) {
    if (_mediaStream) {
      mediaStream = _mediaStream;
    }
  };

  /**
   * This property can be used to set recording type e.g. audio, or video, or gif, or canvas.
   * @property {object} mediaType - {audio: true, video: true, gif: true}
   * @memberof MRecordRTC
   * @example
   * var recorder = new MRecordRTC();
   * recorder.mediaType = {
     *     audio: true,
     *     video: true,
     *     gif  : true
     * };
   */
  this.mediaType = {
    audio: true,
    video: true
  };

  /**
   * This method starts recording.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.startRecording();
   */
  this.startRecording = function() {
    if (!isChrome && mediaStream && mediaStream.getAudioTracks && mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
      // Firefox is supporting both audio/video in single blob
      this.mediaType.audio = false;
    }

    if (this.mediaType.audio) {
      this.audioRecorder = new RecordRTC(mediaStream, {
        type: 'audio',
        bufferSize: this.bufferSize,
        sampleRate: this.sampleRate
      });
      this.audioRecorder.startRecording();
    }

    if (this.mediaType.video) {
      this.videoRecorder = new RecordRTC(mediaStream, {
        type: 'video',
        video: this.video,
        canvas: this.canvas
      });
      this.videoRecorder.startRecording();
    }

    if (this.mediaType.gif) {
      this.gifRecorder = new RecordRTC(mediaStream, {
        type: 'gif',
        frameRate: this.frameRate || 200,
        quality: this.quality || 10
      });
      this.gifRecorder.startRecording();
    }
  };

  /**
   * This method stop recording.
   * @param {function} callback - Callback function is invoked when all encoders finish their jobs.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.stopRecording(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
   */
  this.stopRecording = function(callback) {
    callback = callback || function() {};

    if (this.audioRecorder) {
      this.audioRecorder.stopRecording(function(blobURL) {
        callback(blobURL, 'audio');
      });
    }

    if (this.videoRecorder) {
      this.videoRecorder.stopRecording(function(blobURL) {
        callback(blobURL, 'video');
      });
    }

    if (this.gifRecorder) {
      this.gifRecorder.stopRecording(function(blobURL) {
        callback(blobURL, 'gif');
      });
    }
  };

  /**
   * This method can be used to manually get all recorded blobs.
   * @param {function} callback - All recorded blobs are passed back to "callback" function.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.getBlob(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
   */
  this.getBlob = function(callback) {
    var output = {};

    if (this.audioRecorder) {
      output.audio = this.audioRecorder.getBlob();
    }

    if (this.videoRecorder) {
      output.video = this.videoRecorder.getBlob();
    }

    if (this.gifRecorder) {
      output.gif = this.gifRecorder.getBlob();
    }

    if (callback) {
      callback(output);
    }
  };

  /**
   * This method can be used to manually get all recorded blobs' DataURLs.
   * @param {function} callback - All recorded blobs' DataURLs are passed back to "callback" function.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.getDataURL(function(recording){
     *     var audioDataURL = recording.audio;
     *     var videoDataURL = recording.video;
     *     var gifDataURL   = recording.gif;
     * });
   */
  this.getDataURL = function(callback) {
    this.getBlob(function(blob) {
      getDataURL(blob.audio, function(_audioDataURL) {
        getDataURL(blob.video, function(_videoDataURL) {
          callback({
            audio: _audioDataURL,
            video: _videoDataURL
          });
        });
      });
    });

    function getDataURL(blob, callback00) {
      if (!!window.Worker) {
        var webWorker = processInWebWorker(function readFile(_blob) {
          postMessage(new FileReaderSync().readAsDataURL(_blob));
        });

        webWorker.onmessage = function(event) {
          callback00(event.data);
        };

        webWorker.postMessage(blob);
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function(event) {
          callback00(event.target.result);
        };
      }
    }

    function processInWebWorker(_function) {
      var blob = URL.createObjectURL(new Blob([_function.toString(),
        'this.onmessage =  function (e) {readFile(e.data);}'
      ], {
        type: 'application/javascript'
      }));

      var worker = new Worker(blob);
      URL.revokeObjectURL(blob);
      return worker;
    }
  };

  /**
   * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.writeToDisk();
   */
  this.writeToDisk = function() {
    RecordRTC.writeToDisk({
      audio: this.audioRecorder,
      video: this.videoRecorder,
      gif: this.gifRecorder
    });
  };

  /**
   * This method can be used to invoke save-as dialog for all recorded blobs.
   * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
   * @method
   * @memberof MRecordRTC
   * @example
   * recorder.save({
     *     audio: 'audio-file-name',
     *     video: 'video-file-name',
     *     gif  : 'gif-file-name'
     * });
   */
  this.save = function(args) {
    args = args || {
      audio: true,
      video: true,
      gif: true
    };

    if (!!args.audio && this.audioRecorder) {
      this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
    }

    if (!!args.video && this.videoRecorder) {
      this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
    }
    if (!!args.gif && this.gifRecorder) {
      this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
    }
  };
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
MRecordRTC.getFromDisk = RecordRTC.getFromDisk;

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
MRecordRTC.writeToDisk = RecordRTC.writeToDisk;
// _____________________________
// Cross-Browser-Declarations.js

// animation-frame used in WebM recording
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
}

// WebAudio API representer
if (!window.AudioContext) {
  window.AudioContext = window.webkitAudioContext || window.mozAudioContext;
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (window.webkitMediaStream) {
  window.MediaStream = window.webkitMediaStream;
}

var isChrome = !!navigator.webkitGetUserMedia;

// Merge all other data-types except "function"

/**
 * @param {object} mergein - Merge another object in this object.
 * @param {object} mergeto - Merge this object in another object.
 * @returns {object} - merged object
 * @example
 * var mergedObject = mergeProps({}, {
 *     x: 10, // this will be merged
 *     y: 10, // this will be merged
 *     add: function() {} // this will be skipped
 * });
 */
function mergeProps(mergein, mergeto) {
  mergeto = reformatProps(mergeto);
  for (var t in mergeto) {
    if (typeof mergeto[t] !== 'function') {
      mergein[t] = mergeto[t];
    }
  }
  return mergein;
}

/**
 * @param {object} obj - If a property name is "sample-rate"; it will be converted into "sampleRate".
 * @returns {object} - formatted object.
 * @example
 * var mergedObject = reformatProps({
 *     'sample-rate': 44100,
 *     'buffer-size': 4096
 * });
 *
 * mergedObject.sampleRate === 44100
 * mergedObject.bufferSize === 4096
 */
function reformatProps(obj) {
  var output = {};
  for (var o in obj) {
    if (o.indexOf('-') !== -1) {
      var splitted = o.split('-');
      var name = splitted[0] + splitted[1].split('')[0].toUpperCase() + splitted[1].substr(1);
      output[name] = obj[o];
    } else {
      output[o] = obj[o];
    }
  }
  return output;
}

if (location.href.indexOf('file:') === 0) {
  console.error('Please load this HTML file on HTTP or HTTPS.');
}

// below function via: http://goo.gl/B3ae8c
/**
 * @param {number} bytes - Pass bytes and get formafted string.
 * @returns {string} - formafted string
 * @example
 * bytesToSize(1024*1024*5) === '5 GB'
 */
function bytesToSize(bytes) {
  var k = 1000;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Bytes';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
// __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
// Storage.js

/**
 * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
 * @example
 * Storage.AudioContext === webkitAudioContext
 * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
 */

var Storage = {
  AudioContext: window.AudioContext || window.webkitAudioContext
};
// ______________________
// MediaStreamRecorder.js

// todo: need to show alert boxes for incompatible cases
// encoder only supports 48k/16k mono audio channel

/*
 * Implementation of https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html
 * The MediaRecorder accepts a mediaStream as input source passed from UA. When recorder starts,
 * a MediaEncoder will be created and accept the mediaStream as input source.
 * Encoder will get the raw data by track data changes, encode it by selected MIME Type, then store the encoded in EncodedBufferCache object.
 * The encoded data will be extracted on every timeslice passed from Start function call or by RequestData function.
 * Thread model:
 * When the recorder starts, it creates a "Media Encoder" thread to read data from MediaEncoder object and store buffer in EncodedBufferCache object.
 * Also extract the encoded data and create blobs on every timeslice passed from start function or RequestData function called by UA.
 */

/**
 * MediaStreamRecorder is an abstraction layer for "MediaRecorder API". It is used by {@link RecordRTC} to record MediaStream(s) in Firefox.
 * @summary Runs top over MediaRecorder API.
 * @typedef MediaStreamRecorder
 * @class
 * @example
 * var recorder = new MediaStreamRecorder(MediaStream);
 * recorder.mimeType = 'video/webm'; // audio/ogg or video/webm
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 */

function MediaStreamRecorder(mediaStream) {
  var self = this;

  // if user chosen only audio option; and he tried to pass MediaStream with
  // both audio and video tracks;
  // using a dirty workaround to generate audio-only stream so that we can get audio/ogg output.
  if (self.mimeType && self.mimeType !== 'video/webm' && mediaStream.getVideoTracks && mediaStream.getVideoTracks().length) {
    var context = new AudioContext();
    var mediaStreamSource = context.createMediaStreamSource(mediaStream);

    var destination = context.createMediaStreamDestination();
    mediaStreamSource.connect(destination);

    mediaStream = destination.stream;
  }

  var dataAvailable = false;

  /**
   * This method records MediaStream.
   * @method
   * @memberof MediaStreamRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    // http://dxr.mozilla.org/mozilla-central/source/content/media/MediaRecorder.cpp
    // https://wiki.mozilla.org/Gecko:MediaRecorder
    // https://dvcs.w3.org/hg/dap/raw-file/default/media-stream-capture/MediaRecorder.html

    // starting a recording session; which will initiate "Reading Thread"
    // "Reading Thread" are used to prevent main-thread blocking scenarios
    mediaRecorder = new window.MediaRecorder(mediaStream);

    // Dispatching OnDataAvailable Handler
    mediaRecorder.ondataavailable = function(e) {
      if (dataAvailable) {
        return;
      }

      if (!e.data.size) {
        if (!self.disableLogs) {
          console.warn('Recording of', e.data.type, 'failed.');
        }
        return;
      }

      dataAvailable = true;

      /**
       * @property {Blob} blob - Recorded frames in video/webm blob.
       * @memberof MediaStreamRecorder
       * @example
       * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
       */
      self.blob = new Blob([e.data], {
        type: e.data.type || self.mimeType || 'audio/ogg'
      });

      if (self.callback) {
        self.callback();
      }
    };

    mediaRecorder.onerror = function(error) {
      if (!self.disableLogs) {
        console.warn(error);
      }

      // When the stream is "ended" set recording to 'inactive'
      // and stop gathering data. Callers should not rely on
      // exactness of the timeSlice value, especially
      // if the timeSlice value is small. Callers should
      // consider timeSlice as a minimum value

      mediaRecorder.stop();
      self.record(0);
    };

    // void start(optional long mTimeSlice)
    // The interval of passing encoded data from EncodedBufferCache to onDataAvailable
    // handler. "mTimeSlice < 0" means Session object does not push encoded data to
    // onDataAvailable, instead, it passive wait the client side pull encoded data
    // by calling requestData API.
    mediaRecorder.start(0);

    // Start recording. If timeSlice has been provided, mediaRecorder will
    // raise a dataavailable event containing the Blob of collected data on every timeSlice milliseconds.
    // If timeSlice isn't provided, UA should call the RequestData to obtain the Blob data, also set the mTimeSlice to zero.

    if (self.onAudioProcessStarted) {
      self.onAudioProcessStarted();
    }
  };

  /**
   * This method stops recording MediaStream.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof MediaStreamRecorder
   * @example
   * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function(callback) {
    if (!mediaRecorder) {
      return;
    }

    this.callback = callback;
    // mediaRecorder.state === 'recording' means that media recorder is associated with "session"
    // mediaRecorder.state === 'stopped' means that media recorder is detached from the "session" ... in this case; "session" will also be deleted.

    if (mediaRecorder.state === 'recording') {
      // "stop" method auto invokes "requestData"!
      // mediaRecorder.requestData();
      mediaRecorder.stop();
    }
  };

  /**
   * This method pauses the recording process.
   * @method
   * @memberof MediaStreamRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    if (!mediaRecorder) {
      return;
    }

    if (mediaRecorder.state === 'recording') {
      mediaRecorder.pause();

      if (!this.disableLogs) {
        console.debug('Paused recording.');
      }
    }
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof MediaStreamRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    if (!mediaRecorder) {
      return;
    }

    if (mediaRecorder.state === 'paused') {
      mediaRecorder.resume();

      if (!this.disableLogs) {
        console.debug('Resumed recording.');
      }
    }
  };

  // Reference to "MediaRecorder" object
  var mediaRecorder;
}
// _________________
// StereoRecorder.js

/**
 * StereoRecorder is a standalone class used by {@link RecordRTC} to bring audio-recording in chrome. It runs top over {@link StereoAudioRecorder}.
 * @summary JavaScript standalone object for stereo audio recording.
 * @typedef StereoRecorder
 * @class
 * @example
 * var recorder = new StereoRecorder(MediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 */

function StereoRecorder(mediaStream) {
  var self = this;

  /**
   * This method records MediaStream.
   * @method
   * @memberof StereoRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    mediaRecorder = new StereoAudioRecorder(mediaStream, this);
    mediaRecorder.onAudioProcessStarted = function() {
      if (self.onAudioProcessStarted) {
        self.onAudioProcessStarted();
      }
    };
    mediaRecorder.record();
  };

  /**
   * This method stops recording MediaStream.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof StereoRecorder
   * @example
   * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function(callback) {
    if (!mediaRecorder) {
      return;
    }

    mediaRecorder.stop(function() {
      for (var item in mediaRecorder) {
        self[item] = mediaRecorder[item];
      }

      if (callback) {
        callback();
      }
    });
  };

  /**
   * This method pauses the recording process.
   * @method
   * @memberof StereoRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    if (!mediaRecorder) {
      return;
    }

    mediaRecorder.pause();
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof StereoRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    if (!mediaRecorder) {
      return;
    }

    mediaRecorder.resume();
  };

  // Reference to "StereoAudioRecorder" object
  var mediaRecorder;
}
// source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
// https://github.com/mattdiamond/Recorderjs#license-mit
// ______________________
// StereoAudioRecorder.js

/**
 * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
 * @summary JavaScript standalone object for stereo audio recording.
 * @typedef StereoAudioRecorder
 * @class
 * @example
 * var recorder = new StereoAudioRecorder(MediaStream, {
 *     sampleRate: 44100,
 *     bufferSize: 4096
 * });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {sampleRate: 44100, bufferSize: 4096}
 */

var __stereoAudioRecorderJavacriptNode;

function StereoAudioRecorder(mediaStream, config) {
  if (!mediaStream.getAudioTracks().length) {
    throw 'Your stream has no audio tracks.';
  }

  var self = this;

  // variables
  var leftchannel = [];
  var rightchannel = [];
  var recording = false;
  var recordingLength = 0;

  /**
   * This method records MediaStream.
   * @method
   * @memberof StereoAudioRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    // reset the buffers for the new recording
    leftchannel.length = rightchannel.length = 0;
    recordingLength = 0;

    recording = true;
  };

  function mergeLeftRightBuffers(config, callback) {
    function mergeAudioBuffers(config) {
      var leftBuffers = config.leftBuffers;
      var rightBuffers = config.rightBuffers;
      var sampleRate = config.sampleRate;

      leftBuffers = mergeBuffers(leftBuffers[0], leftBuffers[1]);
      rightBuffers = mergeBuffers(rightBuffers[0], rightBuffers[1]);

      function mergeBuffers(channelBuffer, rLength) {
        var result = new Float64Array(rLength);
        var offset = 0;
        var lng = channelBuffer.length;

        for (var i = 0; i < lng; i++) {
          var buffer = channelBuffer[i];
          result.set(buffer, offset);
          offset += buffer.length;
        }

        return result;
      }

      function interleave(leftChannel, rightChannel) {
        var length = leftChannel.length + rightChannel.length;

        var result = new Float64Array(length);

        var inputIndex = 0;

        for (var index = 0; index < length;) {
          result[index++] = leftChannel[inputIndex];
          result[index++] = rightChannel[inputIndex];
          inputIndex++;
        }
        return result;
      }

      function writeUTFBytes(view, offset, string) {
        var lng = string.length;
        for (var i = 0; i < lng; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }

      // interleave both channels together
      var interleaved = interleave(leftBuffers, rightBuffers);

      var interleavedLength = interleaved.length;

      // create wav file
      var resultingBufferLength = 44 + interleavedLength * 2;

      var buffer = new ArrayBuffer(resultingBufferLength);

      var view = new DataView(buffer);

      // RIFF chunk descriptor/identifier
      writeUTFBytes(view, 0, 'RIFF');

      // RIFF chunk length
      var blockAlign = 4;
      view.setUint32(blockAlign, 44 + interleavedLength * 2, true);

      // RIFF type
      writeUTFBytes(view, 8, 'WAVE');

      // format chunk identifier
      // FMT sub-chunk
      writeUTFBytes(view, 12, 'fmt ');

      // format chunk length
      view.setUint32(16, 16, true);

      // sample format (raw)
      view.setUint16(20, 1, true);

      // stereo (2 channels)
      view.setUint16(22, 2, true);

      // sample rate
      view.setUint32(24, sampleRate, true);

      // byte rate (sample rate * block align)
      view.setUint32(28, sampleRate * blockAlign, true);

      // block align (channel count * bytes per sample)
      view.setUint16(32, blockAlign, true);

      // bits per sample
      view.setUint16(34, 16, true);

      // data sub-chunk
      // data chunk identifier
      writeUTFBytes(view, 36, 'data');

      // data chunk length
      view.setUint32(40, interleavedLength * 2, true);

      // write the PCM samples
      var offset = 44,
          leftChannel;
      for (var i = 0; i < interleavedLength; i++, offset += 2) {
        var size = Math.max(-1, Math.min(1, interleaved[i]));
        var currentChannel = size < 0 ? size * 32768 : size * 32767;

        if (config.leftChannel) {
          if (currentChannel !== leftChannel) {
            view.setInt16(offset, currentChannel, true);
          }
          leftChannel = currentChannel;
        } else {
          view.setInt16(offset, currentChannel, true);
        }
      }

      postMessage({
        buffer: buffer,
        view: view
      });
    }
    var webWorker = processInWebWorker(mergeAudioBuffers);

    webWorker.onmessage = function(event) {
      callback(event.data.buffer, event.data.view);
    };

    webWorker.postMessage(config);
  }

  function processInWebWorker(_function) {
    var blob = URL.createObjectURL(new Blob([_function.toString(),
      'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
    ], {
      type: 'application/javascript'
    }));

    var worker = new Worker(blob);
    URL.revokeObjectURL(blob);
    return worker;
  }

  /**
   * This method stops recording MediaStream.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof StereoAudioRecorder
   * @example
   * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function(callback) {
    // stop recording
    recording = false;

    // to make sure onaudioprocess stops firing
    audioInput.disconnect();

    mergeLeftRightBuffers({
      sampleRate: sampleRate,
      leftChannel: config.leftChannel,
      leftBuffers: [leftchannel, recordingLength],
      rightBuffers: [rightchannel, recordingLength]
    }, function(buffer, view) {
      /**
       * @property {Blob} blob - The recorded blob object.
       * @memberof StereoAudioRecorder
       * @example
       * recorder.stop(function(){
             *     var blob = recorder.blob;
             * });
       */
      self.blob = new Blob([view], {
        type: 'audio/wav'
      });

      /**
       * @property {ArrayBuffer} buffer - The recorded buffer object.
       * @memberof StereoAudioRecorder
       * @example
       * recorder.stop(function(){
             *     var buffer = recorder.buffer;
             * });
       */
      self.buffer = new ArrayBuffer(view);

      /**
       * @property {DataView} view - The recorded data-view object.
       * @memberof StereoAudioRecorder
       * @example
       * recorder.stop(function(){
             *     var view = recorder.view;
             * });
       */
      self.view = view;

      self.sampleRate = sampleRate;
      self.bufferSize = bufferSize;

      // recorded audio length
      self.length = recordingLength;

      if (callback) {
        callback();
      }

      isAudioProcessStarted = false;
    });
  };

  if (!Storage.AudioContextConstructor) {
    Storage.AudioContextConstructor = new Storage.AudioContext();
  }

  var context = Storage.AudioContextConstructor;

  // creates an audio node from the microphone incoming stream
  var audioInput = context.createMediaStreamSource(mediaStream);

  var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];

  /**
   * From the spec: This value controls how frequently the audioprocess event is
   * dispatched and how many sample-frames need to be processed each call.
   * Lower values for buffer size will result in a lower (better) latency.
   * Higher values will be necessary to avoid audio breakup and glitches
   * The size of the buffer (in sample-frames) which needs to
   * be processed each time onprocessaudio is called.
   * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
   * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
   * @memberof StereoAudioRecorder
   * @example
   * recorder = new StereoAudioRecorder(mediaStream, {
     *     bufferSize: 4096
     * });
   */

  // "0" means, let chrome decide the most accurate buffer-size for current platform.
  var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

  if (legalBufferValues.indexOf(bufferSize) === -1) {
    if (!config.disableLogs) {
      console.warn('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
    }
  }


  /**
   * The sample rate (in sample-frames per second) at which the
   * AudioContext handles audio. It is assumed that all AudioNodes
   * in the context run at this rate. In making this assumption,
   * sample-rate converters or "varispeed" processors are not supported
   * in real-time processing.
   * The sampleRate parameter describes the sample-rate of the
   * linear PCM audio data in the buffer in sample-frames per second.
   * An implementation must support sample-rates in at least
   * the range 22050 to 96000.
   * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
   * @memberof StereoAudioRecorder
   * @example
   * recorder = new StereoAudioRecorder(mediaStream, {
     *     sampleRate: 44100
     * });
   */
  var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

  if (sampleRate < 22050 || sampleRate > 96000) {
    // Ref: http://stackoverflow.com/a/26303918/552182
    if (!config.disableLogs) {
      console.warn('sample-rate must be under range 22050 and 96000.');
    }
  }

  if (context.createJavaScriptNode) {
    __stereoAudioRecorderJavacriptNode = context.createJavaScriptNode(bufferSize, 2, 2);
  } else if (context.createScriptProcessor) {
    __stereoAudioRecorderJavacriptNode = context.createScriptProcessor(bufferSize, 2, 2);
  } else {
    throw 'WebAudio API has no support on this browser.';
  }

  // connect the stream to the gain node
  audioInput.connect(__stereoAudioRecorderJavacriptNode);

  bufferSize = __stereoAudioRecorderJavacriptNode.bufferSize;

  if (!config.disableLogs) {
    console.log('sample-rate', sampleRate);
    console.log('buffer-size', bufferSize);
  }

  var isPaused = false;
  /**
   * This method pauses the recording process.
   * @method
   * @memberof StereoAudioRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    isPaused = true;

    if (!config.disableLogs) {
      console.debug('Paused recording.');
    }
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof StereoAudioRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    isPaused = false;

    if (!config.disableLogs) {
      console.debug('Resumed recording.');
    }
  };

  var isAudioProcessStarted = false;

  __stereoAudioRecorderJavacriptNode.onaudioprocess = function(e) {
    if (isPaused) {
      return;
    }

    // if MediaStream().stop() or MediaStreamTrack.stop() is invoked.
    if (mediaStream.ended) {
      __stereoAudioRecorderJavacriptNode.onaudioprocess = function() {};
      return;
    }

    if (!recording) {
      audioInput.disconnect();
      return;
    }

    /**
     * This method is called on "onaudioprocess" event's first invocation.
     * @method {function} onAudioProcessStarted
     * @memberof StereoAudioRecorder
     * @example
     * recorder.onAudioProcessStarted: function() { };
     */
    if (!isAudioProcessStarted) {
      isAudioProcessStarted = true;
      if (self.onAudioProcessStarted) {
        self.onAudioProcessStarted();
      }
    }

    var left = e.inputBuffer.getChannelData(0);
    var right = e.inputBuffer.getChannelData(1);

    // we clone the samples
    leftchannel.push(new Float32Array(left));
    rightchannel.push(new Float32Array(right));

    recordingLength += bufferSize;
  };

  // to prevent self audio to be connected with speakers
  __stereoAudioRecorderJavacriptNode.connect(context.destination);
}
// _________________
// CanvasRecorder.js

/**
 * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
 * @summary HTML2Canvas recording into video WebM.
 * @typedef CanvasRecorder
 * @class
 * @example
 * var recorder = new CanvasRecorder(htmlElement);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
 */

function CanvasRecorder(htmlElement) {
  if (!window.html2canvas) {
    throw 'Please link: //cdn.webrtc-experiment.com/screenshot.js';
  }

  var isRecording;

  /**
   * This method records Canvas.
   * @method
   * @memberof CanvasRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    isRecording = true;
    whammy.frames = [];
    drawCanvasFrame();
  };

  /**
   * This method stops recording Canvas.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof CanvasRecorder
   * @example
   * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function(callback) {
    isRecording = false;

    /**
     * @property {Blob} blob - Recorded frames in video/webm blob.
     * @memberof CanvasRecorder
     * @example
     * recorder.stop(function() {
         *     var blob = recorder.blob;
         * });
     */
    this.blob = whammy.compile();

    if (callback) {
      callback(this.blob);
    }
  };

  var isPausedRecording = false;

  /**
   * This method pauses the recording process.
   * @method
   * @memberof CanvasRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    isPausedRecording = true;

    if (!this.disableLogs) {
      console.debug('Paused recording.');
    }
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof CanvasRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    isPausedRecording = false;

    if (!this.disableLogs) {
      console.debug('Resumed recording.');
    }
  };

  function drawCanvasFrame() {
    if (isPausedRecording) {
      lastTime = new Date().getTime();
      return setTimeout(drawCanvasFrame, 100);
    }

    window.html2canvas(htmlElement, {
      onrendered: function(canvas) {
        var duration = new Date().getTime() - lastTime;
        if (!duration) {
          return drawCanvasFrame();
        }

        // via #206, by Jack i.e. @Seymourr
        lastTime = new Date().getTime();

        whammy.frames.push({
          duration: duration,
          image: canvas.toDataURL('image/webp')
        });

        if (isRecording) {
          requestAnimationFrame(drawCanvasFrame);
        }
      }
    });
  }

  var lastTime = new Date().getTime();

  var whammy = new Whammy.Video(100);
}
// _________________
// WhammyRecorder.js

/**
 * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
 * @summary Video recording feature in Chrome.
 * @typedef WhammyRecorder
 * @class
 * @example
 * var recorder = new WhammyRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 */

function WhammyRecorder(mediaStream) {
  /**
   * This method records video.
   * @method
   * @memberof WhammyRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    if (!this.width) {
      this.width = 320;
    }

    if (!this.height) {
      this.height = 240;
    }

    if (!this.video) {
      this.video = {
        width: this.width,
        height: this.height
      };
    }

    if (!this.canvas) {
      this.canvas = {
        width: this.width,
        height: this.height
      };
    }

    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;

    context = canvas.getContext('2d');

    // setting defaults
    if (this.video && this.video instanceof HTMLVideoElement) {
      video = this.video.cloneNode();
    } else {
      video = document.createElement('video');
      video.src = URL.createObjectURL(mediaStream);

      video.width = this.video.width;
      video.height = this.video.height;
    }

    video.muted = true;
    video.play();

    lastTime = new Date().getTime();
    whammy = new Whammy.Video();

    if (!this.disableLogs) {
      console.log('canvas resolutions', canvas.width, '*', canvas.height);
      console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
    }

    drawFrames();
  };

  function drawFrames() {
    var duration = new Date().getTime() - lastTime;
    if (!duration) {
      return setTimeout(drawFrames, 10);
    }

    if (isPausedRecording) {
      lastTime = new Date().getTime();
      return setTimeout(drawFrames, 100);
    }

    // via #206, by Jack i.e. @Seymourr
    lastTime = new Date().getTime();

    if (video.paused) {
      // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
      // Tweak for Android Chrome
      video.play();
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    whammy.frames.push({
      duration: duration,
      image: canvas.toDataURL('image/webp')
    });

    if (!isStopDrawing) {
      setTimeout(drawFrames, 10);
    }
  }

  /**
   * remove black frames from the beginning to the specified frame
   * @param {Array} _frames - array of frames to be checked
   * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
   * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
   * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
   * @returns {Array} - array of frames
   */
  // pull#293 by @volodalexey
  function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance) {
    var localCanvas = document.createElement('canvas');
    localCanvas.width = canvas.width;
    localCanvas.height = canvas.height;
    var context2d = localCanvas.getContext('2d');
    var resultFrames = [];

    var checkUntilNotBlack = _framesToCheck === -1;
    var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
        _framesToCheck : _frames.length;
    var sampleColor = {
      r: 0,
      g: 0,
      b: 0
    };
    var maxColorDifference = Math.sqrt(
        Math.pow(255, 2) +
        Math.pow(255, 2) +
        Math.pow(255, 2)
    );
    var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
    var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
    var doNotCheckNext = false;

    for (var f = 0; f < endCheckFrame; f++) {
      var matchPixCount, endPixCheck, maxPixCount;

      if (!doNotCheckNext) {
        var image = new Image();
        image.src = _frames[f].image;
        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
        matchPixCount = 0;
        endPixCheck = imageData.data.length;
        maxPixCount = imageData.data.length / 4;

        for (var pix = 0; pix < endPixCheck; pix += 4) {
          var currentColor = {
            r: imageData.data[pix],
            g: imageData.data[pix + 1],
            b: imageData.data[pix + 2]
          };
          var colorDifference = Math.sqrt(
              Math.pow(currentColor.r - sampleColor.r, 2) +
              Math.pow(currentColor.g - sampleColor.g, 2) +
              Math.pow(currentColor.b - sampleColor.b, 2)
          );
          // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
          if (colorDifference <= maxColorDifference * pixTolerance) {
            matchPixCount++;
          }
        }
      }

      if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
      } else {
        // console.log('frame is passed : ' + f);
        if (checkUntilNotBlack) {
          doNotCheckNext = true;
        }
        resultFrames.push(_frames[f]);
      }
    }

    resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

    if (resultFrames.length <= 0) {
      // at least one last frame should be available for next manipulation
      // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
      resultFrames.push(_frames[_frames.length - 1]);
    }

    return resultFrames;
  }

  var isStopDrawing = false;

  /**
   * This method stops recording video.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof WhammyRecorder
   * @example
   * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function(callback) {
    isStopDrawing = true;

    var _this = this;
    // analyse of all frames takes some time!
    setTimeout(function() {
      // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
      // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
      // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
      whammy.frames = dropBlackFrames(whammy.frames, -1);

      // to display advertisement images!
      if (this.advertisement && this.advertisement.length) {
        whammy.frames = this.advertisement.concat(whammy.frames);
      }

      /**
       * @property {Blob} blob - Recorded frames in video/webm blob.
       * @memberof WhammyRecorder
       * @example
       * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
       */
      whammy.compile(function(blob) {
        _this.blob = blob;

        if (_this.blob.forEach) {
          _this.blob = new Blob([], {
            type: 'video/webm'
          });
        }

        if (callback) {
          callback(_this.blob);
        }
      });
    }, 10);
  };

  var isPausedRecording = false;

  /**
   * This method pauses the recording process.
   * @method
   * @memberof WhammyRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    isPausedRecording = true;

    if (!this.disableLogs) {
      console.debug('Paused recording.');
    }
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof WhammyRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    isPausedRecording = false;

    if (!this.disableLogs) {
      console.debug('Resumed recording.');
    }
  };

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  var video;
  var lastTime;
  var whammy;
}
// https://github.com/antimatter15/whammy/blob/master/LICENSE
// _________
// Whammy.js

// todo: Firefox now supports webp for webm containers!
// their MediaRecorder implementation works well!
// should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

/**
 * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
 * @summary A real time javascript webm encoder based on a canvas hack.
 * @typedef Whammy
 * @class
 * @example
 * var recorder = new Whammy().Video(15);
 * recorder.add(context || canvas || dataURL);
 * var output = recorder.compile();
 */

var Whammy = (function() {
  // a more abstract-ish API

  function WhammyVideo(duration) {
    this.frames = [];
    this.duration = duration || 1;
    this.quality = 100;
  }

  /**
   * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
   * @method
   * @memberof Whammy
   * @example
   * recorder = new Whammy().Video(0.8, 100);
   * recorder.add(canvas || context || 'image/webp');
   * @param {string} frame - Canvas || Context || image/webp
   * @param {number} duration - Stick a duration (in milliseconds)
   */
  WhammyVideo.prototype.add = function(frame, duration) {
    if ('canvas' in frame) { //CanvasRenderingContext2D
      frame = frame.canvas;
    }

    if ('toDataURL' in frame) {
      frame = frame.toDataURL('image/webp', this.quality);
    }

    if (!(/^data:image\/webp;base64,/ig).test(frame)) {
      throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
    }
    this.frames.push({
      image: frame,
      duration: duration || this.duration
    });
  };

  function processInWebWorker(_function) {
    var blob = URL.createObjectURL(new Blob([_function.toString(),
      'this.onmessage =  function (e) {' + _function.name + '(e.data);}'
    ], {
      type: 'application/javascript'
    }));

    var worker = new Worker(blob);
    URL.revokeObjectURL(blob);
    return worker;
  }

  function whammyInWebWorker(frames) {
    function ArrayToWebM(frames) {
      var info = checkFrames(frames);
      if (!info) {
        return [];
      }

      var clusterMaxDuration = 30000;

      var EBML = [{
        'id': 0x1a45dfa3, // EBML
        'data': [{
          'data': 1,
          'id': 0x4286 // EBMLVersion
        }, {
          'data': 1,
          'id': 0x42f7 // EBMLReadVersion
        }, {
          'data': 4,
          'id': 0x42f2 // EBMLMaxIDLength
        }, {
          'data': 8,
          'id': 0x42f3 // EBMLMaxSizeLength
        }, {
          'data': 'webm',
          'id': 0x4282 // DocType
        }, {
          'data': 2,
          'id': 0x4287 // DocTypeVersion
        }, {
          'data': 2,
          'id': 0x4285 // DocTypeReadVersion
        }]
      }, {
        'id': 0x18538067, // Segment
        'data': [{
          'id': 0x1549a966, // Info
          'data': [{
            'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
            'id': 0x2ad7b1 // TimecodeScale
          }, {
            'data': 'whammy',
            'id': 0x4d80 // MuxingApp
          }, {
            'data': 'whammy',
            'id': 0x5741 // WritingApp
          }, {
            'data': doubleToString(info.duration),
            'id': 0x4489 // Duration
          }]
        }, {
          'id': 0x1654ae6b, // Tracks
          'data': [{
            'id': 0xae, // TrackEntry
            'data': [{
              'data': 1,
              'id': 0xd7 // TrackNumber
            }, {
              'data': 1,
              'id': 0x73c5 // TrackUID
            }, {
              'data': 0,
              'id': 0x9c // FlagLacing
            }, {
              'data': 'und',
              'id': 0x22b59c // Language
            }, {
              'data': 'V_VP8',
              'id': 0x86 // CodecID
            }, {
              'data': 'VP8',
              'id': 0x258688 // CodecName
            }, {
              'data': 1,
              'id': 0x83 // TrackType
            }, {
              'id': 0xe0, // Video
              'data': [{
                'data': info.width,
                'id': 0xb0 // PixelWidth
              }, {
                'data': info.height,
                'id': 0xba // PixelHeight
              }]
            }]
          }]
        }]
      }];

      //Generate clusters (max duration)
      var frameNumber = 0;
      var clusterTimecode = 0;
      while (frameNumber < frames.length) {

        var clusterFrames = [];
        var clusterDuration = 0;
        do {
          clusterFrames.push(frames[frameNumber]);
          clusterDuration += frames[frameNumber].duration;
          frameNumber++;
        } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

        var clusterCounter = 0;
        var cluster = {
          'id': 0x1f43b675, // Cluster
          'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
        }; //Add cluster to segment
        EBML[1].data.push(cluster);
        clusterTimecode += clusterDuration;
      }

      return generateEBML(EBML);
    }

    function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
      return [{
        'data': clusterTimecode,
        'id': 0xe7 // Timecode
      }].concat(clusterFrames.map(function(webp) {
            var block = makeSimpleBlock({
              discardable: 0,
              frame: webp.data.slice(4),
              invisible: 0,
              keyframe: 1,
              lacing: 0,
              trackNum: 1,
              timecode: Math.round(clusterCounter)
            });
            clusterCounter += webp.duration;
            return {
              data: block,
              id: 0xa3
            };
          }));
    }

    // sums the lengths of all the frames and gets the duration

    function checkFrames(frames) {
      if (!frames[0]) {
        postMessage({
          error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
        });
        return;
      }

      var width = frames[0].width,
          height = frames[0].height,
          duration = frames[0].duration;

      for (var i = 1; i < frames.length; i++) {
        duration += frames[i].duration;
      }
      return {
        duration: duration,
        width: width,
        height: height
      };
    }

    function numToBuffer(num) {
      var parts = [];
      while (num > 0) {
        parts.push(num & 0xff);
        num = num >> 8;
      }
      return new Uint8Array(parts.reverse());
    }

    function strToBuffer(str) {
      return new Uint8Array(str.split('').map(function(e) {
        return e.charCodeAt(0);
      }));
    }

    function bitsToBuffer(bits) {
      var data = [];
      var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
      bits = pad + bits;
      for (var i = 0; i < bits.length; i += 8) {
        data.push(parseInt(bits.substr(i, 8), 2));
      }
      return new Uint8Array(data);
    }

    function generateEBML(json) {
      var ebml = [];
      for (var i = 0; i < json.length; i++) {
        var data = json[i].data;

        if (typeof data === 'object') {
          data = generateEBML(data);
        }

        if (typeof data === 'number') {
          data = bitsToBuffer(data.toString(2));
        }

        if (typeof data === 'string') {
          data = strToBuffer(data);
        }

        var len = data.size || data.byteLength || data.length;
        var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
        var sizeToString = len.toString(2);
        var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
        var size = (new Array(zeroes)).join('0') + '1' + padded;

        ebml.push(numToBuffer(json[i].id));
        ebml.push(bitsToBuffer(size));
        ebml.push(data);
      }

      return new Blob(ebml, {
        type: 'video/webm'
      });
    }

    function toBinStrOld(bits) {
      var data = '';
      var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
      bits = pad + bits;
      for (var i = 0; i < bits.length; i += 8) {
        data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
      }
      return data;
    }

    function makeSimpleBlock(data) {
      var flags = 0;

      if (data.keyframe) {
        flags |= 128;
      }

      if (data.invisible) {
        flags |= 8;
      }

      if (data.lacing) {
        flags |= (data.lacing << 1);
      }

      if (data.discardable) {
        flags |= 1;
      }

      if (data.trackNum > 127) {
        throw 'TrackNumber > 127 not supported';
      }

      var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
            return String.fromCharCode(e);
          }).join('') + data.frame;

      return out;
    }

    function parseWebP(riff) {
      var VP8 = riff.RIFF[0].WEBP[0];

      var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
      for (var i = 0, c = []; i < 4; i++) {
        c[i] = VP8.charCodeAt(frameStart + 3 + i);
      }

      var width, height, tmp;

      //the code below is literally copied verbatim from the bitstream spec
      tmp = (c[1] << 8) | c[0];
      width = tmp & 0x3FFF;
      tmp = (c[3] << 8) | c[2];
      height = tmp & 0x3FFF;
      return {
        width: width,
        height: height,
        data: VP8,
        riff: riff
      };
    }

    function getStrLength(string, offset) {
      return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
        var unpadded = i.charCodeAt(0).toString(2);
        return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
      }).join(''), 2);
    }

    function parseRIFF(string) {
      var offset = 0;
      var chunks = {};

      while (offset < string.length) {
        var id = string.substr(offset, 4);
        var len = getStrLength(string, offset);
        var data = string.substr(offset + 4 + 4, len);
        offset += 4 + 4 + len;
        chunks[id] = chunks[id] || [];

        if (id === 'RIFF' || id === 'LIST') {
          chunks[id].push(parseRIFF(data));
        } else {
          chunks[id].push(data);
        }
      }
      return chunks;
    }

    function doubleToString(num) {
      return [].slice.call(
          new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
            return String.fromCharCode(e);
          }).reverse().join('');
    }

    var webm = new ArrayToWebM(frames.map(function(frame) {
      var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
      webp.duration = frame.duration;
      return webp;
    }));

    postMessage(webm);
  }

  /**
   * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof Whammy
   * @example
   * recorder = new Whammy().Video(0.8, 100);
   * recorder.compile(function(blob) {
     *    // blob.size - blob.type
     * });
   */
  WhammyVideo.prototype.compile = function(callback) {
    var webWorker = processInWebWorker(whammyInWebWorker);

    webWorker.onmessage = function(event) {
      if (event.data.error) {
        console.error(event.data.error);
        return;
      }
      callback(event.data);
    };

    webWorker.postMessage(this.frames);
  };

  return {
    /**
     * A more abstract-ish API.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * @param {?number} speed - 0.8
     * @param {?number} quality - 100
     */
    Video: WhammyVideo
  };
})();
// ______________ (indexed-db)
// DiskStorage.js

/**
 * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
 * @summary Writing blobs into IndexedDB.
 * @example
 * DiskStorage.Store({
 *     audioBlob: yourAudioBlob,
 *     videoBlob: yourVideoBlob,
 *     gifBlob  : yourGifBlob
 * });
 * DiskStorage.Fetch(function(dataURL, type) {
 *     if(type === 'audioBlob') { }
 *     if(type === 'videoBlob') { }
 *     if(type === 'gifBlob')   { }
 * });
 * // DiskStorage.dataStoreName = 'recordRTC';
 * // DiskStorage.onError = function(error) { };
 * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
 * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
 * @property {function} Store - This method stores blobs in IndexedDB.
 * @property {function} onError - This function is invoked for any known/unknown error.
 * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
 */


var DiskStorage = {
  /**
   * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
   * @method
   * @memberof DiskStorage
   * @internal
   * @example
   * DiskStorage.init();
   */
  init: function() {
    var self = this;
    var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    var dbVersion = 1;
    var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
        db;
    var request = indexedDB.open(dbName, dbVersion);

    function createObjectStore(dataBase) {
      dataBase.createObjectStore(self.dataStoreName);
    }

    function putInDB() {
      var transaction = db.transaction([self.dataStoreName], 'readwrite');

      if (self.videoBlob) {
        transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
      }

      if (self.gifBlob) {
        transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
      }

      if (self.audioBlob) {
        transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
      }

      function getFromStore(portionName) {
        transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
          if (self.callback) {
            self.callback(event.target.result, portionName);
          }
        };
      }

      getFromStore('audioBlob');
      getFromStore('videoBlob');
      getFromStore('gifBlob');
    }

    request.onerror = self.onError;

    request.onsuccess = function() {
      db = request.result;
      db.onerror = self.onError;

      if (db.setVersion) {
        if (db.version !== dbVersion) {
          var setVersion = db.setVersion(dbVersion);
          setVersion.onsuccess = function() {
            createObjectStore(db);
            putInDB();
          };
        } else {
          putInDB();
        }
      } else {
        putInDB();
      }
    };
    request.onupgradeneeded = function(event) {
      createObjectStore(event.target.result);
    };
  },
  /**
   * This method fetches stored blobs from IndexedDB.
   * @method
   * @memberof DiskStorage
   * @internal
   * @example
   * DiskStorage.Fetch(function(dataURL, type) {
     *     if(type === 'audioBlob') { }
     *     if(type === 'videoBlob') { }
     *     if(type === 'gifBlob')   { }
     * });
   */
  Fetch: function(callback) {
    this.callback = callback;
    this.init();

    return this;
  },
  /**
   * This method stores blobs in IndexedDB.
   * @method
   * @memberof DiskStorage
   * @internal
   * @example
   * DiskStorage.Store({
     *     audioBlob: yourAudioBlob,
     *     videoBlob: yourVideoBlob,
     *     gifBlob  : yourGifBlob
     * });
   */
  Store: function(config) {
    this.audioBlob = config.audioBlob;
    this.videoBlob = config.videoBlob;
    this.gifBlob = config.gifBlob;

    this.init();

    return this;
  },
  /**
   * This function is invoked for any known/unknown error.
   * @method
   * @memberof DiskStorage
   * @internal
   * @example
   * DiskStorage.onError = function(error){
     *     alerot( JSON.stringify(error) );
     * };
   */
  onError: function(error) {
    console.error(JSON.stringify(error, null, '\t'));
  },

  /**
   * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
   * @memberof DiskStorage
   * @internal
   * @example
   * DiskStorage.dataStoreName = 'recordRTC';
   */
  dataStoreName: 'recordRTC',
  dbName: null
};
// ______________
// GifRecorder.js

/**
 * GifRecorder is standalone calss used by {@link RecordRTC} to record video as animated gif image.
 * @typedef GifRecorder
 * @class
 * @example
 * var recorder = new GifRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     img.src = URL.createObjectURL(blob);
 * });
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 */

function GifRecorder(mediaStream) {
  if (!window.GIFEncoder) {
    throw 'Please link: https://cdn.webrtc-experiment.com/gif-recorder.js';
  }

  /**
   * This method records MediaStream.
   * @method
   * @memberof GifRecorder
   * @example
   * recorder.record();
   */
  this.record = function() {
    if (!this.width) {
      this.width = video.offsetWidth || 320;
    }

    if (!this.height) {
      this.height = video.offsetHeight || 240;
    }

    if (!this.video) {
      this.video = {
        width: this.width,
        height: this.height
      };
    }

    if (!this.canvas) {
      this.canvas = {
        width: this.width,
        height: this.height
      };
    }

    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;

    video.width = this.video.width;
    video.height = this.video.height;

    // external library to record as GIF images
    gifEncoder = new window.GIFEncoder();

    // void setRepeat(int iter)
    // Sets the number of times the set of GIF frames should be played.
    // Default is 1; 0 means play indefinitely.
    gifEncoder.setRepeat(0);

    // void setFrameRate(Number fps)
    // Sets frame rate in frames per second.
    // Equivalent to setDelay(1000/fps).
    // Using "setDelay" instead of "setFrameRate"
    gifEncoder.setDelay(this.frameRate || 200);

    // void setQuality(int quality)
    // Sets quality of color quantization (conversion of images to the
    // maximum 256 colors allowed by the GIF specification).
    // Lower values (minimum = 1) produce better colors,
    // but slow processing significantly. 10 is the default,
    // and produces good color mapping at reasonable speeds.
    // Values greater than 20 do not yield significant improvements in speed.
    gifEncoder.setQuality(this.quality || 10);

    // Boolean start()
    // This writes the GIF Header and returns false if it fails.
    gifEncoder.start();

    startTime = Date.now();

    var self = this;

    function drawVideoFrame(time) {
      if (isPausedRecording) {
        return setTimeout(function() {
          drawVideoFrame(time);
        }, 100);
      }

      lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

      if (typeof lastFrameTime === undefined) {
        lastFrameTime = time;
      }

      // ~10 fps
      if (time - lastFrameTime < 90) {
        return;
      }

      if (video.paused) {
        // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
        // Tweak for Android Chrome
        video.play();
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (self.onGifPreview) {
        self.onGifPreview(canvas.toDataURL('image/png'));
      }

      gifEncoder.addFrame(context);
      lastFrameTime = time;
    }

    lastAnimationFrame = requestAnimationFrame(drawVideoFrame);
  };

  /**
   * This method stops recording MediaStream.
   * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
   * @method
   * @memberof GifRecorder
   * @example
   * recorder.stop(function(blob) {
     *     img.src = URL.createObjectURL(blob);
     * });
   */
  this.stop = function() {
    if (lastAnimationFrame) {
      cancelAnimationFrame(lastAnimationFrame);
    }

    endTime = Date.now();

    /**
     * @property {Blob} blob - The recorded blob object.
     * @memberof GifRecorder
     * @example
     * recorder.stop(function(){
         *     var blob = recorder.blob;
         * });
     */
    this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
      type: 'image/gif'
    });

    // bug: find a way to clear old recorded blobs
    gifEncoder.stream().bin = [];
  };

  var isPausedRecording = false;

  /**
   * This method pauses the recording process.
   * @method
   * @memberof GifRecorder
   * @example
   * recorder.pause();
   */
  this.pause = function() {
    isPausedRecording = true;

    if (!this.disableLogs) {
      console.debug('Paused recording.');
    }
  };

  /**
   * This method resumes the recording process.
   * @method
   * @memberof GifRecorder
   * @example
   * recorder.resume();
   */
  this.resume = function() {
    isPausedRecording = false;

    if (!this.disableLogs) {
      console.debug('Resumed recording.');
    }
  };

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  var video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.src = URL.createObjectURL(mediaStream);
  video.play();

  var lastAnimationFrame = null;
  var startTime, endTime, lastFrameTime;

  var gifEncoder;
};(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Feedback.js Script.
 *
 * @package   User_Feedback
 * @author    Pascal Birchler <pascal@required.ch>
 * @license   GPL-2.0+
 * @link      https://github.com/wearerequired/user-feedback/
 * @copyright 2015 required gmbh
 */

// Load required modules
var userFeedbackModel = require(2);
var AppView = require(12);

jQuery(document).ready(function ($) {
  // Only run if Canvas is supported
  if (!!window.HTMLCanvasElement) {
    // Run Boy Run
    var appView = new AppView({model: userFeedbackModel});
    appView.render();
  }
});
},{"12":12,"2":2}],2:[function(require,module,exports){
'use strict';

var UserFeedbackModel = Backbone.Model.extend({});
var userFeedbackModel = new UserFeedbackModel;

module.exports = userFeedbackModel
},{}],3:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-annotation" style="top:'+
((__t=( top ))==null?'':__t)+
'px;left:'+
((__t=( left ))==null?'':__t)+
'px;width:'+
((__t=( width ))==null?'':__t)+
'px;height:'+
((__t=( height ))==null?'':__t)+
'px;" data-highlight-id="'+
((__t=( id ))==null?'':__t)+
'">\n\t<button class="user-feedback-annotation-close" title="'+
((__t=( closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( closeAria ))==null?'':__t)+
'">'+
((__t=( close ))==null?'':__t)+
'</button>\n</div>';
}
return __p;
};

},{}],4:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="user-feedback-bottombar">\n\t<ul id="user-feedback-bar-steps">\n\t\t<li class="user-feedback-bar-step" data-step="1">'+
((__t=( step.one ))==null?'':__t)+
'</li>\n\t\t<li class="user-feedback-bar-step hidden" data-step="2">'+
((__t=( step.two ))==null?'':__t)+
'</li>\n\t\t<li class="user-feedback-bar-step hidden" data-step="3">'+
((__t=( step.three ))==null?'':__t)+
'</li>\n\t</ul>\n\t<button class="user-feedback-button user-feedback-button-help" title="'+
((__t=( button.helpAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.helpAria ))==null?'':__t)+
'">'+
((__t=( button.help ))==null?'':__t)+
'</button>\n</div>';
}
return __p;
};

},{}],5:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<button\n\t\tid="user-feedback-init-button"\n\t\tclass="user-feedback-button user-feedback-button-gray">\n\t'+
((__t=( label ))==null?'':__t)+
'\n</button>';
}
return __p;
};

},{}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( salutation ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>\n\t\t<input type="text" class="user-feedback-input" id="user-feedback-user-name" placeholder="'+
((__t=( placeholder.name ))==null?'':__t)+
'">\n\t\t<input type="email" class="user-feedback-input" id="user-feedback-user-email" placeholder="'+
((__t=( placeholder.email ))==null?'':__t)+
'">\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],7:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( salutation ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro2 ))==null?'':__t)+
'</p>\n\n\t<p>\n\t\t<input type="checkbox" value="1" id="user-feedback-do-not-show-again" />\n\t\t<label for="user-feedback-do-not-show-again">'+
((__t=( inputLabel ))==null?'':__t)+
'</label>\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],8:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>\n\t\t<textarea id="user-feedback-message" class="user-feedback-textarea" placeholder="'+
((__t=( placeholder.message ))==null?'':__t)+
'"></textarea>\n\t</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],9:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-pointer" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t\t<button class="user-feedback-button user-feedback-button-close" title="'+
((__t=( button.closeAria ))==null?'':__t)+
'" aria-label="'+
((__t=( button.closeAria ))==null?'':__t)+
'">'+
((__t=( button.close ))==null?'':__t)+
'</button>\n\t</div>\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-primary user-feedback-button-screen-capture">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-center" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t</div>\n\t<div id="user-feedback-overview-description">\n\t\t<div id="user-feedback-overview-user">\n\t\t\t<img src="" width="40" height="40" alt="'+
((__t=( user.gravatarAlt ))==null?'':__t)+
'" />\n\t\t\t<div>'+
((__t=( user.by ))==null?'':__t)+
'</div>\n\t\t</div>\n\t\t<textarea id="user-feedback-overview-note" class="user-feedback-textarea"></textarea>\n\t\t<ul class="user-feedback-additional-notes">\n\t\t\t<li id="user-feedback-additional-theme">'+
((__t=( details.theme ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-browser">'+
((__t=( details.browser ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-template">'+
((__t=( details.template ))==null?'':__t)+
'</li>\n\t\t\t<li id="user-feedback-additional-language">'+
((__t=( details.language ))==null?'':__t)+
'</li>\n\t\t</ul>\n\t</div>\n\t<div id="user-feedback-overview-screenshot">\n\t\t<img id="user-feedback-overview-screenshot-img" src="" alt="'+
((__t=( screenshotAlt ))==null?'':__t)+
'" />\n\t</div>\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-next user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-previous user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],11:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="user-feedback-modal user-feedback-modal-center" role="dialog">\n\t<div class="user-feedback-modal__topbar">\n\t\t<h3 class="user-feedback-modal-title">'+
((__t=( title ))==null?'':__t)+
'</h3>\n\t</div>\n\t<p>'+
((__t=( intro ))==null?'':__t)+
'</p>\n\n\t<p>'+
((__t=( intro2 ))==null?'':__t)+
'</p>\n\n\t<div class="user-feedback-modal__bottombar">\n\t\t<button class="user-feedback-button user-feedback-button-done user-feedback-button-primary">'+
((__t=( button.primary ))==null?'':__t)+
'</button>\n\t\t<button class="user-feedback-button user-feedback-button-restart user-feedback-button-secondary">'+
((__t=( button.secondary ))==null?'':__t)+
'</button>\n\t</div>\n</div>';
}
return __p;
};

},{}],12:[function(require,module,exports){
'use strict';

var userFeedbackModel = require(2);

// Create the view for our feedback button
var UserFeedbackButton = require(14);

// Create the view for the bar at the bottom of the screen
var UserFeedbackBar = require(13);

// Wizard view that holds the individual view for each step
var UserFeedbackWizard = require(23);

var AppView = Backbone.View.extend({
  el: '#user-feedback-container',

  initialize: function () {
    this.showInitButton = true;
    this.initButton = new UserFeedbackButton({model: userFeedbackModel});
    this.listenTo(this.initButton, 'toggleInitButton', this.toggleInitButton, this);

    this.showBottomBar = true;
    this.bottomBar = new UserFeedbackBar({model: userFeedbackModel});
    this.listenTo(this.bottomBar, 'toggleBottomBar', this.toggleBottomBar, this);
    this.listenTo(this.bottomBar, 'toggleWizard', this.toggleWizard, this);

    this.showWizard = true;
    this.wizard = new UserFeedbackWizard({model: userFeedbackModel});
    this.listenTo(this.wizard, 'toggleBottomBar', this.toggleBottomBar, this);
    this.listenTo(this.wizard, 'reInitialize', this.reInitialize, this);
    this.listenTo(this.wizard, 'sendData', this.send, this);
  },

  toggleInitButton: function () {
    this.showInitButton = !this.showInitButton;
    this.render();
  },

  toggleBottomBar: function () {
    this.showBottomBar = !this.showBottomBar;
    this.render();
  },

  toggleWizard: function () {
    this.showWizard = !this.showWizard;
    this.render();
  },

  reInitialize: function () {
    this.showWizard = true;
    this.showBottomBar = true;
    this.showInitButton = true;
    this.render();
  },

  render: function () {
    this.$el.children().detach();

    // Render our button if it's not toggled or else the wizard
    if (this.showInitButton) {
      this.$el.append(this.initButton.render().el);
    } else {
      // Only show bottom
      if (this.showBottomBar) {
        this.$el.append(this.bottomBar.render().el)
      }
      if (this.showWizard) {
        this.$el.append(this.wizard.render().el);
      }
    }

    return this;
  },

  // Here we send all the data to WordPress
  send: function () {
    if (this.model.get('doNotShowInfoAgain') === true) {
      // Set our "do not show again" cookie
      var date = new Date();
      date.setDate(date.getDate() + 30);
      document.cookie = 'user_feedback_do_not_show_again=1; path=/;expires=' + date.toUTCString();
    }

    // Set up initial post data to be sent
    var post = {};
    post.browser = {};
    post.browser.name = navigator.sayswho;
    post.browser.cookieEnabled = navigator.cookieEnabled;
    post.browser.platform = navigator.platform;
    post.browser.userAgent = navigator.userAgent;
    post.url = document.URL;
    post.theme = user_feedback.theme;
    post.language = user_feedback.language;
    post.message = this.model.get('userMessage');
    post.img = this.model.get('userScreenshot');
    post.user = {
      name : this.model.get('userName'),
      email: this.model.get('userEmail')
    };

    jQuery.post(
        user_feedback.ajax_url,
        {
          'action': 'user_feedback',
          'data'  : post
        }
    )
        .done(function () {
          // todo: success view
          // this.model.set(...);
        })
        .fail(function () {
          // todo: failure view
        });
  }
});

module.exports = AppView;
},{"13":13,"14":14,"2":2,"23":23}],13:[function(require,module,exports){
'use strict';

var template = require(4);

var UserFeedbackBar = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-bottombar-view',
  template : template(user_feedback.templates.bottombar),

  initialize: function () {
    this.model.on("change:currentWizardStep", this.changeStep, this);
  },

  render: function () {
    this.$el.html(this.template);
    this.changeStep();
    return this;
  },

  events: {
    'click .user-feedback-button-help': 'toggleWizard'
  },

  toggleWizard: function () {
    this.trigger('toggleWizard');
  },

  changeStep: function () {
    _.each(this.$el.find('.user-feedback-bar-step'), function (el) {
      if (jQuery(el).attr('data-step') <= this.model.get('currentWizardStep')) {
        jQuery(el).removeClass('hidden');
      } else {
        jQuery(el).addClass('hidden');
      }
    }, this);
  }
});

module.exports = UserFeedbackBar;
},{"4":4}],14:[function(require,module,exports){
'use strict';

var template = require(5);

var UserFeedbackButton = Backbone.View.extend({
  tagName  : 'div',
  className: 'user-feedback-button-view',
  template : template(user_feedback.templates.button),

  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    return this;
  },

  events: {
    'click #user-feedback-init-button': 'toggleInitButton',
  },

  toggleInitButton: function () {
    this.trigger('toggleInitButton');
    return this;
  }
});

module.exports = UserFeedbackButton;
},{"5":5}],15:[function(require,module,exports){
'use strict';

var template = require(3);

var CanvasView = Backbone.View.extend({
  className: 'user-feedback-wizard-step-4-canvas',
  template : _.template('<canvas id="user-feedback-canvas"></canvas><div id="user-feedback-annotations"></div>'),

  initialize: function () {
    this.highlighted = [];
    this.annotationCount = 0;
  },

  events: {
    'mouseup #user-feedback-canvas'        : 'mouseUp',
    'mousedown #user-feedback-canvas'      : 'mouseDown',
    'mousemove #user-feedback-canvas'      : 'mouseMoveClick',
    'click #user-feedback-canvas'          : 'mouseMoveClick',
    'click .user-feedback-annotation-close': 'removeAnnotation',
    'mouseleave #user-feedback-canvas'     : 'redraw'
  },

  render: function () {
    this.$el.html(this.template());
    this.delegateEvents();

    this.canvas = this.$el.find('#user-feedback-canvas')[0];
    this.rect = {};

    // @see http://stackoverflow.com/questions/18462303/incorrect-mouse-coordinates-when-drawing-on-canvas
    this.canvas.width = jQuery(document).width();
    this.canvas.height = jQuery(document).height();
    jQuery(this.canvas).width(jQuery(document).width()).height(jQuery(document).height());
    this.ctx = this.canvas.getContext('2d');
    this.redraw();

    return this;
  },

  mouseUp: function () {
    this.drag = false;

    var dtop = this.rect.startY,
        dleft = this.rect.startX,
        dwidth = this.rect.w,
        dheight = this.rect.h;

    if (dwidth == 0 || dheight == 0) return;

    if (dwidth < 0) {
      dleft += dwidth;
      dwidth *= -1;
    }
    if (dheight < 0) {
      dtop += dheight;
      dheight *= -1;
    }

    if (dtop + dheight > jQuery(document).height())
      dheight = jQuery(document).height() - dtop;
    if (dleft + dwidth > jQuery(document).width())
      dwidth = jQuery(document).width() - dleft;


    jQuery('#user-feedback-annotations').append(template({
      id       : this.annotationCount,
      top      : dtop,
      left     : dleft,
      width    : dwidth,
      height   : dheight,
      close    : user_feedback.templates.wizardStep4Annotation.close,
      closeAria: user_feedback.templates.wizardStep4Annotation.closeAria
    }));
    this.annotationCount++;

    this.redraw();
    this.rect.w = 0;
  },

  mouseDown: function (e) {
    this.rect.startX = e.pageX - jQuery(e.target).offset().left;
    this.rect.startY = e.pageY - jQuery(e.target).offset().top;
    this.rect.w = 0;
    this.rect.h = 0;
    this.drag = true;
  },

  mouseMoveClick: function (e) {
    this.redraw();
    var tmpHighlighted = [];

    jQuery(this.canvas).css('cursor', 'crosshair');

    _.each(jQuery('* :not(body,script,iframe,div,section,.user-feedback-button,.user-feedback-modal *)'), function (el) {
      if (e.pageX > jQuery(el).offset().left && e.pageX < jQuery(el).offset().left + jQuery(el).width() && e.pageY > jQuery(el).offset().top + parseInt(jQuery(el).css('padding-top'), 10) && e.pageY < jQuery(el).offset().top + jQuery(el).height() + parseInt(jQuery(el).css('padding-top'), 10)) {
        tmpHighlighted.push(jQuery(el));
      }
    }, this);

    var $toHighlight = tmpHighlighted[tmpHighlighted.length - 2]; // todo: or -1 ?

    if ($toHighlight && !this.drag) {
      jQuery(this.canvas).css('cursor', 'pointer');

      var _x = $toHighlight.offset().left - 2,
          _y = $toHighlight.offset().top - 2,
          _w = $toHighlight.width() + parseInt($toHighlight.css('padding-left'), 10) + parseInt($toHighlight.css('padding-right'), 10) + 6,
          _h = $toHighlight.height() + parseInt($toHighlight.css('padding-top'), 10) + parseInt($toHighlight.css('padding-bottom'), 10) + 6;

      this.drawlines(_x, _y, _w, _h);
      this.ctx.clearRect(_x, _y, _w, _h);

      _.each(jQuery('.user-feedback-annotation'), function (el) {
        this.ctx.clearRect(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height());
      }, this);

      if (e.type == 'click' && e.pageX == this.rect.startX && e.pageY == this.rect.startY) {
        jQuery('#user-feedback-annotations').append(template({
          id       : this.annotationCount,
          top      : _y,
          left     : _x,
          width    : _w,
          height   : _h,
          close    : user_feedback.templates.wizardStep4Annotation.close,
          closeAria: user_feedback.templates.wizardStep4Annotation.closeAria
        }));
        this.highlighted.push(this.annotationCount);
        this.annotationCount++;
        this.redraw();
      }
    }

    if (this.drag && e.type == 'mousemove') {
      jQuery('#user-feedback-highlighter').css('cursor', 'default');

      this.rect.w = (e.pageX - jQuery('#user-feedback-canvas').offset().left) - this.rect.startX;
      this.rect.h = (e.pageY - jQuery('#user-feedback-canvas').offset().top) - this.rect.startY;

      this.ctx.clearRect(0, 0, jQuery('#user-feedback-canvas').width(), jQuery('#user-feedback-canvas').height());
      this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
      this.ctx.fillRect(0, 0, jQuery('#user-feedback-canvas').width(), jQuery('#user-feedback-canvas').height());

      _.each(jQuery('.user-feedback-annotation'), function (el) {
        el = jQuery(el);
        this.drawlines(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height());
      }, this);

      this.drawlines(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
      this.ctx.clearRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);

      _.each(jQuery('.user-feedback-annotation'), function (el) {
        el = jQuery(el);
        this.ctx.clearRect(parseInt(el.css('left'), 10), parseInt(el.css('top'), 10), el.width(), el.height());
      }, this);
    }
  },

  removeAnnotation: function (e) {
    jQuery(e.currentTarget).parent().remove();
    this.redraw();
  },

  drawlines: function (x, y, w, h) {
    // set our styles for the rectangle
    this.ctx.strokeStyle = user_feedback.canvas_options.strokeStyle;
    this.ctx.shadowColor = user_feedback.canvas_options.shadowColor;
    this.ctx.shadowOffsetX = user_feedback.canvas_options.shadowOffsetX;
    this.ctx.shadowOffsetY = user_feedback.canvas_options.shadowOffsetY;
    this.ctx.shadowBlur = user_feedback.canvas_options.shadowBlur;
    this.ctx.lineJoin = user_feedback.canvas_options.lineJoin;
    this.ctx.lineWidth = user_feedback.canvas_options.lineWidth;

    this.ctx.strokeRect(x, y, w, h);

    // reset styles again
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.lineWidth = 1;
  },

  redraw: function (border) {
    border = typeof border !== 'undefined' ? border : true;
    this.ctx.clearRect(0, 0, jQuery(this.canvas).width(), jQuery(this.canvas).height());
    this.ctx.fillStyle = 'rgba(102,102,102,0.5)';
    this.ctx.fillRect(0, 0, jQuery(this.canvas).width(), jQuery(this.canvas).height());

    _.each(jQuery('.user-feedback-annotation'), function (el) {
      if (border) {
        this.drawlines(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height());
      }
      this.ctx.clearRect(parseInt(jQuery(el).css('left'), 10), parseInt(jQuery(el).css('top'), 10), jQuery(el).width(), jQuery(el).height());
    }, this);
  }
});

module.exports = CanvasView;
},{"3":3}],16:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var template = require(6);

var WizardStep1 = WizardStep.extend({
  className: 'user-feedback-wizard-step-1',
  template : template(user_feedback.templates.wizardStep1),

  nextStep: function () {
    this.model.set('userName', jQuery(document.getElementById('user-feedback-user-name')).val());
    this.model.set('userEmail', jQuery(document.getElementById('user-feedback-user-email')).val());
  }

});

module.exports = WizardStep1;
},{"22":22,"6":6}],17:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var template = require(7);

var WizardStep2 = WizardStep.extend({
  className: 'user-feedback-wizard-step-2',
  template : template(user_feedback.templates.wizardStep2),

  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    var name = ( this.model.get('userName') != '' ) ? this.model.get('userName') : user_feedback.user.name;
    this.$el.find('p:first-of-type').append(name);

    return this;
  },

  nextStep: function () {
    this.model.set('doNotShowInfoAgain', jQuery(document.getElementById('user-feedback-do-not-show-again')).is(":checked"));
  }
});

module.exports = WizardStep2;
},{"22":22,"7":7}],18:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var template = require(8);

var WizardStep3 = WizardStep.extend({
  className: 'user-feedback-wizard-step-3',
  template : template(user_feedback.templates.wizardStep3),

  nextStep: function () {
    this.model.set('userMessage', jQuery(document.getElementById('user-feedback-message')).val());
  }
});

module.exports = WizardStep3;
},{"22":22,"8":8}],19:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var CanvasView = require(15);
var userFeedbackModel = require(2);
var template = require(9);

var WizardStep4 = WizardStep.extend({
  className: 'user-feedback-wizard-step-4',
  template : template(user_feedback.templates.wizardStep4),

  events: {
    'click .user-feedback-button-screen-capture': 'screenCapture'
  },

  initialize: function () {
    this.canvasView = new CanvasView({model: userFeedbackModel});
  },

  render: function () {
    this.$el.html(this.template).append(this.canvasView.render().el);
    this.delegateEvents();

    return this;
  },

  screenCapture: function (e) {
    // Hide UI before taking the screenshot
    jQuery('#user-feedback-bottombar').hide();
    jQuery('.user-feedback-modal').hide();

    var recorder = RecordRTC(this.canvasView.canvas, {
      type: 'canvas'
    });
    recorder.startRecording();

    var that = this;

    setTimeout(function() {
      recorder.stopRecording(function(url) {
        console.log(url);
        window.open(url);

        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();

        // Show UI again
        jQuery('#user-feedback-bottombar').show();
        jQuery('.user-feedback-modal').show();
        that.trigger('nextStep');
      });
    }, 10000);

  }
});

module.exports = WizardStep4;
},{"15":15,"2":2,"22":22,"9":9}],20:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var template = require(10);

/**
 * Detect browser name + version. Example: Chrome 40, Internet Explorer 12.
 *
 * A utility function we need later on.
 *
 * @see http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
 */
navigator.saysWho = (function () {
  var ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'Internet Explorer ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) return 'Opera ' + tem[1];
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
})();

var WizardStep5 = WizardStep.extend({
  className: 'user-feedback-wizard-step-5',
  template : template(user_feedback.templates.wizardStep5),

  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    this.fillInTheData();

    return this;
  },

  fillInTheData: function () {
    var email = ( this.model.get('userEmail') != '' ) ? this.model.get('userEmail') : user_feedback.user.email;
    var name = ( this.model.get('userName') != '' ) ? this.model.get('userName') : user_feedback.user.name;
    this.$el.find('#user-feedback-overview-user img').attr('src', 'https://secure.gravatar.com/avatar/' + md5(email) + '?d=monsterid&s=90');
    this.$el.find('#user-feedback-overview-user div').append(name);
    this.$el.find('#user-feedback-overview-note').val(this.model.get('userMessage'));

    this.$el.find('#user-feedback-additional-theme').append(user_feedback.theme.name);
    this.$el.find('#user-feedback-additional-browser').append(navigator.saysWho);
    this.$el.find('#user-feedback-additional-template').append(user_feedback.theme.current_template);
    this.$el.find('#user-feedback-additional-language').append(user_feedback.language);

    var screenshot = ( this.model.get('userScreenshot') ) ? this.model.get('userScreenshot') : '';
    this.$el.find('#user-feedback-overview-screenshot-img').attr('src', screenshot);
  },

  nextStep: function () {
    this.trigger('sendData');
  }
});

module.exports = WizardStep5;
},{"10":10,"22":22}],21:[function(require,module,exports){
'use strict';

var WizardStep = require(22);
var template = require(11);

var WizardStep6 = WizardStep.extend({
  className: 'user-feedback-wizard-step-6',
  template : template(user_feedback.templates.wizardStep6)
});

module.exports = WizardStep6;
},{"11":11,"22":22}],22:[function(require,module,exports){
'use strict';

var WizardStep = Backbone.View.extend({
  render: function () {
    this.$el.html(this.template);
    this.delegateEvents();

    return this;
  },

  nextStep: function () {
  }
});

module.exports = WizardStep;
},{}],23:[function(require,module,exports){
'use strict';

var WizardStep1 = require(16);
var WizardStep2 = require(17);
var WizardStep3 = require(18);
var WizardStep4 = require(19);
var WizardStep5 = require(20);
var WizardStep6 = require(21);
var userFeedbackModel = require(2);

var UserFeedbackWizard = Backbone.View.extend({
  className: 'user-feedback-wizard-view',
  template : _.template('<div class="user-feedback-modal__container"></div>'),

  steps: [
    {
      view: new WizardStep1({model: userFeedbackModel})
    },
    {
      view: new WizardStep2({model: userFeedbackModel})
    },
    {
      view: new WizardStep3({model: userFeedbackModel})
    },
    {
      view: new WizardStep4({model: userFeedbackModel})
    },
    {
      view: new WizardStep5({model: userFeedbackModel})
    },
    {
      view: new WizardStep6({model: userFeedbackModel})
    }
  ],

  initialize: function () {
    _.bindAll(this, 'render');
    this.initialStep = 0;

    _.each(this.steps, function (step) {
      this.listenTo(step.view, 'nextStep', this.goToNextStep);
      this.listenTo(step.view, 'sendData', function () {
        this.trigger('sendData');
      });
    }, this);

    // A logged in user doesn't need to provide his name
    if (user_feedback.user.logged_in) {
      this.initialStep++;
      this.model.set('userName', user_feedback.user.name);
      this.model.set('userEmail', user_feedback.user.email);
    }

    // If the cookie is set, let's go straight to the next step
    if (this.initialStep == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
      this.initialStep++;
    }

    this.model.set('currentWizardStep', this.initialStep);
  },

  render: function () {
    var currentStep = this.steps[this.model.get('currentWizardStep')];
    this.currentView = currentStep.view;

    this.$el.html(this.currentView.render().el);

    return this;
  },

  events: {
    'click .user-feedback-button-previous': 'previousStep',
    'click .user-feedback-button-next'    : 'nextStep',
    'click .user-feedback-button-close'   : 'closeWizard',
    'click .user-feedback-button-done'    : 'closeWizard',
    'click .user-feedback-button-restart' : 'restartWizard'
  },

  previousStep: function (e) {
    e.preventDefault();
    this.goToPreviousStep();
  },

  nextStep: function (e) {
    e.preventDefault();
    this.goToNextStep();
  },

  closeWizard: function (e) {
    e.preventDefault();
    this.model.set('currentWizardStep', this.initialStep);
    this.trigger('reInitialize');
  },

  restartWizard: function (e) {
    e.preventDefault();
    this.model.set('currentWizardStep', 2);
    this.trigger('toggleBottomBar');
    this.trigger('changeStep', 2);
    this.render();
  },

  goToNextStep: function () {
    if (!this.isLastStep()) {
      var step = this.model.get('currentWizardStep') + 1;
      this.currentView.nextStep();

      // If the cookie is set, let's go straight to the next step
      if (step == 1 && document.cookie.indexOf('user_feedback_do_not_show_again') >= 0) {
        step++;
      }

      this.model.set('currentWizardStep', step);

      // todo: make more flexible
      if (this.model.get('currentWizardStep') == 4) {
        this.trigger('toggleBottomBar');
      }

      this.render();
    }
  },

  goToPreviousStep: function () {
    if (!this.isFirstStep()) {
      if (this.model.get('currentWizardStep') == 4) {
        this.trigger('toggleBottomBar');
      }

      this.model.set('currentWizardStep', this.model.get('currentWizardStep') - 1)
      this.render();
    }
  },

  isFirstStep: function () {
    return (this.model.get('currentWizardStep') == 0);
  },

  isLastStep: function () {
    return (this.model.get('currentWizardStep') == this.steps.length - 1);
  }

});

module.exports = UserFeedbackWizard;
},{"16":16,"17":17,"18":18,"19":19,"2":2,"20":20,"21":21}]},{},[1]);
