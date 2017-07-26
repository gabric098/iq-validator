import * as assert from 'assert';
import SanitiseRule from './SanitiseRule';

/**
 * @summary Validates the sanitise configuration and builds
 * returns an array of SanitiseRule objects.
 * @function
 * @private
 *
 * @param {object} cfg - the sanitiseConfig configuration
 * @returns {Array.<SanitiseRule>}
 * @throws {AssertionError} If the argument is invalid.
 */
const validateConfig = (cfg) => {
  assert.equal(Array.isArray(cfg), true, 'argument \'cfg\' must be an Array');
  const sanitiseRuleArray = [];
  cfg.forEach((rule) => {
    sanitiseRuleArray.push(new SanitiseRule(rule));
  });
  return sanitiseRuleArray;
};

export default class SanitiseRules {

  /**
   * @summary Create an instance of SanitiseRules
   * @name SanitiseRules
   * @class
   * @public
   *
   * @param {Array} cfg - An array containing a list of objects representing the sanitisation
   * rules to apply. Each object's structure must be the following:
   * {
   *   regex: 'regex',
   *   regexFlags: 'ig',
   *   sanitiseFunction: function(str) {
   *      //do sanitisation
   *      return str;
   *   }
   * }
   * @throws {AssertionError} If the argument is invalid.
   */
  constructor(cfg) {
    /**
     * @type {Array.<SanitiseRule>}
     */
    this.cfg = validateConfig(cfg);
  }

  /**
   * @summary Retrieves and returns all the sanitise rules that match the argument
   * @method
   * @public
   *
   * @param {string} str - The string to be matched against the rules
   * @returns {Array.<SanitiseRule>} an array containing a list of SanitiseRule
   * objects matching the given argument.
   */
  getMatchingRules(str) {
    const matchingRules = [];
    this.cfg.forEach((rule) => {
      if (rule.matches(str)) {
        matchingRules.push(rule);
      }
    });
    return matchingRules;
  }
}
