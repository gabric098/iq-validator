import { assert } from 'chai';
import SanitiserConfig from '../src/sanitiserConfig';

describe('SanitiserConfig class.', () => {
  describe('constructor', () => {
    it('should throw an error if invalid \'cfg\' param is passed', () => {
      assert.throws(() => new SanitiserConfig(), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiserConfig(''), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiserConfig(null), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
      assert.throws(() => new SanitiserConfig({}), /argument \'cfg\' must be an Array/, 'invalid or no error message thrown');
    });
    it('should throw an error if the object structure of the \'cfg\' param is invalid', () => {
      let invalid = [{
        sanitiseFunction: () => {},
        regex: '',
        regexFlags: ''
      },
      ''];
      assert.throws(() => new SanitiserConfig(invalid), /all config rules must be valid objects/, 'invalid or no error message thrown');
       invalid = [{
        sanitiseFunction: () => {}
      }];
      assert.throws(() => new SanitiserConfig(invalid), /invalid config rule: no \'regex\' element found/, 'invalid or no error message thrown');
      invalid = [{
        regex: {},
        sanitiseFunction: () => {}
      }];
      assert.throws(() => new SanitiserConfig(invalid), /invalid config rule: \'regex\' must be a string/, 'invalid or no error message thrown');
      invalid = [{
        regex: '',
        sanitiseFunction: ''
      }];
      assert.throws(() => new SanitiserConfig(invalid), /invalid config rule: \'sanitiseFunction\' must be a function/, 'invalid or no error message thrown');
      invalid = [{
        regex: ''
      }];
      assert.throws(() => new SanitiserConfig(invalid), /invalid config rule: no \'sanitiseFunction\' element found/, 'invalid or no error message thrown');
      invalid = [{
        sanitiseFunction: () => {},
        regex: '',
        regexFlags: []
      }];
      assert.throws(() => new SanitiserConfig(invalid), /invalid config rule: \'regexFlags\' must be a string/, 'invalid or no error message thrown');
    });
  });

  describe('next', () => {
    const validCfg = [{
      regex: '1',
      regexFlags: '1',
      sanitiseFunction: () => {},
    },{
      regex: '2',
      regexFlags: '2',
      sanitiseFunction: () => {},
    }];
    const sanCfg = new SanitiserConfig(validCfg);
    it('should return the fisrt object in the list.', () => {
      assert.deepEqual(sanCfg.next(), validCfg[0], 'invalid or no object returned upon next() call');
    });
    it('should return the second object in the list.', () => {
      assert.deepEqual(sanCfg.next(), validCfg[1], 'invalid or no object returned upon next() call');
    });
    it('should return false when end of the list is reached.', () => {
      assert.equal(sanCfg.next(), false, 'invalid or no object returned upon next() call');
    });
  });
});
