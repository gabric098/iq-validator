import { assert } from 'chai';
import SanitiseRule from '../src/SanitiseRule';

describe('SanitiseRule class.', () => {
  describe('constructor', () => {
    it('should throw an error if invalid \'ruleObj\' param is passed', () => {
      assert.throws(() => new SanitiseRule(), /config rule must be a valid object/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule(''), /config rule must be a valid object/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule(null), /config rule must be a valid object/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({}), /invalid config rule: no \'regex\' element found/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({
        regex: ''
      }), /invalid config rule: no \'sanitiseFunction\' element found/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({
        regex: [],
        sanitiseFunction: function() {}
      }), /invalid config rule: \'regex\' must be a string/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({
        regex: '',
        sanitiseFunction: ''
      }), /invalid config rule: \'sanitiseFunction\' must be a function/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({
        regex: '',
        regexFlags: [],
        sanitiseFunction: function() {},
      }), /invalid config rule: \'regexFlags\' must be a string/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRule({
        regex: 'abcd',
        regexFlags: 'abcdefghi',
        sanitiseFunction: function() {},
      }), /Invalid flags supplied to RegExp constructor/, 'invalid or no error message thrown');
      assert.doesNotThrow(() => new SanitiseRule({
        regex: 'abcd',
        sanitiseFunction: function() {},
      }), /Invalid flags supplied to RegExp constructor/, 'exception thrown on valid object');
    });
  });

  describe('matches method', () => {
    it('should return true if the string passed is matching the defined rule', () => {
      const validRule = new SanitiseRule({
        regex: 'abcd',
        regexFlags: 'g',
        sanitiseFunction: function() {}
      });
      assert.equal(validRule.matches('abcd'), true, 'returns unexpected value');
    });
    it('should return false if the string passed is not matching the defined rule', () => {
      const validRule = new SanitiseRule({
        regex: 'abcd',
        regexFlags: 'g',
        sanitiseFunction: function() {}
      });
      assert.equal(validRule.matches('za'), false, 'returns unexpected value');
    });
  });

  describe('runSanitise method', () => {
    it('should throw an error if rule function doesn\'t return a string', () => {
      const invalidRule = new SanitiseRule({
        regex: 'abcd',
        regexFlags: 'g',
        sanitiseFunction: function(str) { str = str + 'aa'; }
      });
      assert.throws(() => invalidRule.runSanitise('zz'), /sanitise function must return a string/, 'invalid or no error message thrown');
    });
    it('should return a correctly manipulated string', () => {
      const invalidRule = new SanitiseRule({
        regex: 'abcd',
        regexFlags: 'g',
        sanitiseFunction: function(str) { return str + 'xx'; }
      });
      assert.equal(invalidRule.runSanitise('zz'), 'zzxx', 'returned string differs from the expected one');
    });
  });
});
