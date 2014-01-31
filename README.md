# json-inspect

> Get JSON context information based on a string

[![Build Status](https://travis-ci.org/rubenv/json-inspect.png?branch=master)](https://travis-ci.org/rubenv/json-inspect)

## Usage
Add json-inspect to your project:

### Installation (Node.JS, browser via Browserified)
```
npm install --save json-inspect
```

Reference it in your code:

```js
var jsonInspect = require('json-inspect');
```

### Installation (via bower)
```
bower install --save json-inspect
```

Add it to your HTML file:

```html
<script src="bower_components/json-inspect/dist/json-inspect.js"></script>
```

Reference it in your code:

```js
var jsonInspect = require('json-inspect');
```

### Looking up the context

Example string:

```js
{
  "string": "value",
  "number": 3,
  "object": {
    "key": "val"
  },
  "array": [
    1,
    2
  ]
}
```

Look up the context at a given line and character:

```js
var context = jsonInspect(myJson, 2, 6); 
// { key: 'string', start: 4, end: 21, value: 'value' }

var context = jsonInspect(myJson, 9, 5); 
// { key: 'array.1', start: 93, end: 102, value: 2 }
```

Look up the context at a given offset in the string:

```js
var context = jsonInspect(myJson, 60); 
// { key: 'object.key', start: 56, end: 71, value: 'val' }
```

### Two phases

You can split the process into two steps to avoid the repeated overhead of parsing if you do a lot of lookups on the same data.

```js
var tree = jsonInspect.parse(myJson);
var context = jsonInspect.getContext(tree, 8, 5);
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [Grunt](http://gruntjs.com/).


## License 

    (The MIT License)

    Copyright (C) 2014 by Ruben Vermeersch <ruben@rocketeer.be>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
