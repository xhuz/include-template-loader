# include-html-loader

Handle the conflict between html webpack plugin and html loader

### Usage

```js
  ...
    {
      test: /\.html/,
      use: [
        'html-loader',
        'include-loader'
      ]
    }
  ...
```

In html template

parent
`{{@include('./xxx.html', {"name": "xxx"})}}`
params is a Json string

sub
`{{name}}` // xxx

### Customize options

```js
  ...
    {
      test: /\.html/,
      use: [
        'html-loader',
        {
          loader: 'include-loader',
          options: {
            sign: ['{{', '}}'],
            deep: 5
          }
        }
      ]
    }
  ...
```

### Options

**_sign_**: template parsing mark, default `['{{', '}}']`
**_deep_**: the depth of recursive analysis, default 5, value range 0-5
