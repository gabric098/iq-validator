import { assert } from 'chai';
import SanitiseRules from '../src/SanitiseRules';

const validRules = [{
  regex: 'abcd',
  regexFlags: 'g',
  sanitiseFunction: (str) => str
},{
  regex: 'abcdf?',
  regexFlags: 'g',
  sanitiseFunction: (str) => str
},{
  regex: 'm',
  regexFlags: 'g',
  sanitiseFunction: (str) => str
}];
const validSRs = new SanitiseRules(validRules);

describe('SanitiseRules class.', () => {
  describe('constructor', () => {
    it('should throw an error if invalid \'cfg\' param is passed', () => {
      assert.throws(() => new SanitiseRules(), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRules(''), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRules(null), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiseRules({}), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
    });
    it('should create SanitiseRule instances array out of the config objects', () => {
      validSRs.cfg.forEach((rule) => assert.equal(rule.constructor.name, 'SanitiseRule', 'cfg contains non SanitiseRule instances'));
    });
    it('should create one SanitiseRule instance for each config object', () => {
      assert.equal(validSRs.cfg.length === validRules.length, true, 'mismatch number of SanitiseRule instances created');
    });
  });

  describe('getMatchingRules', () => {
    it('should return only the rules matching the given string', () => {
      let matchingRules = validSRs.getMatchingRules('m');
      assert.equal(matchingRules.length, 1, 'unexpected number of matching rules found');
      matchingRules = validSRs.getMatchingRules('abcdf');
      assert.equal(matchingRules.length, 2, 'unexpected number of matching rules found');
      matchingRules = validSRs.getMatchingRules('xx');
      assert.equal(matchingRules.length, 0, 'unexpected number of matching rules found');
    });
  });
});
