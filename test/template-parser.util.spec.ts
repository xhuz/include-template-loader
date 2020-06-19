import {templateParser} from '../src/utils/template-parser.util';
import {Options} from '../src/interface';
import * as loaderUtils from 'loader-utils';
import {readFileSync} from 'fs';
import {resolve, join} from 'path';

jest.mock('loader-utils');

const basePath = resolve(__dirname, '__mock__/index.html');
const basePath1 = resolve(__dirname, '__mock__/invalid-params.html');
const basePath2 = resolve(__dirname, '__mock__/nested.html');

const options: Options = {
  sign: ['{{', '}}'],
  deep: 3
};

const self = {
  addDependency: jest.fn()
};

// can not change indent
const result = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- prettier-ignore -->
    <header>I am a header components, my name is test template transfer params header </header>

    <div>I am main page</div>
    <!-- prettier-ignore -->
    <footer>I am a footer components, my name is test template transfer params footer</footer>

    <div>I am a components without params</div>

    <img src="${join(__dirname, `__mock__`, '../../test/img')}" alt="" />

  </body>
</html>
`;

// can not change indent
const result1 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div>I am a nested component</div>
    <div>
  <span>I am a sub component</span>
  <div><div>I am a sub-sub component</div>
</div>
</div>

  </body>
</html>
`;

describe('template parser util', () => {
  const getCurrentRequestSpy = jest.spyOn(loaderUtils, 'getCurrentRequest');
  beforeEach(() => {
    getCurrentRequestSpy.mockClear();
  });
  it('to be defined', () => {
    expect(templateParser).toBeDefined();
  });

  describe('templateParser', () => {
    it('should correctly executed', () => {
      const source = readFileSync(basePath, 'utf8');
      getCurrentRequestSpy.mockReturnValue(basePath);
      expect(
        templateParser(self as any, source, options).replace(
          /(\r\n|\r|\n)/g,
          ''
        )
      ).toBe(result.replace(/\n/g, ''));

      expect(getCurrentRequestSpy).toBeCalled();
      expect(self.addDependency).toBeCalled();
    });

    it('should correctly executed, nested components', () => {
      const source = readFileSync(basePath2, 'utf8');
      getCurrentRequestSpy.mockReturnValue(basePath2);
      expect(
        templateParser(self as any, source, options).replace(
          /(\r\n|\r|\n)/g,
          ''
        )
      ).toBe(result1.replace(/\n/g, ''));
    });

    it('should throw a error', () => {
      const source = readFileSync(basePath1, 'utf8');
      getCurrentRequestSpy.mockReturnValue(basePath1);
      expect(() => templateParser(self as any, source, options)).toThrow();
    });
  });
});
