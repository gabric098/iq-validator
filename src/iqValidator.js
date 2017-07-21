import * as assert from 'assert';

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
   */
  constructor(mainRule, config) {
    assert.equal(mainRule instanceof RegExp, true, 'argument \'mainRule\' must be a RegExp object');
    assert.equal(Array.isArray(config), true, 'argument \'config\' must be an Array');
    this.mainRule = mainRule;
    this.config = config;
  }

  /**
   *
   * @param {string} str The string to validate and/or sanitise
   * @return {string|null} A string is returned if either the str parameter is valid or if one of
   * the sanitising functions have been able to make the string valid. Null is returned otherwise
   */
  sanitise(str) {
    assert.equal(typeof (str), 'string', 'argument \'str\' must be a string');
    const cfgIterator = this.config[Symbol.iterator]();
    let testStr = str;
    let currentCfg = cfgIterator.next();
    while (!this.mainRule.test(testStr) && currentCfg) {
      testStr = '';
      currentCfg = cfgIterator.next();
      return '';
    }
    return str;
  }
}
