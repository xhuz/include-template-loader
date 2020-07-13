import {Options, Sign, TemplateRules} from '../interface';
import {loader} from 'webpack';
import {parse, resolve, relative} from 'path';
import {readFileSync} from 'fs';
import {getCurrentRequest} from 'loader-utils';

/**
 * 获取模板替换的规则
 * @param sign 模板标记
 */
const getRules = (sign: Sign): TemplateRules => {
  const [start, end] = sign;
  return {
    include: new RegExp(
      `${start}\\s*@include\\(\\s*['"](.*)['"](?:,\\s*({(?:\\S|\\s)*?}))?\\s*\\)?\\s*${end}`,
      'g'
    ),
    variable: new RegExp(`${start}\\s*(?!@include)(.*?)\\s*${end}`, 'g'),
    imgSrc: /(?<=<img.*?src=["']).*?(?=["'].*?\/?>)/gi
  };
};

/**
 * 模板替换
 * @param content 模板内容
 * @param templatePath 需要被替换的模板路径
 * @param rules 替换规则
 * @param deep 递归替换的深度
 * @param dependenciesUrl 替换模板的路径集合，用于添加到webpack，实现watch
 * @returns 替换完成的字符和模板路径集合
 */
const templateReplace = (
  content: string,
  templatePath: string,
  rules: TemplateRules,
  deep: number,
  dependenciesUrl = new Set<string>()
): [string, Set<string>] => {
  const invoke = (
    content: string,
    templatePath: string,
    rules: TemplateRules,
    deep: number
  ): string => {
    const {include, variable, imgSrc} = rules;

    const handle = (_match: string, $1: string, $2 = '{}') => {
      let templateParams: {[key: string]: any};
      try {
        templateParams = JSON.parse($2);
      } catch {
        throw new Error('Parameter format error, unable to parse into JSON');
      }
      const {dir} = parse(templatePath);
      const templateUrl = resolve(dir, $1);
      const {dir: templateBasePath} = parse(templateUrl);

      dependenciesUrl.add(templateUrl);

      let templateContent = readFileSync(templateUrl, 'utf8');

      templateContent = templateContent.replace(imgSrc, match =>
        relative(dir, resolve(templateBasePath, match))
      );

      templateContent = templateContent.replace(
        variable,
        (_, $1) => templateParams[$1] || ''
      );

      if (--deep > 0 && include.test(templateContent)) {
        return invoke(templateContent, templateUrl, rules, deep);
      }
      return templateContent;
    };
    const replacedContent = content.replace(include, handle);
    return replacedContent;
  };

  return [invoke(content, templatePath, rules, deep), dependenciesUrl];
};

/**
 * 解析模板
 * @param self loader上下文对象
 * @param source 原始字符串
 * @param options 配置对象
 * @returns 返回编译后的字符串
 */
export const templateParser = (
  self: loader.LoaderContext,
  source: string,
  options: Options
) => {
  const {sign, deep} = options;
  const rules = getRules(sign);
  const basePath = getCurrentRequest(self).split('!').pop() as string;
  const [content, dependenciesUrl] = templateReplace(
    source,
    basePath,
    rules,
    deep
  );
  dependenciesUrl.forEach(item => {
    self.addDependency(item);
  });
  return content;
};
