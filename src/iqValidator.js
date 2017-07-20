const validOrDefault = (value, type, defaultValue) => {
  if (typeof value !== type) {
    return defaultValue;
  }
  return value;
};

export default class IqValidator {
  constructor(mainRule = '', config = []) {
    this.mainRule = validOrDefault(mainRule, 'string', '');
    this.config = validOrDefault(config, 'Array', []);
  }

  sanitise(str = '') {
    const localStr = validOrDefault(str, 'string', '');
    if (this.mainRule === '') {
      return localStr;
    }
    return localStr;
  }
}
