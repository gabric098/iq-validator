import * as assert from 'assert';
import SanitiseRules from './SanitiseRules';

/**
 * IqValidator is an intelligent string validator with built-in configurable
 * sanitisation capabilities.
 * The main purpose of IqValidator is to provide an easy and configurable
 * way to sanitise big string datasets (for example coming from different
 * databases or from un-validated spreadsheet exports).
 * It allows to specifiy a main regular expression which is used to determine
 * if a specific string is valid or it needs sanitisation.
 * In the second case, the user can specify an array of sanitisation rules each of them
 * defined in form of javascript objects. A rule is composed by a regex plus some
 * regex flags (see RegExp javascript object docs) and a function which has the purpose
 * of perfom some kind of string maniupulation as an attempt to sanitise (reformat)
 * the invalid string.
 * When a string passed to the sanitise method is evaluated to invalid, the algorithm
 * will loop through the array of possible sanitisation rules and check if the invalid
 * string matches the rule's regular expression.
 * At this point 3 scenarios can happen:
 * 1. One matching sanitisation rule found:
 *  In this case, the sanitisation function is invoked passing the invalid string as
 *  parameter. The function is expected to return a string which passes the main regular
 *  expression
 * 2. More than one matching sanitisation rules found. This shouldn't happen, in this case
 *  only the first matching sanitisation function is run.
 * 3. No matching sanitisation rule found:
 *  In this case null is returned
 */
export default class IqValidator {

  /**
   * @summary Create an instance of IqValidator
   * @name IqValidator
   * @class
   * @public
   *
   * @param {RegExp} mainRegex - A RegExp object used for validation
   * @param {Array} sanitiseRules - an array of objects with the following format
   * {
   *   regex: 'regex',
   *   regexFlags: 'ig',
   *   sanitiseFunction: function(str) {
   *      //do sanitisation
   *      return str;
   *   }
   * }
   * @throws {AssertionError} If the argument/s is/are invalid.
   */
  constructor(mainRegex, sanitiseRules) {
    assert.equal(mainRegex instanceof RegExp, true, 'argument \'mainRegex\' must be a RegExp object');
    this.mainRegex = mainRegex;
    this.sanitiseRules = new SanitiseRules(sanitiseRules);
  }

  /**
   * @summary Tests a given string against the mainRegex regex to check if it's valid
   * @method
   * @private
   *
   * @param {string} str - the string to test against the mainRegex regex
   * @returns {boolean} true if the argument matches the mainRegex
   * @throws {AssertionError} If the argument is invalid.
   */
  isValid(str) {
    return this.mainRegex.test(str);
  }

  /**
   * @summary Tests the validity of the string passed as argument. If the string is invalid and
   * some sanitisation rules have been specified, it runs through them trying to sanitise the
   * string. Finally, if the sanitised string passes the mainRegex validation, it is returned,
   * otherwise null is returned.
   * @method
   * @public
   *
   * @param {string} str - the string to validate/sanitise
   * @returns {string|null} A string is returned if either the str parameter is valid or if one of
   * the sanitising functions have been able to make the string valid. Null is returned otherwise
   * @throws {AssertionError} If the argument is invalid.
   */
  sanitise(str) {
    assert.equal(typeof (str), 'string', 'argument \'str\' must be a string');
    if (this.isValid(str)) {
      return str;
    }
    const matchingRules = this.sanitiseRules.getMatchingRules(str);
    for (let i = 0; i < matchingRules.length; i += 1) {
      const sanitisedStr = matchingRules[i].runSanitise(str);
      if (this.isValid(sanitisedStr)) {
        return sanitisedStr;
      }
    }
    return null;
  }
}
