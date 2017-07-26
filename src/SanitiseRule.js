import * as assert from 'assert';

/**
 * @summary Tests the validity of an object representing a single sanitisation
 * rule. The object must have the follwing structure:
 * {
 *   regex: 'regex',
 *   regexFlags: 'ig',
 *   sanitiseFunction: function(str) {
 *      //do sanitisation
 *      return str;
 *   }
 * }
 * The regexFlags property is optional.
 * @function
 * @private
 *
 * @param {object} ruleObj - the sanitisation rule object
 * @throws {AssertionError} If the argument is invalid.
 */
const validateRule = (ruleObj) => {
  assert.equal(typeof ruleObj, 'object', 'config rule must be a valid object');
  assert.notEqual(ruleObj, null, 'config rule must be a valid object');
  assert.ok(Object.prototype.hasOwnProperty.call(ruleObj, 'regex'), 'invalid config rule: no \'regex\' element found');
  assert.ok(Object.prototype.hasOwnProperty.call(ruleObj, 'sanitiseFunction'), 'invalid config rule: no \'sanitiseFunction\' element found');
  assert.equal(typeof ruleObj.regex, 'string', 'invalid config rule: \'regex\' must be a string');
  assert.equal(typeof ruleObj.sanitiseFunction, 'function', 'invalid config rule: \'sanitiseFunction\' must be a function');
  if (Object.prototype.hasOwnProperty.call(ruleObj, 'regexFlags')) {
    assert.equal(typeof ruleObj.regexFlags, 'string', 'invalid config rule: \'regexFlags\' must be a string');
  }
};

/**
 * Class representing a single sanitisation rule.
 */
export default class SanitiseRule {

  /**
   * @summary Create an instance of SanitiseRule
   * @name SanitiseRule
   * @class
   * @public
   *
   * @param {Object} ruleObj - An object representing the sanitisation
   * rule to apply. This should be the object structure:
   * {
   *   regex: 'regex',
   *   regexFlags: 'ig',
   *   sanitiseFunction: function(str) {
   *      //do sanitisation
   *      return str;
   *   }
   * }
   * @throws {AssertionError} If the argument is invalid.
   * @throws {SyntaxError} If the regex configuration is invalid
   */
  constructor(ruleObj) {
    validateRule(ruleObj);
    /**
     * @type {RegExp}
     */
    this.regexObj = new RegExp(ruleObj.regex, ruleObj.regexFlags);
    /**
     * @type {function}
     */
    this.sanitiseFx = ruleObj.sanitiseFunction;
  }

  /**
   * @summary Checks if the rule's regex is matching the provided string
   * @method
   * @public
   *
   * @param {string} str - The string to be checked
   * @returns {boolean} true if the rule matches the provided string
   */
  matches(str) {
    return this.regexObj.test(str);
  }

  /**
   * @summary Checks if the rule's regex is matching the provided string
   * @method
   * @public
   *
   * @param {string} str - The string to be sanitised
   * @returns {string} the sanitised string
   *
   * @throws {AssertionError} If the sanitise function doesn't return a string.
   */
  runSanitise(str) {
    const resultStr = this.sanitiseFx(str);
    assert.equal(typeof resultStr, 'string', 'sanitise function must return a string');
    return resultStr;
  }
}
