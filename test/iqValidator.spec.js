import { assert } from 'chai';
import sinon from 'sinon';
import IqValidator from '../src/IqValidator';

const validInstance = () => new IqValidator(new RegExp('ab+c', 'i'),[]);
const validInstanceOneIt = () => new IqValidator(
  new RegExp('ab+c', 'i'),
  [{
    regex: '[a-z]{2}[0-9]{2}[a-z]{2}',
    regexFlags: 'g',
    sanitiseFunction: function(str) {
      str = 'abbbbbC';
      return str;
    }
  }]);
const validInstanceTwoIt = () => new IqValidator(
  new RegExp('ab+c', 'i'),
  [{
    regex: 'x{4}',
    regexFlags: 'g',
    sanitiseFunction: function(str) {
      str = 'abbbbbC';
      return str;
    }
  },{
    regex: '[a-z]{2}[0-9]{2}[a-z]{2}',
    regexFlags: 'g',
    sanitiseFunction: function(str) {
      str = 'xxxx';
      return str;
    }
  }]);

const invalidSanitiseFunction = () => new IqValidator(
  new RegExp('ab+c', 'i'),
  [{
    regex: '[a-z]{2}[0-9]{2}[a-z]{2}',
    regexFlags: 'g',
    sanitiseFunction: function(str) {
      str = 'notValidated';
      return str;
    }
  }]);

describe('IqValidator class.', () => {
  let iqValidator;

  it('should expose a public method called sanitise', () => {
    iqValidator = validInstance();
    assert(Reflect.has(iqValidator, 'sanitise'), 'Has sanitise method');
  });

  it('should expose a public method called isValid', () => {
    iqValidator = validInstance();
    assert(Reflect.has(iqValidator, 'isValid'), 'Has isValid method');
  });

  describe('constructor', () => {
    it('should throw an error if invalid \'mainRegex\' param is passed', () => {
      assert.throws(() => new IqValidator(1, []), /argument \'mainRegex\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator({}, []), /argument \'mainRegex\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(null, []), /argument \'mainRegex\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator('', []), /argument \'mainRegex\'/, 'invalid or no error message thrown');
    });
    it('should throw an error if empty constructor is used', () => {
      assert.throws(() => new IqValidator(), /argument/, 'invalid or no error message thrown');
    });
  });

  describe('sanitise method', () => {
    it('should throw an error if invalid \'str\' param is passed', () => {
      iqValidator = validInstance();
      assert.throws(() => iqValidator.sanitise(), /argument \'str\'/, 'invalid or no error message thrown');
      assert.throws(() => iqValidator.sanitise({}), /argument \'str\'/, 'invalid or no error message thrown');
      assert.throws(() => iqValidator.sanitise(1), /argument \'str\'/, 'invalid or no error message thrown');
      assert.throws(() => iqValidator.sanitise(null), /argument \'str\'/, 'invalid or no error message thrown');
    });
    it('should return the same str parameter value, if valid', () => {
      iqValidator = validInstance();
      const matchingValue = 'abbbbbC';
      assert.equal(iqValidator.sanitise(matchingValue), matchingValue, 'invalid value returned');
    });
    it('should return the validated str if at least 1 matching rule has been found', () => {
      iqValidator = validInstanceOneIt();
      const matchingValue = 'aa22dd';
      assert.equal(iqValidator.sanitise(matchingValue), 'abbbbbC', 'invalid value returned');
    });
    it('should return null if no sanitise rules have been found', () => {
      iqValidator = validInstanceTwoIt();
      const matchingValue = 'kkk';
      assert.equal(iqValidator.sanitise(matchingValue), null, 'invalid value returned');
    });
    it('should return null if the matching rule can\'t sanitise the string', () => {
      iqValidator = invalidSanitiseFunction();
      const matchingValue = 'aa00gg';
      assert.equal(iqValidator.sanitise(matchingValue), null, 'invalid value returned');
    });
  });

  describe('isValid method', () => {
    it('should return true if the argument matches the mainRegex regexp', () => {
      iqValidator = validInstance();
      const matchingValue = 'abbbbC';
      assert.equal(iqValidator.isValid(matchingValue), true, 'invalid value returned');
    });
    it('should return false if the argument doesn\'t matches the mainRegex regexp', () => {
      iqValidator = validInstance();
      const nonMatchingValue = 'bbbbC';
      assert.equal(iqValidator.isValid(nonMatchingValue), false, 'invalid value returned');
    });
  });
});
