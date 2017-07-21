import { assert } from 'chai';
import IqValidator from '../src/iqValidator';

const validInstance = () => new IqValidator(new RegExp('ab+c', 'i'),[]);

describe('IqValidator class.', () => {
  let iqValidator;

  it('should expose a public method called sanitise', () => {
    iqValidator = validInstance();
    assert(Reflect.has(iqValidator, 'sanitise'), 'Has sanitise method');
  });

  describe('constructor', () => {
    it('should throw an error if invalid \'mainRule\' param is passed', () => {
      assert.throws(() => new IqValidator(1, []), /argument \'mainRule\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator({}, []), /argument \'mainRule\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(null, []), /argument \'mainRule\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator('', []), /argument \'mainRule\'/, 'invalid or no error message thrown');
    });
    it('should throw an error if invalid \'config\' param is passed', () => {
      assert.throws(() => new IqValidator(new RegExp('ab+c', 'i'), {}), /argument \'config\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(new RegExp('ab+c', 'i'), ''), /argument \'config\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(new RegExp('ab+c', 'i'), 1), /argument \'config\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(new RegExp('ab+c', 'i')), /argument \'config\'/, 'invalid or no error message thrown');
      assert.throws(() => new IqValidator(new RegExp('ab+c', 'i'), null), /argument \'config\'/, 'invalid or no error message thrown');
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
  });
});
