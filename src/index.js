import extension from './filter'
import { plugins, util } from '@citation-js/core'

module.exports = function (showdown, options) {
  const { templates, locales } = plugins.config.get('@csl')
  options = { ...options }

  if (options.template && !templates.has(options.template)) {
    try {
      templates.add(options.template, util.fetchFile(
        `https://cdn.jsdelivr.net/gh/citation-style-language/styles@master/${options.template}.csl`
      ))
    } catch (e) {}
  }

  if (options.lang && !locales.has(options.lang)) {
    try {
      locales.add(options.lang, util.fetchFile(
        `https://cdn.jsdelivr.net/gh/citation-style-language/locales@master/locales-${options.lang}.xml`
      ))
    } catch (e) {}
  }

  if (options.references) {
    if (!plugins.has('@bibtex')) {
      console.error('Error: the `references` option is not available without @citation-js/plugin-bibtex')
    }

    options.references = plugins.input.chain(options.references, {
      forceType: '@bibtex/text',
      generateGraph: false
    }).reduce((cache, reference) => {
      cache[reference['citation-label']] = reference
      return cache
    }, {})
  }

  const oldFilter = extension.filter
  extension.filter = input => oldFilter(input, options)

  showdown.extension('citation.js', () => [extension])
}
