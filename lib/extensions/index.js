'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manual = exports.auto = undefined;

var _index = require('./auto/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./manual/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.auto = _index2.default;
exports.manual = _index4.default;