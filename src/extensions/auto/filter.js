import Cite from 'citation-js'

const options = {
  format: 'string',
  type: 'html',
  style: 'citation-apa'
}

const parse = {
  start: {
    re: /^\^\[/,
    len: 2,
    diff: 0
  },
  end: {
    re: /^\]/,
    len: 1,
    diff: 0
  },
  string: {
    re: /^"/,
    len: 1
  },
  bracket: {
    open: {
      re: /^\[/,
      len: 1
    },
    close: {
      re: /^\]/,
      len: 1
    }
  }
}

const matchText = (text) => {
  const matches = []
  const lastIndex = text.length - 1

  let index = 0

  while (index <= lastIndex) {
    if (parse.start.re.test(text.slice(index, index + parse.start.len))) {
      let match = {}
      match.startIndex = index
      index += parse.start.len

      let string = false
      let bracket = 0
      while (index <= lastIndex) {
        if (!string && bracket <= 0 && parse.end.re.test(text.slice(index, index + parse.end.len))) {
          index += parse.end.len
          match.endIndex = index
          break
        }

        if (text[index - 1] !== '\\') {
          if (!string && parse.bracket.open.re.test(text.slice(index, index + parse.bracket.open.len))) {
            bracket++
          } else if (!string && bracket > 0 && parse.bracket.close.re.test(text.slice(index, index + parse.bracket.close.len))) {
            bracket--
          } else if (parse.string.re.test(text.slice(index, index + parse.string.len))) {
            string = !string
          }
        }

        index++
      }

      if (!match.hasOwnProperty('endIndex')) {
        break
      }

      match.text = text.slice(match.startIndex + parse.start.len, match.endIndex - parse.end.len)
      matches.push(match)
    } else {
      index++
      continue
    }
  }

  return matches
}

function * getId () {
  let index = 0
  while (++index) {
    yield index.toString()
  }
}

const getRefHtml = (id) => `<sup>[${id}]</sup>`
// template string syntax higlighting issue fix: //

function * getRef (ids) {
  while (true) {
    const id = ids.next().value

    yield {ref: getRefHtml(id), id}
  }
}

export default (input) => {
  const matches = matchText(input)
  const refFactory = getRef(getId())
  const citations = new Cite([], options)

  let refs = []
  matches.forEach(function ({text}) {
    const localRefs = []

    citations.add(Cite.parse.input.chain(text).map((entry) => {
      const {ref, id} = refFactory.next().value
      localRefs.push(ref)
      entry.id = id
      return entry
    }))

    refs = refs.concat(localRefs)
  })
  matches.reverse().forEach(function ({startIndex, endIndex}) {
    input = `${input.substr(0, startIndex + parse.start.diff)}${refs.pop()}${input.substr(endIndex - parse.end.diff)}`
  })

  const bibliography = citations.get().replace(/(<br\s*\/?>)/g, '')

  return `${input}${bibliography}`
}
