"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutPair = exports.Pair = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _module = require("../../../module.internal");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Represents a generic pair of two Values. There is no meaning attached to values
 * in this class. It can be used for any purpose. Pair exhibits values semantics,
 * i.e. two pairs are equal if both components are equal. However, if any of those
 * two values are instance of class, you'd better make the class explicitly distinguishable
 * by inheriting {@link KoconutEquatable}. Please, check the {@link Pair.equalsTo example of 'equalsTo' method}
 * @see
 * <pre>
 * -- Base --
 * {@link KoconutPair}, {@link Entry}, {@link KoconutEntry}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param FirstType The type of the first value.
 * @param SecondType The type of the second value.
 */
var Pair = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Pair, null, [{
    key: "from",

    /**
     * Create a {@link Pair} instance by iterable two values pair.
     * 
     * @param pair Values pair of first/second as iterable.
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair)
     * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
     * ```
     */
    value: function from(pair) {
      return new Pair(pair[0], pair[1]);
    }
    /**
     * Constructor of {@link Pair}.
     * 
     * @param firstElement FirstType element.
     * @param secondElement SecondType element.
     */

  }]);

  function Pair(firstElement, secondElement) {
    (0, _classCallCheck2["default"])(this, Pair);
    (0, _defineProperty2["default"])(this, "firstElement", void 0);
    (0, _defineProperty2["default"])(this, "secondElement", void 0);
    this.firstElement = firstElement;
    this.secondElement = secondElement;
  }
  /**
   * Returns the first value of this first/second pair.
   * @returns The first value of this first/second pair.
   */


  (0, _createClass2["default"])(Pair, [{
    key: "toString",

    /**
     * Turns this {@link Pair} instance into a simple JSON object string.
     * 
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toString()) // Or, you can use console.log(`${myPair}`)
     * // ↑ {"first":"Apex","second":"Captain"}
     * ```
     */
    value: function toString() {
      return JSON.stringify({
        first: this.first,
        second: this.second
      });
    }
    /**
     * Turns this {@link Pair} instance into a simple array.
     * 
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toArray())
     * // ↑ [ 'Apex', 'Captain' ]
     * ```
     */

  }, {
    key: "toArray",
    value: function toArray() {
      return [this.first, this.second];
    }
    /**
     * Turns this {@link Pair} instance into a simple {@link Entry}
     * @example
     * ```typescript
     * const myPair = Pair.from(["Apex","Captain"])
     * console.log(myPair.toEntry())
     * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
     * ```
     */

  }, {
    key: "toEntry",
    value: function toEntry() {
      return new _module.Entry(this.first, this.second);
    }
    /**
     * Class {@link Pair} implments {@link KoconutEquatable}. The '{@link KoconutEquatable.equalsTo equalsTo}' method of
     * this is basically check each individual element (first/second) are same or not. When the type of each element
     * is child of {@link KoconutEquatable}, it'd be done by using its '{@link KoconutEquatable.equalsTo equalsTo}' method.
     * Otherwise, it'd be done simply by '==' operator.
     * @param other 
     * 
     * @example
     * ```typescript
     *   // Case 1 -- All values are simply number or string 
     *   const myPairCase1_01 = Pair.from([10, 20])
     *   const myPairCase1_02 = Pair.from([10, 20])
     *   console.log(`${myPairCase1_01.equalsTo(myPairCase1_02)}`)
     *   // ↑ true
     *
     *   const myPairCase1_03 = Pair.from(["Apex", "Captain"])
     *   const myPairCase1_04 = Pair.from(["Apex", "Captain"])
     *   console.log(`${myPairCase1_03 == myPairCase1_04}`)
     *   // ↑ false
     *   console.log(`${myPairCase1_03.equalsTo(myPairCase1_04)}`)
     *   // ↑ true
     *
     *   // Case 2 -- First Type is indistinguishable class
     *   class MyClass {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *   }
     *   const myPairCase2_01 = Pair.from([new MyClass("Apex"), "Captain"])
     *   const myPairCase2_02 = Pair.from([new MyClass("Apex"), "Captain"])
     *   console.log(`${myPairCase2_01.equalsTo(myPairCase2_02)}`)
     *   // ↑ false
     *
     *   // Case 3 -- First Type is distinguishable class 
     *   class MyDistinguishableClass implements KoconutEquatable {
     *       private value : string
     *       constructor(value : string) {
     *           this.value = value
     *       }
     *       equalsTo(other : MyDistinguishableClass) : boolean {
     *           return this.value == other.value
     *       }
     *   }
     *   const myPairCase3_01 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   const myPairCase3_02 = Pair.from([new MyDistinguishableClass("Apex"), "Captain"])
     *   console.log(`${myPairCase3_01.equalsTo(myPairCase3_02)}`)
     *   // ↑ true
     * ```
     */

  }, {
    key: "equalsTo",
    value: function equalsTo(other) {
      var doseEquals = false;
      if (_module.KoconutTypeChecker.checkIsEquatable(this.firstElement) && _module.KoconutTypeChecker.checkIsEquatable(other.firstElement)) doseEquals = this.firstElement.equalsTo(other.firstElement);else doseEquals = this.firstElement == other.firstElement;

      if (doseEquals) {
        if (_module.KoconutTypeChecker.checkIsEquatable(this.secondElement) && _module.KoconutTypeChecker.checkIsEquatable(other.secondElement)) doseEquals = this.secondElement.equalsTo(other.secondElement);else doseEquals = this.secondElement == other.secondElement;
      }

      return doseEquals;
    }
  }, {
    key: "first",
    get: function get() {
      return this.firstElement;
    }
    /**
     * Returns the second value of this first/second pair.
     * @returns The second value of this first/second pair.
     */

  }, {
    key: "second",
    get: function get() {
      return this.secondElement;
    }
  }]);
  return Pair;
}();
/**
 * Koconut Wrapper class for {@link Pair}
 * 
 * @see
 * <pre>
 * -- Base --
 * {@link Pair}, {@link Entry}, {@link KoconutPair}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param FirstType Check for {@link Pair}
 * @param SecondType Check for {@link Pair}
 */


exports.Pair = Pair;

var KoconutPair = /*#__PURE__*/function (_KoconutPrimitive) {
  (0, _inherits2["default"])(KoconutPair, _KoconutPrimitive);

  var _super = _createSuper(KoconutPair);

  /**
   * Constructor of {@link KoconutPair}
   * 
   * @param first FirstType element of inner {@link Pair} instance.
   * @param second SecondType element of inner {@link Pair} instance.
   */
  function KoconutPair() {
    var _this;

    var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0, _classCallCheck2["default"])(this, KoconutPair);
    if (first != null && second != null) _this = _super.call(this, new Pair(first, second));else _this = _super.call(this);
    return (0, _possibleConstructorReturn2["default"])(_this);
  }
  /**
   * Class {@link KoconutPair} implements {@link KoconutEquatable}. The equality check process
   * is done by using '{@link Pair.equalsTo equalsTo method of Pair}'
   * @param other 
   */


  (0, _createClass2["default"])(KoconutPair, [{
    key: "equalsTo",
    value: function equalsTo(other) {
      if (this.data != null && other.data != null) return this.data.equalsTo(other.data);
      return false;
    }
  }]);
  return KoconutPair;
}(_module.KoconutPrimitive);

exports.KoconutPair = KoconutPair;