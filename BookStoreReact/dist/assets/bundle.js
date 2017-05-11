'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ClassComponent = require('./componets/ClassComponent');

var _ClassComponent2 = _interopRequireDefault(_ClassComponent);

var _Stateless = require('./componets/Stateless');

require('./componets/css/style.css');

var _RouterComponent = require('./componets/RouterComponent');

var _RouterComponent2 = _interopRequireDefault(_RouterComponent);

var _BookStore = require('./models/BookStore');

var _BookStore2 = _interopRequireDefault(_BookStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.React = _react2.default;

(0, _reactDom.render)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_RouterComponent2.default, { bookStore: _BookStore2.default })
), document.getElementById('reactor-container'));
