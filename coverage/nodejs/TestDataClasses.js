"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductInfo = exports.Person = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

"use strict";

var Person = function () {
  function Person(firstName, lastName) {
    (0, _classCallCheck2["default"])(this, Person);
    (0, _defineProperty2["default"])(this, "firstName", void 0);
    (0, _defineProperty2["default"])(this, "lastName", void 0);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  (0, _createClass2["default"])(Person, [{
    key: "equalsTo",
    value: function equalsTo(other) {
      return this.lastName == other.lastName;
    }
  }]);
  return Person;
}();

exports.Person = Person;

var ProductInfo = function () {
  function ProductInfo(id, name, price) {
    (0, _classCallCheck2["default"])(this, ProductInfo);
    (0, _defineProperty2["default"])(this, "id", void 0);
    (0, _defineProperty2["default"])(this, "name", void 0);
    (0, _defineProperty2["default"])(this, "price", void 0);
    this.id = id;
    this.name = name;
    this.price = price;
  }

  (0, _createClass2["default"])(ProductInfo, [{
    key: "equalsTo",
    value: function equalsTo(other) {
      return this.id == other.id;
    }
  }, {
    key: "compareTo",
    value: function compareTo(other) {
      return this.price - other.price;
    }
  }]);
  return ProductInfo;
}();

exports.ProductInfo = ProductInfo;