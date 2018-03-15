# Daintree file system API (dfs)

Daintree implements a virtual file system abstraction, referred to as dfs.

The core can be configured to use pluggable dfs implementations, providing they
strictly follow this guide and provide this structure.

## Contents

1. [JavaScript implementation details](#javascript-implementation-details)
1. [Required methods](#required-methods)
	1. readDir
	1. readFile
	1. writeFile
	1. readDirTree
	1. makeDir
	1. [TODO] move
	1. [TODO] copy

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

### readDir(path, cache=true) (async)

Reads the contents of a directory. Must exclude '.' and '..'.

```txt
Method name: readDir
Type:        asynchronous
Arguments:
    path:    (string)   - If first character is not '/', must be relative.
    cache:   (boolean)  - Forcefully deny any kind of application level caching on the returned results.
Return:      (array)    - An array of 'file' objects.
Throws:      (error)    - On async rejection or error.
```
#### Call signature:

```javascript
try {
	let files = await dfs.readDir("/tmp");
} catch (e) {
	console.error('Some error occured.');
}
```

### readFile(filePath) (async)

Read the entire contents of a file. Must throw on error when encountered. 
Only handles reading files as text files. Binary files must be ignored (but)
may be later added by `readFileBinary`.

```txt
Method name:     readFile
Type:            asynchronous
Arguments:
    filePath:    (string) - If first character is not '/', must be relative.
Return:          (mixed)  - Either a string or buffer of bytes.
Throws:          (error)  - On async rejection or i/o error.
```
#### Call signature:

```javascript
try {
	let fileContents = await dfs.readFile('/tmp/test.c');
} catch (e) {
	console.error('Some error occured.');
	console.error(e);
}
```

### writeFile(filePath, contentBuffer, encoding="utf8") (async)

Writes a given buffer to a given file path. If no encoding is specified, it 
must default to utf8. File must be completely written, not appended.

```txt
Method name:        writeFile
Type:               asynchronous
Arguments:
    filePath:       (string)  - If first character is not '/', must be relative.
    contentBuffer:  (string)  - The content buffer to write to the file.
Return:             (integer) - The size of the file in bytes, after writing.
Throws:             (error)   - On async rejection or i/o error.
```
#### Call signature:

```javascript
try {
	let writtenSize = await dfs.writeFile('/tmp/test.c', '#include <stdio.h>');
} catch (e) {
	console.error('Some error occured.');
	console.error(e);
}

// - OR - 

try {
	let writtenSize = await dfs.writeFile('/tmp/test.c', '#include <stdio.h>', 'ascii');
} catch (e) {
	console.error('Some error occured.');
	console.error(e);
}
```

### readDirTree(path, cache=true) (async)

Reads the contents of a directory, and recursively adds all child folders
to the generated list. Must exclude '.' and '..' in each directory. Must follow
symbolic links.

```txt
Method name: readDirTree
Type:        asynchronous
Arguments:
    path:    (string)   - If first character is not '/', must be relative.
    cache:   (boolean)  - Forcefully deny any kind of application level caching on the returned results.
Return:      (array)    - An array of 'file' objects.
Throws:      (error)    - On async rejection or error.
```
#### Call signature:

```javascript
try {
	let fileTree = await dfs.readDirTree("/tmp");
} catch (e) {
	console.error('Some error occured.');
}
```

### makeDir(path, autoCreatePaths=false) (async)

Creates a new directory at a given path. Must only auto-created non-existant
parent path structures if specified by autoCreatePaths. Must work inside
symbolic links.

```txt
Method name: makeDir
Type:        asynchronous
Arguments:
    path:           (string)         - If first character is not '/', must be relative.
    autoCreatePaths (boolean)        - Set to true to auto-create non-existant parent paths.
Return:             (string)         - A string value confirming the created path.
Throws:             (error)          - On async rejection or error.
```
#### Call signature:

```javascript
try {
	let newDir = await dfs.makeDir('/tmp/a/b', true);
} catch (e) {
	console.error('Some error occured.');
}
```

