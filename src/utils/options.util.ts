import {loader} from 'webpack';
import {getOptions} from 'loader-utils';
import {schema} from '../schema/schema';
import {Options} from '../interface';

import validate from 'schema-utils';
/**
 * 验证传入选项的正确性
 * @param {loader.LoaderContext} self
 * @returns {Options}
 */
export const validateOptions = (
  self: loader.LoaderContext
): Partial<Options> => {
  const options = getOptions(self);
  validate(schema as any, options);
  return options;
};

export const mergeOptions = (
  defaultOptions: Options,
  options: Partial<Options>
): Options => {
  return Object.assign(defaultOptions, options);
};
