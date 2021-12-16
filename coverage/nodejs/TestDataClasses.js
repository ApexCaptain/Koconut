"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worker = exports.ProductInfo = exports.Person = exports.Dog = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _module = require("../../dist/module");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

_module.KoconutDeprecation.isRunningOnDevUnitTesting = true;

var Person = function () {
  function Person(firstName, lastName) {
    (0, _classCallCheck2["default"])(this, Person);
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

var Dog = function () {
  function Dog(name, age, id) {
    (0, _classCallCheck2["default"])(this, Dog);
    this.name = name;
    this.age = age;
    this.id = id;
  }

  (0, _createClass2["default"])(Dog, [{
    key: "equalsTo",
    value: function equalsTo(other) {
      return new _module.KoconutBoolean(this.id == other.id);
    }
  }]);
  return Dog;
}();

exports.Dog = Dog;

var Worker = function (_Person) {
  (0, _inherits2["default"])(Worker, _Person);

  var _super = _createSuper(Worker);

  function Worker(firstName, lastName, pay) {
    var _this;

    (0, _classCallCheck2["default"])(this, Worker);
    _this = _super.call(this, firstName, lastName);
    _this.pay = pay;
    return _this;
  }

  (0, _createClass2["default"])(Worker, [{
    key: "compareTo",
    value: function compareTo(other) {
      return new _module.KoconutPrimitive(this.pay - other.pay);
    }
  }]);
  return Worker;
}(Person);

exports.Worker = Worker;

var ProductInfo = function () {
  function ProductInfo(id, name, price) {
    (0, _classCallCheck2["default"])(this, ProductInfo);
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