"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutNoSuchElementException = exports.KoconutInvalidArgumentException = exports.KoconutIndexOutOfBoundsException = exports.KoconutConflictException = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

var KoconutError = function (_Error) {
  (0, _inherits2["default"])(KoconutError, _Error);

  var _super = _createSuper(KoconutError);

  function KoconutError(message) {
    var _this;

    (0, _classCallCheck2["default"])(this, KoconutError);
    _this = _super.call(this, message);
    _this.name = _this.constructor.name.split(/(?=[A-Z])/).join(" ");
    Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), _this.constructor);
    return _this;
  }

  return KoconutError;
}((0, _wrapNativeSuper2["default"])(Error));

var KoconutInvalidArgumentException = function (_KoconutError) {
  (0, _inherits2["default"])(KoconutInvalidArgumentException, _KoconutError);

  var _super2 = _createSuper(KoconutInvalidArgumentException);

  function KoconutInvalidArgumentException() {
    (0, _classCallCheck2["default"])(this, KoconutInvalidArgumentException);
    return _super2.apply(this, arguments);
  }

  return KoconutInvalidArgumentException;
}(KoconutError);

exports.KoconutInvalidArgumentException = KoconutInvalidArgumentException;

var KoconutIndexOutOfBoundsException = function (_KoconutError2) {
  (0, _inherits2["default"])(KoconutIndexOutOfBoundsException, _KoconutError2);

  var _super3 = _createSuper(KoconutIndexOutOfBoundsException);

  function KoconutIndexOutOfBoundsException() {
    (0, _classCallCheck2["default"])(this, KoconutIndexOutOfBoundsException);
    return _super3.apply(this, arguments);
  }

  return KoconutIndexOutOfBoundsException;
}(KoconutError);

exports.KoconutIndexOutOfBoundsException = KoconutIndexOutOfBoundsException;

var KoconutNoSuchElementException = function (_KoconutError3) {
  (0, _inherits2["default"])(KoconutNoSuchElementException, _KoconutError3);

  var _super4 = _createSuper(KoconutNoSuchElementException);

  function KoconutNoSuchElementException() {
    (0, _classCallCheck2["default"])(this, KoconutNoSuchElementException);
    return _super4.apply(this, arguments);
  }

  return KoconutNoSuchElementException;
}(KoconutError);

exports.KoconutNoSuchElementException = KoconutNoSuchElementException;

var KoconutConflictException = function (_KoconutError4) {
  (0, _inherits2["default"])(KoconutConflictException, _KoconutError4);

  var _super5 = _createSuper(KoconutConflictException);

  function KoconutConflictException() {
    (0, _classCallCheck2["default"])(this, KoconutConflictException);
    return _super5.apply(this, arguments);
  }

  return KoconutConflictException;
}(KoconutError);

exports.KoconutConflictException = KoconutConflictException;