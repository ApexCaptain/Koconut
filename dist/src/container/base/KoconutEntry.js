"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KoconutEntry = exports.Entry = void 0;

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _module = require("../../../module.internal");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

"use strict";

/** 
 * Represents a key/value pair for {@link KoconutMap}.
 * The type of key is basically could be any kind of class instance,
 * but it is recommended to be a number, string or custom class that inherits {@link KoconutEquatable}.
 * Otherwise, further equality check process in {@link KoconutSet} or {@link KoconutMap} will not work
 * as intented. This is beacuse even if there are two different instances of same class, which have 
 * exactly identical properties, they are fundamentally indistinguishable from each other.
 * Please, check the {@link Entry.equalsTo example of 'equalsTo' method}
 * 
 * @see 
 * <pre>
 * -- Base --
 * {@link KoconutEntry}, {@link Pair}, {@link KoconutPair}
 * 
 * -- Container --
 * {@link KoconutMap}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param KeyType The type of the key value.
 * 
 * @param ValueType The type of the value.
 * 
*/
var Entry = /*#__PURE__*/function () {
  (0, _createClass2["default"])(Entry, null, [{
    key: "from",

    /** 
     * Create an {@link Entry} instance by iterable two values pair.
     * 
     * @param entry Entry pair of key/value as iterable.
     * 
     * @example
     * ```typescript
     * const myEntry = Entry.from(["Apex", "Captain"])
     * console.log(myEntry)
     * // ↑ Entry { keyElement: 'Apex', valueElement: 'Captain' }
     * ```
     */
    value: function from(entry) {
      return new Entry(entry[0], entry[1]);
    }
    /** 
     * Constructor of {@link Entry}.
     * 
     * @param keyElement KeyType element it'd better be distinguishable.
     * @param valueElement  ValueType element.
     */

  }]);

  function Entry(keyElement, valueElement) {
    (0, _classCallCheck2["default"])(this, Entry);
    (0, _defineProperty2["default"])(this, "keyElement", void 0);
    (0, _defineProperty2["default"])(this, "valueElement", void 0);
    this.keyElement = keyElement;
    this.valueElement = valueElement;
  }
  /** 
   * Returns the key of this key/value pair.
   * @returns The Key of this key/value pair.
   */


  (0, _createClass2["default"])(Entry, [{
    key: "toString",

    /**
     * Turns this {@link Entry} into a simple JSON obeject string.
     * 
     * @example
     * ```typescript
     * const myEntry = Entry.from(["Apex", "Captain"])
     * console.log(myEntry.toString()) // Or, you can use console.log(`${myEntry}`)
     * // ↑ {"keyElement":'Apex',"valueElement":"Captain"}
     * ```
     */
    value: function toString() {
      return JSON.stringify({
        keyElement: this.key,
        valueElement: this.valueElement
      });
    }
    /**
     * Turns this {@link Entry} instance into a simple array.
     * 
     * @example
     * ```typescript
     * const myEntry = Entry.from(["Apex", "Captain"])
     * console.log(myEntry.toArray())
     * // ↑ [ 'Apex', 'Captain' ]
     * ```
     */

  }, {
    key: "toArray",
    value: function toArray() {
      return this.toPair().toArray();
    }
    /**
     * Turns this {@link Entry} instance into a simple {@link Pair}
     * @example
     * ```typescript
     * const myEntry = Entry.from(["Apex", "Captain"])
     * console.log(myEntry.toPair())
     * // ↑ Pair { firstElement: 'Apex', secondElement: 'Captain' }
     * ```
     */

  }, {
    key: "toPair",
    value: function toPair() {
      return new _module.Pair(this.key, this.value);
    }
    /**
     * Class {@link Entry} implements {@link KoconutEquatable}. The equality check process
     * of this is done simply by using '==' operator when the KeyType is not {@link KoconutEquatable},
     * otherwise, by using the method '{@link KoconutEquatable.equalsTo equalsTo}' to the the key element.
     * Please, have a check following example.
     * @param other Other {@link Entry} instance to check equality.
     * 
     * @example
     * ```typescript
     *   class MyKey {
     *       private keyString : string
     *       constructor(keyString : string) {
     *           this.keyString = keyString
     *       }
     *   }
     *
     *   class MyEquatableKey implements KoconutEquatable {
     *
     *       private keyString : string
     *       constructor(keyString : string) {
     *           this.keyString = keyString
     *       }
     *       equalsTo(other : MyEquatableKey) {
     *           return this.keyString == other.keyString
     *       }
     *
     *   }
     *
     *   const myKeyEntry = Entry.from([new MyKey("myKeyString"), 0])
     *   const myKeyEntry2 = Entry.from([new MyKey("myKeyString"), 0])
     *   console.log(`${myKeyEntry.equalsTo(myKeyEntry2)}`)
     *   // ↑ false
     *
     *   const myEquatableKeyEntry = Entry.from([new MyEquatableKey("myEquatableKeyString"), 0])
     *   const myEquatableKeyEntry2 = Entry.from([new MyEquatableKey("myEquatableKeyString"), 0])
     *   console.log(`${myEquatableKeyEntry.equalsTo(myEquatableKeyEntry2)}`)
     *   // ↑ true
     * ```
     */

  }, {
    key: "equalsTo",
    value: function equalsTo(other) {
      if (_module.KoconutTypeChecker.checkIsEquatable(this.key) && _module.KoconutTypeChecker.checkIsEquatable(other.key)) return this.key.equalsTo(other.key);else return this.key == other.key;
    }
  }, {
    key: "key",
    get: function get() {
      return this.keyElement;
    }
    /**
     * Returns the value of key/value pair.
     * @returns The value of this key/value pair.
     */

  }, {
    key: "value",
    get: function get() {
      return this.valueElement;
    }
  }]);
  return Entry;
}();
/**
 * Koconut Wrapper class for {@link Entry}.
 * 
 * @see 
 * <pre>
 * -- Base --
 * {@link Entry}, {@link Pair}, {@link KoconutPair}
 * 
 * -- Container --
 * {@link KoconutMap}
 * 
 * -- Protocol --
 * {@link KoconutEquatable}
 * </pre>
 * 
 * @param KeyType Check for {@link Entry}.
 * @param ValueType Check for {@link Entry}.
 * 
 */


exports.Entry = Entry;

var KoconutEntry = /*#__PURE__*/function (_KoconutPrimitive) {
  (0, _inherits2["default"])(KoconutEntry, _KoconutPrimitive);

  var _super = _createSuper(KoconutEntry);

  /**
   * Constructor of {@link KoconutEntry}.
   * 
   * @param key KeyType element of inner {@link Entry} instance, it'd better be distinguishable. 
   * @param value ValueType element of inner {@link Entry}.
   */
  function KoconutEntry() {
    var _this;

    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0, _classCallCheck2["default"])(this, KoconutEntry);
    if (key != null && value != null) _this = _super.call(this, new Entry(key, value));else _this = _super.call(this);
    return (0, _possibleConstructorReturn2["default"])(_this);
  }
  /**
   * Class {@link KoconutEntry} implements {@link KoconutEquatable}. The equality check process
   * is done by using '{@link Entry.equalsTo equalsTo method of Entry}'.
   * 
   * @param other Other {@link KoconutEntry} instance to check equality.
   */


  (0, _createClass2["default"])(KoconutEntry, [{
    key: "equalsTo",
    value: function equalsTo(other) {
      if (this.data != null && other.data != null) return this.data.equalsTo(other.data);
      return false;
    }
  }]);
  return KoconutEntry;
}(_module.KoconutPrimitive);

exports.KoconutEntry = KoconutEntry;