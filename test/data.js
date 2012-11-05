
var data = require('data');

/**
 * lazy
 */

function c (el) {
  return document.createElement(el || 'i');
}

/**
 * assert
 */

function assert (b) {
  if (b) return;
  throw new Error('Oh noes!');
}


describe('data(el)', function () {
  it('should return an api', function () {
    assert('object' == typeof data(c()));
  })
  it('should attach a `__uniq` property', function () {
    var a = c(), b = c();
    assert(data(c()).el.__uniq != data(c()).el.__uniq);
  })
})

describe('data(el).get()', function () {
  it('should get all cached data', function () {
    assert(data(c()).set(console).get().log == console.log);
  })
})

describe('data(el).has()', function () {
  it('should return `true` if given cache key exists', function () {
    assert(true == data(c()).set(console).has('log'));
  })
})

describe('data(el).set()', function () {
  it('should set `obj`', function () {
    assert(data(c()).set(console).get('log') == console.log);
  })
  it('should set `key`, `val`', function () {
    assert(data(c()).set('log', console.log).get('log') == console.log);
  })
})

describe('data(el).del()', function () {
  it('should delete the given `key`', function () {
    assert(undefined == data(c()).set(console).del('log').get('log'))
  })
  it('should delete all cached data if key is omitted', function () {
    var el = c();
    assert(undefined == data(el).set(console).del().get('log'))
    assert(undefined == data(el).get('dir'))
    assert(0 == Object.keys(data(el).del().cache).length);
  })
})
