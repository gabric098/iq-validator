import * as assert from 'assert';
import SanitiserConfig from './sanitiserConfig';

export default class IqValidator {

  /**
   * IqValidator constructor
   *
   * @param {RegExp} A RegExp object used for validation
   * @param {Array} an array of objects with the following format
   * {
   *   matchRule: 'regexp',
   *   sanitiseFunction: function(str) {
   *      //do sanitisation
   *      return str;
   *   }
   * }
   * @throws {AssertionError} If the argument/s is/are invalid.
   * @public
   */
  constructor(mainRule, config) {
    assert.equal(mainRule instanceof RegExp, true, 'argument \'mainRule\' must be a RegExp object');
    this.mainRule = mainRule;
    this.config = new SanitiserConfig(config);
  }

  /**
   * Tests a given string against the mainRule regex to check if it's valid
   *
   * @param {string} str the string to test against the mainRule regex
   * @returns {boolean} true if the argument matches the mainRule
   * @throws {AssertionError} If the argument is invalid.
   * @public
   */
  isValid(str) {
    assert.equal(typeof (str), 'string', 'argument \'str\' must be a string');
    return this.mainRule.test(str);
  }

  /**
   *
   * @param {string} str The string to validate and/or sanitise
   * @return {string|null} A string is returned if either the str parameter is valid or if one of
   * the sanitising functions have been able to make the string valid. Null is returned otherwise
   * @throws {AssertionError} If the argument is invalid.
   * @public
   */
  sanitise(str) {
    assert.equal(typeof (str), 'string', 'argument \'str\' must be a string');
    if (this.isValid(str)) {
      return str;
    }
    let returnValue = null;
    let testStr = str;
    let currentCfg = this.config.next();
    while (!this.isValid(testStr) && currentCfg) {
      const currentRuleMatcher = new RegExp(currentCfg.regexp, currentCfg.flags);
      if (currentRuleMatcher.test(testStr)) {
        testStr = currentCfg.sanitiseFunction(testStr);
        returnValue = testStr;
      }
      currentCfg = this.config.next();
    }
    return returnValue;
  }
}
