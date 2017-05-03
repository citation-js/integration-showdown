'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _citationJs = require('citation-js');

var _citationJs2 = _interopRequireDefault(_citationJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getId, getRef].map(regeneratorRuntime.mark);

var options = {
  format: 'string',
  type: 'html',
  style: 'citation-apa'
};

var parse = {
  start: {
    re: /^\W\^\[/,
    len: 3
  },
  end: {
    re: /^\]\W/,
    len: 2
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
};

var matchText = function matchText(text) {
  var matches = [];
  var lastIndex = text.length - 1;

  var index = 0;

  while (index <= lastIndex) {
    if (parse.start.re.test(text.slice(index, index + parse.start.len))) {
      var match = {};
      match.startIndex = index;

      index += parse.start.len;
      while (index <= lastIndex) {
        var string = false;
        var bracket = 0;

        if (text[index - 1] !== '\\') {
          if (parse.string.re.test(text.slice(index, index + parse.string.len))) {
            string = !string;
          } else if (!string && parse.bracket.open.re.test(text.slice(index, index + parse.bracket.open.len))) {
            bracket++;
          } else if (!string && parse.bracket.close.re.test(text.slice(index, index + parse.bracket.close.len))) {
            bracket--;
          }
        }

        if (!string && bracket < 0 && parse.end.re.test(text.slice(index, index + parse.end.len))) {
          index += parse.end.len;
          match.endIndex = index;
          break;
        }

        index++;
      }

      if (!match.hasOwnProperty('endIndex')) {
        break;
      }

      match.text = text.slice(match.startIndex + parse.start.len, match.endIndex - parse.end.len);
      matches.push(match);
    } else {
      index++;
      continue;
    }
  }

  return matches;
};

function getId() {
  var index;
  return regeneratorRuntime.wrap(function getId$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!++index) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return index.toString();

        case 4:
          _context.next = 1;
          break;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var getRefHtml = function getRefHtml(id) {
  return '<sup>[' + id + ']</sup>';
};
// template string syntax higlighting issue fix: //

function getRef(ids) {
  var id;
  return regeneratorRuntime.wrap(function getRef$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!true) {
            _context2.next = 6;
            break;
          }

          id = ids.next().value;
          _context2.next = 4;
          return { ref: getRefHtml(id), id: id };

        case 4:
          _context2.next = 0;
          break;

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

exports.default = function (input) {
  var matches = matchText(input);
  var refFactory = getRef(getId());
  var citations = new _citationJs2.default([], options);

  matches.forEach(function (_ref) {
    var startIndex = _ref.startIndex,
        endIndex = _ref.endIndex,
        text = _ref.text;

    var refs = [];

    citations.add(_citationJs2.default.parse.input.chain(text).map(function (entry) {
      var _refFactory$next$valu = refFactory.next().value,
          ref = _refFactory$next$valu.ref,
          id = _refFactory$next$valu.id;

      refs.push(ref);
      entry.id = id;
      return entry;
    }));

    input = '' + input.substr(0, startIndex + 1) + refs.join(' ') + input.substr(endIndex - 1);
  });

  var bibliography = citations.get().replace(/(\n|<br\s*\/?>)\s*/g, '');

  return '' + input + bibliography;
};