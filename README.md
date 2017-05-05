# citation.js-showdown

[Showdown](https://github.com/showdownjs/showdown) extension for [Citation.js](https://github.com/larsgw/citation.js).

[![NPM version](https://img.shields.io/npm/v/citation-js-showdown.svg)](https://npmjs.org/citation-js-showdown)
[![NPM total downloads](https://img.shields.io/npm/dt/citation-js-showdown.svg)](https://npmjs.org/citation-js-showdown)
[![Build Status](https://travis-ci.org/larsgw/citation.js-showdown.svg?branch=master)](https://travis-ci.org/larsgw/citation.js-showdown)

## Install

### Node.js

    npm install citation-js-showdown

### Browser

Download [this file](https://github.com/larsgw/citation.js-showdown/blob/master/build/showdown.citation.js).

## Use

### Node.js

First, load showdown:

```js
const Showdown = require('showdown')
```

Second, register extension:

```js
require('citation-js-showdown')
```

Third, use extension in the showdown converter:

```js
const converter = new Showdown.Converter({ extensions: ['citation.js'] })
```

Now you can use the converter like you normally would.

### Browser

```html
<script src="showdown.js"></script>
<script src="showdown.citation.js"></script>
<script>
  const converter = new Showdown.Converter({ extensions: ['citation.js'] })
</script>
```

Now you can use the converter like you normally would.

## Syntax

    ^[<INPUT>]

Where `<INPUT>` is any string that can be inputted to [`Cite`](https://github.com/larsgw/citation.js#citation.cite), omitting
the quotes. Arrays may not work currently, see todos.

## Todo

* Sorting based on IDs
* Add support for `^[<AUTHOR>, <YEAR>, <TITLE>, <ETC>]` syntax
* DOI input (actually a [todo for Citation.js](https://github.com/larsgw/citation.js/issues/25);
  if support for DOI is added there, it will automatically work here, assuming I update the dependencies)
* Work async (Citation.js will probably be at least partly async soon). Requires either:
    * a hack in whatever program you're rendering the HTML in; or
    * [async support in showdown](https://github.com/showdownjs/showdown/issues/322)
* Configuration
    * output options available in Citation.js (assuming we want formatted citations that's only style and language)
    * Wikipedia-style references (i.e. <sup>[1]</sup>) or following style guides (i.e. (Willighagen, 2017))