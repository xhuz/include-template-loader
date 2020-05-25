import * as webpack from 'webpack';
import {Options} from './interface';
import {validateOptions, mergeOptions} from './utils/options-util';
import {templateParser} from './utils/template-parser.util';

export function includeHtmlLoader(
  this: webpack.loader.LoaderContext,
  source: string
) {
  const defaultOptions: Options = {
    sign: ['{{', '}}'],
    deep: 5
  };

  const options = mergeOptions(defaultOptions, validateOptions(this));
  return templateParser(this, source, options);
}
