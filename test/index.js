import { assert } from 'chai';
import IqValidator from '../src/iqValidator';

let emptyParamsInstance = () => new IqValidator();
let invalidParamsInstance = () => new IqValidator(1, {});

describe('IqValidator class.', () => {
  let iqValidator;

  it('should expose a public method called sanitise', () => {
    iqValidator = emptyParamsInstance();
    assert(Reflect.has(iqValidator, 'sanitise'), 'Has sanitise method');
  });

  it('should use default values empty constructor', () => {
    iqValidator = emptyParamsInstance();
    assert(iqValidator.mainRule === '', 'mainRule is empty string');
    assert(Array.isArray(iqValidator.config) && iqValidator.config.length === 0, 'config is an empty array');
  });

  it('should use default values if wrong parameter types are passed to constructor', () => {
    iqValidator = invalidParamsInstance();
    assert(iqValidator.mainRule === '', 'mainRule is empty string');
    assert(Array.isArray(iqValidator.config) && iqValidator.config.length === 0, 'config is an empty array');
  });

  describe('sanitise method', () => {
    it('should default invalid params to empty string', () => {
      iqValidator = emptyParamsInstance();
      assert(iqValidator.sanitise({invalid:true}) === '', 'doesn\'t default to empty string');
    });
    it('should return unchanges string if mainRule is empty or not defined', () => {
      iqValidator = emptyParamsInstance();
      assert(iqValidator.sanitise('testme') === 'testme', 'returns a different string');
    });
  });
});
