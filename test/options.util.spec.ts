import {validateOptions, mergeOptions} from '../src/utils/options-util';

describe('template parser util', () => {
  it('to be defined', () => {
    expect(validateOptions).toBeDefined();
    expect(mergeOptions).toBeDefined();
  });
});
