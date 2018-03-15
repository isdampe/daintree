# Daintree file system API (dfs)

Daintree implements a virtual file system abstraction, referred to as dfs.

The core can be configured to use pluggable dfs implementations, providing they
strictly follow this guide and provide this structure.

## JavaScript implementation details

The pluggable dfs implementation should export a single `Class`, which is an
extended instance of the `DaintreeFileSystem` `Class`.

A constructor must be defined that sets a property `config` on the object.

The `config` property must be an object containing the following fields.

```json
{
	"name": "My file system",
	"offlineSupport": true
}

```

There are no other specific _requirements_ except the implementation of the
specified methods described below.

Wrapping these requirements together should look something like


```javascript
class MyDaintreeFileSystem extends DaintreeFileSystem
{
	constructor() {
		this.config = {
			"name": "Local storage",
			"offlineSupport": true
		}
	}
}
```

## Required methods

Each dfs pluggable needs to support all of the following methods, as described
below. If your pluggable does not support a method mentioned below. Avoiding
implemention of a required method will cause the Daintree core to emit a console
warning about an unimplemented method.

### async readdir(path)

Reads the contents of a directory. Must exclude '.' and '..'.

```txt
Method name: readdir
Type:        asynchronous
Arguments:
	path:    (string)   - If first character is not '/', must be relative.
Return:      (array)    - An array of 'file' objects.
Throws:      (error)    - On async rejection.
```
#### Call signature:

```javascript
try {
	let files = dfs.readdir("/tmp");
} catch (e) {
	console.error('Some error occured.');
}
```
