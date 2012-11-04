
# data

  attach data to elements. think $.data().

## Installation

    $ component install yields/data

## API

### api = data(el)

Get new data api for the given element.

### api.set(key, val)
### api.set(obj)

Merge the provided `obj` or set
`key` to `val`.

### api.get(key)
### api.get()

Get all data or a single value by `key`,
if the `key` does not exists it will be lookedup
in the element `data-*` attributes cached and then
returned.

### api.has(key)

Wether or not `key` exists

### api.del(key)
### api.del()

Delete all data or a single `key` from cache.

### api.cache

the element cache

### api.el

the element.



## License

  MIT
