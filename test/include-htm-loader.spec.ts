import includeHtmlLoader from '../src';
import {readFileSync} from 'fs';
import {resolve} from 'path';

jest.mock('../src/utils/template-parser.util');

const source = readFileSync(resolve(__dirname, '__mock__/index.html'));
describe('include html loader', () => {
  it('to be defined', () => {
    expect(includeHtmlLoader).toBeDefined();
  });

  it('should correctly executed', () => {
    (includeHtmlLoader as any)(source);
  });
});
