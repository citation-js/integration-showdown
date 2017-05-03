# citation.js-showdown

[Showdown](https://github.com/showdownjs/showdown) extension for [Citation.js](https://github.com/larsgw/citation.js). Browser support coming soon.

## Install

### Node.js

    npm install citation-js-showdown

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
const Showdown = require('showdown')
```

## Syntax

    ^[<INPUT>]

Where `<INPUT>` is any string that can be inputted to [`Cite`](https://github.com/larsgw/citation.js#citation.cite), omitting the quotes.