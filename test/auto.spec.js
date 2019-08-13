/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const Showdown = require('showdown')

require('../lib/index')

const converter = new Showdown.Converter({ extensions: ['citation.js'] })

const input = fs.readFileSync(path.join(__dirname, '/in.md'), 'utf8')
const output = fs.readFileSync(path.join(__dirname, '/out.html'), 'utf8')

describe('auto', () => {
  it('works', () => {
    const test = converter.makeHtml(input)
    expect(test).toBe(output)
  })
})
