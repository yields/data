
/**
 * expose `data`
 */

module.exports = data;

/**
 * global unique id
 */

data.uniq = 0;

/**
 * global cache.
 */

data.cache = {};

/**
 * api
 */

data.api = {
  has: has,
  del: del,
  set: set,
  get: get
};

/**
 * Get data `api` for the provided `el`.
 *
 * example:
 *
 *        var el = document.scripts[0];
 *
 *        data(el)
 *          .set({ foo: bar })
 *          .set('hello', 'world')
 *
 *        data(el).has('foo')
 *        // > true
 *        data(el).del('foo').has('foo');
 *        // > false
 *
 *        data(el).get();
 *        // > { hello: 'world' }
 *        data(el).get('hello');
 *        // > world
 *        data(el).get('foo');
 *        // > undefined
 *
 * @param {HTMLElement} el
 * @return {Object}
 */

function data (el) {
  var id = el.__uniq || ++data.uniq, cache;
  cache = (data.cache[id] = data.cache[id] || {});
  el.__uniq = id;
  data.api.el = el;
  data.api.cache = cache;
  return data.api;
}

/**
 * Set `key` to `val` or provide
 * an object that will be merged
 * with the element `data`.
 *
 *
 * example:
 *
 *        set({ foo: 'bar' });
 *        set(console).get();
 *        // > { foo: 'bar', log: fn ... }
 *        set('foo', 'hello').get();
 *        // > { foo: 'hello', log: fn }
 *        set({}).get();
 *        // > {}
 *
 * @param {String|Object} name
 * @param {mixed} val
 * @return {self}
 */

function set (name, val) {
  if ('string' != typeof name) {
    for (var k in name) {
      this.cache[k] = name[k];
    }
  } else {
    this.cache[name] = val;
  }

  return this;
}

/**
 * Get `value` where `key`.
 *
 * if `key` argument is omitted
 * the method will return all `data`.
 *
 * note that the method will first
 * attempt to get the `key` from the
 * cache, if it's not there it will attempt
 * to get `data-*` attr.
 *
 * example:
 *
 *            get('foo');
 *            // > null
 *            get();
 *            // > {}
 *
 * @param {String} key
 * @return {mixed}
 */

function get (k) {
  var cache = this.cache, ret;
  if (!k) return cache;
  if (ret = cache[k]) return ret;
  return cache[k] = attr(this.el, k);
}

/**
 * Check wether or not `key` exists.
 *
 * example:
 *
 *          has('foo');
 *          // > false
 *          set('foo', 'bar').has('foo');
 *          // > true
 *
 * @param {String} key
 * @return {bool}
 */

function has (key) {
  return !! this.get(key);
}

/**
 * delete `key` from cache.
 *
 * if `key` is omitted the method
 * will reset the element cache to
 * a new `Object`.
 *
 * example:
 *
 *        set('foo', 'bar');
 *        del('foo').get();
 *        // > {}
 *        set(console).del();
 *        // > {}
 *
 * @param {String} key
 * @return {self}
 */

function del (key) {
  if (key) {
    delete this.cache[key];
  } else {
    data.cache[this.el.__uniq] =
    this.cache = {};
  }

  return this;
}

/**
 * get attribute helper.
 *
 * @param {HTMLElement} el
 * @param {String} k
 */

function attr (el, k) {
  return el.getAttribute('data-' + k);
}
