import { plugins } from '@citation-js/core'
import CSL from 'citeproc'

const pattern = /(?<!\\)\^(\[[^\]]*\])+/g
const cslConfig = plugins.config.get('@csl')

function filter (input, options) {
  const matches = input.match(pattern)
  if (!matches) {
    return input
  }

  const clusters = matches.map(parseRef)
  const store = clusters.reduce(
    (store, refs, index) => processCluster(store, refs, index, options),
    { citations: [], refs: {}, data: {} }
  )

  const engine = new CSL.Engine(
    {
      retrieveItem (id) { return store.data[id] },
      retrieveLocale (lang) { return cslConfig.locales.get(lang) }
    },
    cslConfig.templates.get(options.template || 'apa'),
    options.lang || 'en-US'
  )

  engine.setOutputFormat('html')
  engine.updateItems(Object.values(store.refs).map(({ id }) => id))

  const context = { pre: [], post: [] }
  const citations = Object.fromEntries(clusters.flatMap((refs, noteIndex) => {
    const citationID = getId('citation')

    const cluster = engine.processCitationCluster({
      properties: { noteIndex },
      citationItems: refs.map(ref => ({
        id: store.refs[ref].id
      })),
      citationID
    }, context.pre, context.post)[1]

    context.pre.push([citationID, noteIndex])

    return cluster
  }))

  {
    let noteIndex = 0
    input = input.replace(pattern, match => citations[noteIndex++])
  }

  const [{ bibstart, bibend }, bibliography] = engine.makeBibliography()

  input += ['', bibstart, ...bibliography, bibend].join('\n')

  return input
}

function getId (prefix) {
  return `${prefix.toUpperCase()}-${Math.random().toString(36).slice(2, 12)}`
}

function parseRef (match) {
  return match.slice(2, -1).split('][')
}

function processCluster (store, refs, index, options) {
  for (const ref of refs) {
    let id

    if (ref in store.refs) {
      id = store.refs[ref].id
    } else {
      id = getId('item')

      store.refs[ref] = { id, index }
      store.data[id] = options.references && ref in options.references
        ? options.references[ref]
        : plugins.input.chain(ref, { generateGraph: false }).shift()
      store.data[id].id = id
    }

    store.citations.push([id, index])
  }

  return store
}

export default {
  type: 'lang',
  filter
}
