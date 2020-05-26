import {validateOptions, mergeOptions} from '../src/utils/options-util';
import * as loaderUtils from 'loader-utils';
import {Options} from '../src/interface';

jest.mock('loader-utils');

const options: Options = {
  sign: ['<%=', '%>'],
  deep: 1
};

describe('template parser util', () => {
  const getOptionsSpy = jest.spyOn(loaderUtils, 'getOptions');
  beforeEach(() => {
    getOptionsSpy.mockClear();
  });
  it('to be defined', () => {
    expect(validateOptions).toBeDefined();
    expect(mergeOptions).toBeDefined();
  });

  describe('validateOptions', () => {
    it('should return a options', () => {
      const spy = getOptionsSpy.mockReturnValue(options);
      expect(validateOptions({} as any)).toEqual(options);
      expect(spy).toBeCalled();
    });
  });

  describe('mergeOptions', () => {
    it('should merge options', () => {
      const obj1: Options = {sign: ['<', '>'], deep: 4};
      const obj2: Partial<Options> = {deep: 10};
      expect(mergeOptions(obj1, obj2)).toEqual({sign: ['<', '>'], deep: 10});
    });
  });
});
