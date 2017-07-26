# iq-validator [![Build Status](https://travis-ci.org/gabric098/iq-validator.svg?branch=master)](https://travis-ci.org/gabric098/iq-validator)

An intelligent string validator with built-in configurable sanitisation capabilities.

## Installation
```
npm install iq-validator
```

## Usage
This demonstrate a basic usage of IqValidator.
```
import IqValidator from './IqValidator';

const sanitiseRules = [{
  regex: 'wrong',
  regexFlags: 'g',
  sanitiseFunction: str => str.replace('wrong', 'right'),
}];

const iqValidator = new IqValidator(new RegExp('right', 'g'), sanitiseRules);
const sanitised = iqValidator.sanitise('I feel so wrong!');
console.log(sanitised); // I feel so right!
```
## Further information
The main purpose of IqValidator is to provide an easy and configurable way to sanitise large string datasets (for example coming from different databases or from un-validated spreadsheet exports).

It allows to specifiy a main regular expression which is used to determine if a specific string is valid or it needs sanitisation. In the second case, the user can specify an array of sanitisation rules each of them defined in form of javascript objects.

A rule is composed by a regex plus some optional regex flags (see RegExp javascript object docs) and a function which has the purpose of perfom some kind of string maniupulation as an attempt to sanitise (reformat) the invalid string.

When a string is passed to the sanitise method and is evaluated to invalid, the algorithm will loop through the array of possible sanitisation rules and check if the invalid string matches any of the defined sanitisation rules. At this point 3 scenarios can happen:
  1. One matching sanitisation rule found:  In this case, the sanitisation function is invoked passing the invalid string as  parameter. The function is expected to return a string which passes the main regular  expression
  2. More than one matching sanitisation rules found. This shouldn't happen, in this case  only the first matching sanitisation function is run.
  3. No matching sanitisation rule found:  In this case null is returned
