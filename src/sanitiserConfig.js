import * as assert from 'assert';

const validateSanitiseRule = (ruleObj) => {
  assert.equal(typeof ruleObj, 'object', 'all config rules must be valid objects');
  assert.ok(Object.prototype.hasOwnProperty.call(ruleObj, 'regex'), 'invalid config rule: no \'regex\' element found');
  assert.ok(Object.prototype.hasOwnProperty.call(ruleObj, 'sanitiseFunction'), 'invalid config rule: no \'sanitiseFunction\' element found');
  assert.equal(typeof ruleObj.regex, 'string', 'invalid config rule: \'regex\' must be a string');
  assert.equal(typeof ruleObj.sanitiseFunction, 'function', 'invalid config rule: \'sanitiseFunction\' must be a function');
  if (Object.prototype.hasOwnProperty.call(ruleObj, 'regexFlags')) {
    assert.equal(typeof ruleObj.regexFlags, 'string', 'invalid config rule: \'regexFlags\' must be a string');
  }
};

const validateConfig = (cfg) => {
  assert.equal(Array.isArray(cfg), true, 'argument \'cfg\' must be an Array');
  cfg.forEach((rule) => {
    validateSanitiseRule(rule);
  });
};

export default class SanitiserConfig {

  /**
   * SanitiserConfig constructor
   *
   * @param {Array} cfg An array containing a list of objects representing the sanitisation
   * rules to apply. The object structure must be the following:
   * {
   *   regexp: 'regexp',
   *   regexFlags: 'ig',
   *   sanitiseFunction: function(str) {
   *      //do sanitisation
   *      return str;
   *   }
   * }
   * @throws {AssertionError} If the argument is invalid.
   */
  constructor(cfg) {
    validateConfig(cfg);
    this.cfg = cfg;
    this.cfgIdx = -1;
  }

  /**
   * Returns the next sanitise rule in the list, if available, otherwise it returns false
   *
   * @returns {Object|false} an object representing a sanitisation rule, false if no
   * further objects are avaliable
   */
  next() {
    this.cfgIdx += 1;
    if (this.cfg[this.cfgIdx]) {
      return this.cfg[this.cfgIdx];
    }
    return false;
  }
}
