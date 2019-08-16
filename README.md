# citation.js-showdown

[Showdown](https://github.com/showdownjs/showdown) extension for [Citation.js](https://github.com/larsgw/citation.js).

[![NPM version](https://img.shields.io/npm/v/citation-js-showdown.svg)](https://npmjs.org/citation-js-showdown)
[![NPM total downloads](https://img.shields.io/npm/dt/citation-js-showdown.svg)](https://npmjs.org/citation-js-showdown)
[![Build Status](https://travis-ci.org/citation-js/integration-showdown.svg?branch=master)](https://travis-ci.org/citation-js/integration-showdown)

## Install

### Node.js

    npm install citation-js-showdown

### Browser

Download [this file](https://github.com/larsgw/citation.js-showdown/blob/master/build/showdown.citation.js).

## Use

First, load showdown and the required plugins:

```js
const showdown = require('showdown')

// Citation.js plugins
require('@citation-js/plugin-csl')
require('@citation-js/plugin-bibtex') // see below
```

Second, register the extension:

```js
require('citation-js-showdown')(showdown, options)
```

Third, use extension in the showdown converter:

```js
const converter = new showdown.Converter({ extensions: ['citation.js'] })
```

Now you can use the converter like you normally would.

### Options

  - `template` (optional `String`): a CSL style name
  - `locale` (optional `String`): a CSL locale language
  - `references` (optional `String`): BibTeX file contents to cite by label in your document (requires the `@citation-js/plugin-bibtex` plugin)

### Syntax

    ^[input]

Where `input` is any string that can be inputted to [`Cite`](https://github.com/larsgw/citation.js#citation.cite). Any appended sequence of `[input]` is allowed to for additional citations in the same cluster. Example:

    That also allows the analysis and visualisation of how research
    cites each other ^[shotton_publishing_2013][eck_citnetexplorer_2014]
