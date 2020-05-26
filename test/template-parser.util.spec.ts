import {templateParser} from '../src/utils/template-parser.util';
import {Options} from '../src/interface';
jest.mock('loader-utils');

const source = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    {{@include('../components/header.html', {"name": "123"})}}

    <img src="../assets/images/1.png" alt="" />
    <nav>
      <a href="page-a/index.html">page-a</a>
      <a href="page-a/sub-page-a/index.html">page-a/sub-page-a</a>
      <a href="page-a/sub-page-a/sub-sub-page-a/index.html">
        page-a/sub-page-a/sub-sub-page-a
      </a>
      <a href="page-b/index.html">page-b</a>
      <a href="page-c/index.html">page-c</a>
    </nav>

    {{@include('../components/footer.html', {"name": 123})}}
  </body>
</html>`;

const options: Options = {
  sign: ['{{', '}}'],
  deep: 3
};

describe('template parser util', () => {
  it('to be defined', () => {
    expect(templateParser).toBeDefined();
  });

  describe('templateParser', () => {
    it('should return [string, Set<string>]', () => {
      templateParser({} as any, source, options);
    });
  });
});
